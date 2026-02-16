const STORAGE_KEY = "twoTenState";

const state = {
  user: null,
  activeSession: null,
  logs: [],
  timerId: null,
};

const el = {
  loginView: document.querySelector("#login-view"),
  dashboardView: document.querySelector("#dashboard-view"),
  loginForm: document.querySelector("#login-form"),
  name: document.querySelector("#name"),
  greeting: document.querySelector("#greeting"),
  summary: document.querySelector("#summary"),
  logoutBtn: document.querySelector("#logout-btn"),
  exercise: document.querySelector("#exercise"),
  duration: document.querySelector("#duration"),
  newSessionBtn: document.querySelector("#new-session-btn"),
  activeSession: document.querySelector("#active-session"),
  sessionTitle: document.querySelector("#session-title"),
  sessionStatus: document.querySelector("#session-status"),
  countdown: document.querySelector("#countdown"),
  startSetBtn: document.querySelector("#start-set-btn"),
  stopBtn: document.querySelector("#stop-btn"),
  logList: document.querySelector("#log-list"),
  emptyLog: document.querySelector("#empty-log"),
};

function persist() {
  const copy = {
    user: state.user,
    activeSession: state.activeSession,
    logs: state.logs,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
}

function hydrate() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const loaded = JSON.parse(raw);
    state.user = loaded.user || null;
    state.activeSession = loaded.activeSession || null;
    state.logs = Array.isArray(loaded.logs) ? loaded.logs : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function updateSummary() {
  const totalSets = state.logs.length;
  const sessions = new Set(state.logs.map((log) => log.sessionId)).size;
  el.summary.textContent = `${sessions} sessions • ${totalSets} sets logged`;
}

function renderLogs() {
  el.logList.innerHTML = "";
  if (state.logs.length === 0) {
    el.emptyLog.classList.remove("hidden");
    return;
  }
  el.emptyLog.classList.add("hidden");
  const ordered = [...state.logs].sort((a, b) => b.stoppedAt - a.stoppedAt);
  for (const log of ordered) {
    const li = document.createElement("li");
    li.className = "log-item";
    const stoppedAt = new Date(log.stoppedAt).toLocaleString();
    li.innerHTML = `<strong>${log.exercise}</strong>${log.duration}s • ${stoppedAt}`;
    el.logList.appendChild(li);
  }
}

function clearTimer() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function renderSession() {
  const session = state.activeSession;
  if (!session) {
    el.activeSession.classList.add("hidden");
    return;
  }

  el.activeSession.classList.remove("hidden");
  el.sessionTitle.textContent = `Session: ${session.exercise}`;
  el.countdown.textContent = String(session.remaining);

  if (session.running) {
    el.sessionStatus.textContent = "Set in progress…";
    el.startSetBtn.disabled = true;
    el.stopBtn.disabled = false;
  } else if (session.finished) {
    el.sessionStatus.textContent = "Set finished. Start another or make a new session.";
    el.startSetBtn.disabled = false;
    el.stopBtn.disabled = true;
  } else {
    el.sessionStatus.textContent = "Ready to start your set.";
    el.startSetBtn.disabled = false;
    el.stopBtn.disabled = true;
  }
}

function renderAuth() {
  const loggedIn = Boolean(state.user);
  el.loginView.classList.toggle("hidden", loggedIn);
  el.dashboardView.classList.toggle("hidden", !loggedIn);

  if (loggedIn) {
    el.greeting.textContent = `Hi, ${state.user}`;
    updateSummary();
    renderSession();
    renderLogs();
  }
}

function saveSet(source) {
  const session = state.activeSession;
  if (!session) return;
  const doneDuration = session.duration - session.remaining;
  const duration = doneDuration > 0 ? doneDuration : session.duration;
  state.logs.push({
    sessionId: session.id,
    exercise: session.exercise,
    duration,
    source,
    stoppedAt: Date.now(),
  });
  session.running = false;
  session.finished = true;
  persist();
  updateSummary();
  renderLogs();
  renderSession();
}

function resumeCountdownIfNeeded() {
  const session = state.activeSession;
  if (!session || !session.running) return;

  const elapsed = Math.floor((Date.now() - session.startedAt) / 1000);
  session.remaining = Math.max(session.duration - elapsed, 0);

  if (session.remaining <= 0) {
    clearTimer();
    saveSet("auto");
    return;
  }

  clearTimer();
  state.timerId = window.setInterval(() => {
    session.remaining -= 1;
    if (session.remaining <= 0) {
      session.remaining = 0;
      el.countdown.textContent = "0";
      clearTimer();
      saveSet("auto");
      return;
    }
    el.countdown.textContent = String(session.remaining);
    persist();
  }, 1000);

  persist();
  renderSession();
}

el.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.user = el.name.value.trim();
  if (!state.user) return;
  persist();
  renderAuth();
});

el.logoutBtn.addEventListener("click", () => {
  clearTimer();
  state.user = null;
  state.activeSession = null;
  persist();
  renderAuth();
});

el.newSessionBtn.addEventListener("click", () => {
  const exercise = el.exercise.value.trim() || "Workout";
  const duration = Number(el.duration.value);
  if (Number.isNaN(duration) || duration < 5 || duration > 300) {
    el.sessionStatus.textContent = "Countdown must be between 5 and 300 seconds.";
    return;
  }
  clearTimer();
  state.activeSession = {
    id: crypto.randomUUID(),
    exercise,
    duration,
    remaining: duration,
    running: false,
    finished: false,
    startedAt: null,
  };
  persist();
  renderSession();
});

el.startSetBtn.addEventListener("click", () => {
  const session = state.activeSession;
  if (!session || session.running) return;
  session.running = true;
  session.finished = false;
  session.startedAt = Date.now() - (session.duration - session.remaining) * 1000;
  persist();
  renderSession();
  resumeCountdownIfNeeded();
});

el.stopBtn.addEventListener("click", () => {
  const session = state.activeSession;
  if (!session || !session.running) return;
  clearTimer();
  const elapsed = Math.floor((Date.now() - session.startedAt) / 1000);
  session.remaining = Math.max(session.duration - elapsed, 0);
  saveSet("manual");
});

hydrate();
renderAuth();
resumeCountdownIfNeeded();
