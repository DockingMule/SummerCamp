"use client";

import React, { useState, useEffect } from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import ButtonAppBar from '../../components/ButtonAppBar';
import {useRouter} from 'next/navigation';
import { UserData } from '@/app/types';
import { id } from 'date-fns/locale/id';

const Page = () => {
  const isAuthenticated = useIsAuthenticated();
  const signIn = useSignIn<UserData>();
  const {push} = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Login Handle, the callback function onClick from the "Login" button
   *
   * This function demonstrates a fake authentication, using useSignIn function
   */
  const loginHandler =  async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    if (!email) {
      setError('Please enter an email');
      return;
    }
    setLoading(true);
    const controller = new AbortController();


    try {
      const res = await fetch(`http://localhost:8080/user?email=${email}&password=${encodeURIComponent(password)}`, { signal: controller.signal });
      if (!res.ok) {
        return;
      }
      const userData = await res.json();
      console.log('User Data:', await res);
      if (!userData.match) {
        throw new Error('Invalid credentials');
      }
      const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365; // 1 year
      const payload = { exp };
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + btoa(JSON.stringify(payload)) + '.signature';

      signIn({
        auth: { token: fakeToken },
        userState: { name: userData.name || userData.email.split('@')[0], uid: 'local-uid', email: userData.email },
      });

      push('/admin/participants');
    } catch (err: any) {
      setError(err?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isAuthenticated) push('/admin/participants');
  }, [isAuthenticated, push]);

  if (isAuthenticated) return <></>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <ButtonAppBar />
      <form
        onSubmit={loginHandler}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          width: 360,
          padding: 24,
          background: 'rgba(255,255,255,0.92)',
          borderRadius: 8,
          boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
        }}
      >
        <h2>Admin Sign In</h2>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Email
          <input
            style={{ width: '100%', padding: 8, marginTop: 6, borderRadius: 4, border: '1px solid #ccc' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Password
          <input
            style={{ width: '100%', padding: 8, marginTop: 6, borderRadius: 4, border: '1px solid #ccc' }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </label>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '10px', borderRadius: 6, background: '#1976d2', color: '#fff', border: 'none' }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Page;