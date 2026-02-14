'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/core';

export default function AuthStatus() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const db = supabase();
    if (!db) return;

    db.auth.getSession().then(({ data }) => {
      const e = data?.session?.user?.email || '';
      setEmail(e);
    });

    const { data: listener } = db.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email || '');
    });

    return () => listener?.subscription?.unsubscribe();
  }, []);

  const signOut = async () => {
    const db = supabase();
    if (!db) return;
    await db.auth.signOut();
    setEmail('');
  };

  if (!email) return <span><Link href="/auth">로그인</Link></span>;

  return (
    <span>
      로그인: {email} <button onClick={signOut}>로그아웃</button>
    </span>
  );
}
