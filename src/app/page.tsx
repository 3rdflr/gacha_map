import { getVerifiedShops } from '@/lib/supabase';
import Header from '@/components/Header';
import KakaoMap from '@/components/Map';
import HomeContent from '@/components/HomeContent';
import MobileContentToggle from '@/components/MobileContentToggle';

export const revalidate = 3600;

export default async function Home() {
  const shops = await getVerifiedShops();

  return (
    <main className='flex flex-col lg:h-screen lg:overflow-hidden'>
      <Header />

      <div className='lg:flex lg:flex-1 lg:items-stretch lg:min-h-0'>
        {/* 지도 (인터랙션 영역) */}
        <section className='relative h-[70vh] min-h-[500px] w-full lg:h-auto lg:min-h-0 lg:w-[55%] lg:shrink-0'>
          <KakaoMap shops={shops} />
        </section>

        {/* SSR 콘텐츠 영역 — 모바일/태블릿: 토글, 데스크탑: 항상 노출 */}
        <MobileContentToggle>
          <HomeContent shops={shops} />
        </MobileContentToggle>
      </div>
    </main>
  );
}
