import { MetadataRoute } from 'next';
import { supabase, getVerifiedShops } from '@/lib/supabase';

const REGION_SLUGS = ['hongdae', 'gangnam', 'sinchon', 'myeongdong', 'busan'];
const GUIDE_SLUGS = ['gacha-beginner', 'ichiban-kuji', 'capsule-toy-brands'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gachamap.vercel.app';
  const today = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: today, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/gacha-board`, lastModified: today, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: today, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const guideRoutes: MetadataRoute.Sitemap = GUIDE_SLUGS.map((slug) => ({
    url: `${baseUrl}/guide/${slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const regionRoutes: MetadataRoute.Sitemap = REGION_SLUGS.map((slug) => ({
    url: `${baseUrl}/regions/${slug}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 가챠보드 게시글 동적 포함
  const { data: posts } = await supabase
    .from('gacha_posts')
    .select('id, created_at')
    .order('created_at', { ascending: false });

  const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${baseUrl}/gacha-board/${post.id}`,
    lastModified: new Date(post.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 매장 상세 페이지
  const shops = await getVerifiedShops();
  const shopRoutes: MetadataRoute.Sitemap = shops.map((s) => ({
    url: `${baseUrl}/shops/${s.id}`,
    lastModified: new Date(s.last_updated),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...guideRoutes, ...regionRoutes, ...postRoutes, ...shopRoutes];
}
