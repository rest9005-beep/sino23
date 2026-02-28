'use client';

import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/components/Toast';

export default function AuthPage() {
  const r = useRouter();
  const { toast, Toast } = useToast();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const path = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    }).catch(() => null);

    const data = res ? await res.json().catch(()=>null) : null;
    setBusy(false);

    if (!res || !res.ok) {
      toast(data?.error ?? 'Ошибка');
      return;
    }
    r.push('/');
    r.refresh();
  }

  return (
    <>
      <Header />
      <main className="container">
        <h1 className="pageTitle">{mode === 'login' ? 'Вход' : 'Регистрация'}</h1>

        <div className="panel" style={{ maxWidth: 520 }}>
          <div className="row" style={{ marginBottom: 12 }}>
            <button className={"pill" + (mode==='login' ? " primary" : "")} type="button" onClick={() => setMode('login')}>Вход</button>
            <button className={"pill" + (mode==='register' ? " primary" : "")} type="button" onClick={() => setMode('register')}>Регистрация</button>
          </div>

          <form onSubmit={submit}>
            <div className="field">
              <div className="label">Юзернейм</div>
              <input className="input" value={username} onChange={(e)=>setUsername(e.target.value)} minLength={3} maxLength={24} required />
            </div>
            <div className="field">
              <div className="label">Пароль</div>
              <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} minLength={6} maxLength={72} required />
            </div>

            <button className="pill primary" disabled={busy} type="submit">
              {busy ? '...' : (mode === 'login' ? 'Войти' : 'Создать')}
            </button>
          </form>
        </div>

        <Toast />
      </main>
    </>
  );
}
