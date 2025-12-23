'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      // 1. URL에 포함된 토큰을 이용해 세션을 가져옵니다.
      // 이 과정에서 Supabase 라이브러리가 브라우저 쿠키/로컬스토리지에 로그인 정보를 저장합니다.
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        // 2. 로그인이 확인되면 메인 페이지('/')로 이동시킵니다.
        // router.replace를 쓰면 주소창이 깔끔하게 '/'로 바뀌고 뒤로가기가 방지됩니다.
        router.replace('/');
      } else if (error) {
        console.error('로그인 처리 중 오류:', error.message);
        router.replace('/');
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
      {/* 사용자가 보게 될 로딩 화면 */}
      <div className='w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin' />
      <p className='text-lg font-medium'>로그인 완료 중...</p>
    </div>
  );
}
