'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { api } from '@/lib/api';

type Mode = 'login' | 'signup';
type AuthResponse = { token: string; user?: { name?: string; email?: string } };

const socialProviders = [
  { id: 'google', label: 'Google', mark: 'G' },
  { id: 'microsoft', label: 'Microsoft', mark: '⊞' },
  { id: 'sso', label: 'SSO', mark: '⌁' },
] as const;

export function AuthForm({ mode }: { mode: Mode }) {
  const signup = mode === 'signup';
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState<'idle' | 'loading' | 'magic-sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const finish = (data: AuthResponse) => {
    localStorage.setItem('svara_token', data.token);
    router.push('/dashboard');
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.email.includes('@') || form.password.length < 6 || (signup && (!form.name.trim() || form.phone.replace(/\D/g, '').length < 8))) {
      setState('error');
      setMessage(signup ? 'Add your name, a valid mobile number, email, and a 6-character password.' : 'Enter a valid email and a password of at least 6 characters.');
      return;
    }
    setState('loading');
    const data = await api<AuthResponse>(`/api/auth/${mode}`, { method: 'POST', body: JSON.stringify(form) }, { token: 'demo-svara-token', user: { name: form.name || 'Svara user', email: form.email } });
    finish(data);
  };

  const social = async (provider: string) => {
    setState('loading');
    const data = await api<AuthResponse>('/api/auth/social', { method: 'POST', body: JSON.stringify({ provider, mode }) }, { token: 'demo-svara-token' });
    finish(data);
  };

  const sendMagicLink = async () => {
    if (!form.email.includes('@')) {
      setState('error');
      setMessage('Enter your work email first and we will send a secure sign-in link.');
      return;
    }
    setState('loading');
    await api('/api/auth/magic-link', { method: 'POST', body: JSON.stringify({ email: form.email }) }, { accepted: true });
    setState('magic-sent');
    setMessage(`A secure sign-in link has been requested for ${form.email}.`);
  };

  return <main className="auth-page">
    <div className="auth-orb auth-orb-one" aria-hidden />
    <div className="auth-orb auth-orb-two" aria-hidden />
    <div className="auth-layout">
      <aside className="auth-aside">
        <Link href="/" className="auth-brand"><span>S</span>svara</Link>
        <div className="auth-aside-copy">
          <p className="auth-overline">Always on, never impersonal</p>
          <h1>Your call team, ready for the next lead.</h1>
          <p>Build a reliable calling workflow that gives your team context, control, and a clear next action after every conversation.</p>
        </div>
        <div className="auth-proof"><b>24 sec</b><span>average demo queue</span><i>•</i><b>3 languages</b><span>available today</span></div>
      </aside>
      <section className="auth-card-wrap" aria-label={signup ? 'Create a Svara account' : 'Sign in to Svara'}>
        <div className="auth-card">
          <Link href="/" className="auth-brand auth-brand-mobile"><span>S</span>svara</Link>
          <p className="auth-overline">{signup ? 'Start with a free workspace' : 'Welcome back'}</p>
          <h2>{signup ? 'Create your calling workspace' : 'Sign in to your workspace'}</h2>
          <p className="auth-subtitle">{signup ? 'Set up your first AI employee and keep every lead moving.' : 'See what your AI employees handled while you were away.'}</p>
          <div className="auth-social-grid">
            {socialProviders.map((provider) => <button key={provider.id} type="button" onClick={() => social(provider.id)} disabled={state === 'loading'}><span>{provider.mark}</span>Continue with {provider.label}</button>)}
          </div>
          <div className="auth-divider"><span>or continue with email</span></div>
          <form onSubmit={submit} className="auth-form" noValidate>
            {signup && <label htmlFor="auth-name">Your name<input id="auth-name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} autoComplete="name" placeholder="Priya Sharma" required /></label>}
            <label htmlFor="auth-email">Work email<input id="auth-email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} type="email" autoComplete="email" placeholder="you@company.com" required /></label>
            {signup && <label htmlFor="auth-phone">Mobile number<input id="auth-phone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} type="tel" autoComplete="tel" placeholder="+91 98765 43210" required /></label>}
            <div className="auth-password-field"><label htmlFor="auth-password">Password</label><div className="auth-password"><input id="auth-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} type={showPassword ? 'text' : 'password'} autoComplete={signup ? 'new-password' : 'current-password'} placeholder="At least 6 characters" required /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></div></div>
            {!signup && <button type="button" className="auth-inline-action" onClick={sendMagicLink}>Email me a secure sign-in link</button>}
            {state === 'error' && <p className="auth-message auth-error" role="alert">{message}</p>}
            {state === 'magic-sent' && <p className="auth-message auth-success" role="status">{message}</p>}
            <button className="auth-submit" disabled={state === 'loading'} type="submit">{state === 'loading' ? 'Connecting…' : signup ? 'Create account' : 'Sign in'} <span>→</span></button>
          </form>
          <p className="auth-switch">{signup ? 'Already have a workspace?' : 'New to Svara?'} <Link href={signup ? '/login' : '/signup'}>{signup ? 'Sign in' : 'Create an account'}</Link></p>
          <p className="auth-legal">By continuing, you agree to the <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
        </div>
      </section>
    </div>
  </main>;
}
