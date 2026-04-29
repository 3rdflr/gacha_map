import { getVerifiedShops } from '@/lib/supabase';
import Header from '@/components/Header';
import KakaoMap from '@/components/Map';
import HomeContent from '@/components/HomeContent';

// 5분마다 재검증 — 매 요청마다 DB를 치지 않도록 캐싱
export const revalidate = 300;

export default async function Home() {
  const shops = await getVerifiedShops();

  return (
    <main className='flex flex-col'>
      {/* 헤더 */}
      <Header />

      {/* 데스크톱: 지도(좌) + HomeContent(우) 나란히 / 모바일: 세로 스택 */}
      <div className='lg:flex lg:items-start'>
        {/* 지도 (인터랙션 영역) */}
        <section className='relative h-[70vh] min-h-[500px] w-full lg:sticky lg:top-0 lg:h-screen lg:w-[55%] lg:min-h-screen lg:shrink-0'>
          <KakaoMap shops={shops} />
        </section>

        {/* SSR 콘텐츠 영역 — 검색엔진/AdSense 크롤러가 읽는 본문 */}
        <div className='lg:flex-1 lg:overflow-y-auto lg:h-screen'>
          <HomeContent shops={shops} />
        </div>
      </div>
    </main>
  );
}
