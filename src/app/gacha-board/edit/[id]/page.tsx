'use client';

import dynamic from 'next/dynamic';

const GachaPostEditor = dynamic(() => import('@/components/GachaPostEditor'), {
  ssr: false,
  loading: () => (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
    </div>
  ),
});

export default function Page({ params }: { params: { id: string } }) {
  return <GachaPostEditor postId={params.id} />;
}
