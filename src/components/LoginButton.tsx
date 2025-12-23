'use client';

import { supabase } from '@/lib/supabase';

export default function LoginButton() {
  const handleKakaoLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) console.error('Login failed:', error.message);
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className='bg-[#FEE500] text-[#000000] px-4 py-2 rounded-md font-bold text-sm'
    >
      카카오 로그인
    </button>
  );
}
