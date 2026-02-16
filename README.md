# two-ten

A lightweight gym web app for quickly logging timed sets.

## Run locally

```bash
python -m http.server 4173
```

Then open <http://localhost:4173>.

## Key flow covered

- Login
- New session creation
- Start set with countdown
- Manual stop / automatic completion
- Log is saved and dashboard summary updates
- App state persists in `localStorage` across reloads
