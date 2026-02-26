'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Suspense } from 'react';

function AuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 카카오 로그인 취소 시 error=access_denied 쿼리가 붙어서 돌아옴
    const errorParam = searchParams.get('error');
    if (errorParam) {
      router.replace('/');
      return;
    }

    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        router.replace('/');
      } else if (error) {
        console.error('로그인 처리 중 오류:', error.message);
        router.replace('/');
      } else {
        // session도 error도 없으면 (ex. 직접 URL 접근) 홈으로
        router.replace('/');
      }
    };

    handleAuth();
  }, [router, searchParams]);

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
      <div className='w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin' />
      <p className='text-lg font-medium'>카카오 로그인 중...</p>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense>
      <AuthCallbackInner />
    </Suspense>
  );
}
