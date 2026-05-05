import { getVerifiedShops } from '@/lib/supabase';
import Header from '@/components/Header';
import KakaoMap from '@/components/Map';
import HomeContent from '@/components/HomeContent';
import MobileContentToggle from '@/components/MobileContentToggle';

// 5분마다 재검증 — 매 요청마다 DB를 치지 않도록 캐싱
export const revalidate = 300;

export default async function Home() {
  const shops = await getVerifiedShops();

  return (
    <main className='flex flex-col lg:h-screen lg:overflow-hidden'>
      {/* 헤더 */}
      <Header />

      {/*
        데스크톱(lg+): 헤더 아래 남은 높이를 flex 컨테이너로 잡고
                       지도(좌, 55%) + 본문(우, 나머지) 나란히 배치.
                       지도/본문 모두 헤더를 제외한 높이를 정확히 채워서
                       지도 하단 카운터 버튼이 항상 화면 안에 들어옵니다.
        모바일(<lg):  세로 스택, 지도 영역은 70vh(최소 500px) 확보.
                     SSR 본문은 토글 버튼으로 펼침/접힘.
      */}
      <div className='lg:flex lg:flex-1 lg:items-stretch lg:min-h-0'>
        {/* 지도 (인터랙션 영역) */}
        <section className='relative h-[70vh] min-h-[500px] w-full lg:h-auto lg:min-h-0 lg:w-[55%] lg:shrink-0'>
          <KakaoMap shops={shops} />
        </section>

        {/* SSR 콘텐츠 영역 — 검색엔진/AdSense 크롤러가 읽는 본문
            모바일/태블릿: 토글 버튼으로 펼침
            데스크탑(lg+): 항상 노출, 자체 스크롤 */}
        <MobileContentToggle>
          <HomeContent shops={shops} />
        </MobileContentToggle>
      </div>
    </main>
  );
}
