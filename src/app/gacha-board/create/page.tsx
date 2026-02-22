'use client';

import dynamic from 'next/dynamic';

// 관리자 전용 무거운 컴포넌트 — 초기 번들에서 분리
const GachaPostEditor = dynamic(() => import('@/components/GachaPostEditor'), {
  ssr: false,
  loading: () => (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin' />
    </div>
  ),
});

export default function Page() {
  return <GachaPostEditor />;
}
