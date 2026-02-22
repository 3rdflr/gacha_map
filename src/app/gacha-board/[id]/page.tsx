import { Metadata } from 'next';
import GachaPostDetail from '@/components/GachaPostDetail';
import { supabase } from '@/lib/supabase';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data: post } = await supabase
    .from('gacha_posts')
    .select('title, description, brand, country, images')
    .eq('id', params.id)
    .single();

  if (!post) {
    return {
      title: '가챠 정보',
      description: '가챠 지도에서 최신 가챠·쿠지 정보를 확인하세요.',
    };
  }

  const brandLabel = post.brand === '쿠지' ? '쿠지(이치방쿠지)' : '가챠';
  const title = `${post.title} | ${brandLabel} 신규 정보`;
  const description = post.description
    ? `${post.description.slice(0, 100)}...`
    : `${post.title} - 최신 ${brandLabel} 출시 정보. 가챠 지도에서 확인하세요.`;
  const imageUrl = post.images?.[0] ?? 'https://gachamap.vercel.app/og-image.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://gachamap.vercel.app/gacha-board/${params.id}`,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <GachaPostDetail postId={params.id} />;
}
