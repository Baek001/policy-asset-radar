'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/core';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const sendMagicLink = async () => {
    const db = supabase();
    if (!db) return setMsg('Supabase 환경변수가 없어 로그인 기능을 사용할 수 없습니다.');
    const { error } = await db.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined },
    });
    setMsg(error ? `실패: ${error.message}` : '메일로 로그인 링크를 보냈습니다.');
  };

  const googleLogin = async () => {
    const db = supabase();
    if (!db) return setMsg('Supabase 환경변수가 없어 로그인 기능을 사용할 수 없습니다.');
    const { error } = await db.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined },
    });
    if (error) setMsg(`실패: ${error.message}`);
  };

  return (
    <main>
      <Link href="/">← 홈</Link>
      <h1>로그인</h1>
      <p>이메일 또는 구글 계정으로 로그인</p>

      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: 280, marginRight: 8 }}
        />
        <button onClick={sendMagicLink}>이메일 링크 받기</button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <button onClick={googleLogin}>Google로 로그인</button>
      </div>

      {msg ? <p>{msg}</p> : null}
    </main>
  );
}
