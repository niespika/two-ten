'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
      return;
    }

    window.location.href = '/dashboard';
  };

  return (
    <main className="app-shell mx-auto flex min-h-screen max-w-[420px] items-center px-4">
      <div className="card w-full space-y-5">
        <h1 className="font-serif text-4xl text-brand-green dark:text-brand-darkCopper">two-ten</h1>
        <p className="text-sm opacity-80">Simple HIT session tracking.</p>
        <form className="space-y-3" onSubmit={onSubmit}>
          <input name="email" type="email" className="input" placeholder="Email" required />
          <input name="password" type="password" className="input" placeholder="Password" required />
          {error && <p className="text-sm text-red-700 dark:text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="text-xs opacity-65">Default seed credentials: demo@example.com / demo1234</p>
      </div>
    </main>
  );
}
