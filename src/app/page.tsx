import { getVerifiedShops } from '@/lib/supabase';
import Header from '@/components/Header';
import KakaoMap from '@/components/Map';
import HomeContent from '@/components/HomeContent';

// 5분마다 재검증 — 매 요청마다 DB를 치지 않도록 캐싱
export const revalidate = 300;

export default async function Home() {
  const shops = await getVerifiedShops();

  return (
    <main className='flex min-h-screen flex-col'>
      {/* 헤더 */}
      <Header />

      {/* 지도 (인터랙션 영역) */}
      <section className='relative h-[70vh] min-h-[500px] w-full'>
        <KakaoMap shops={shops} />
      </section>

      {/* SSR 콘텐츠 영역 — 검색엔진/AdSense 크롤러가 읽는 본문 */}
      <HomeContent shops={shops} />
    </main>
  );
}
