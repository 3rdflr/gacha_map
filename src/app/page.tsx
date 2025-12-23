import { getVerifiedShops } from '@/lib/supabase';
import Header from '@/components/Header';
import KakaoMap from '@/components/Map';
import GoogleAd from '@/components/GoogleAd';

// 서버 컴포넌트이므로 async 사용 가능
export default async function Home() {
  const shops = await getVerifiedShops();

  return (
    <main className='w-full h-screen relative'>
      {/* 헤더 컴포넌트 */}
      <Header />
      <div className='absolute top-20 left-1 right-1 z-10 bg-white p-4 gap-10'>
        {/* 지도 컴포넌트 */}
        <KakaoMap shops={shops} />
        <GoogleAd slot='' />
      </div>
    </main>
  );
}
