import { getVerifiedShops } from '@/lib/supabase';
import Header from '@/components/Header';
import KakaoMap from '@/components/Map';
import GoogleAd from '@/components/GoogleAd';

// 서버 컴포넌트이므로 async 사용 가능
export default async function Home() {
  const shops = await getVerifiedShops();

  return (
    <main className='flex min-h-screen flex-col'>
      {/* 헤더 */}
      <Header />

      {/* 지도 */}
      <section className='flex-1'>
        <KakaoMap shops={shops} />
      </section>

      {/* 광고 (지도 위 or 아래 중 선택) */}
      <section className='w-full h-auto'>
        <GoogleAd slot='6852499093' />
      </section>
    </main>
  );
}
