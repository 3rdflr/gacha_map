import { getVerifiedShops } from '@/lib/supabase';
import Header from '@/components/Header';
import KakaoMap from '@/components/Map';
import GoogleAd from '@/components/GoogleAd';

// 5분마다 재검증 — 매 요청마다 DB를 치지 않도록 캐싱
export const revalidate = 300;

export default async function Home() {
  const shops = await getVerifiedShops();

  return (
    <main className='flex flex-col'>
      {/* 헤더 */}
      <Header />

      {/* 지도 */}
      <section>
        <KakaoMap shops={shops} />
      </section>

      {/* 하단 광고 */}
      <section className='w-full'>
        <GoogleAd slot='8512765081' />
      </section>
    </main>
  );
}
