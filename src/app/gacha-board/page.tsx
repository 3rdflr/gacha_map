import GachaBoardPage from '@/components/GachaBoardPage';
import { supabase } from '@/lib/supabase';

// 1분마다 재검증
export const revalidate = 60;

export const metadata = {
  title: '신규 가챠·신규 쿠지 정보 게시판',
  description:
    '신규 가챠, 신규 쿠지(이치방쿠지), 신규 가차 출시 정보를 가장 빠르게 확인하세요. 전국 가챠 지도에서 최신 캡슐토이·제일복권 소식을 제공합니다.',
  openGraph: {
    title: '신규 가챠·신규 쿠지 정보 게시판 | 가챠 지도',
    description: '신규 가챠, 신규 쿠지(이치방쿠지), 신규 가차 출시 정보를 가장 빠르게 확인하세요.',
    url: 'https://gachamap.vercel.app/gacha-board',
  },
};

export default async function Page() {
  // 초기 데이터 SSR — 기본값(전체/최신순)을 서버에서 미리 fetch해 크롤러가 HTML에서 읽을 수 있도록
  const { data: initialPosts } = await supabase
    .from('gacha_posts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  return <GachaBoardPage initialPosts={initialPosts ?? []} />;
}
