'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Eye, Plus } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

interface GachaPost {
  id: string;
  title: string;
  description: string;
  release_date: string;
  brand: string;
  country: string;
  price: number;
  image_url: string;
  thumbnail_url: string;
  series: string;
  tags: string[];
  view_count: number;
  created_at: string;
}

const COUNTRY_FLAG: Record<string, string> = {
  일본: '🇯🇵',
  한국: '🇰🇷',
};

export default function GachaBoardPage() {
  const { profile } = useAuthStore();
  const [posts, setPosts] = useState<GachaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'release'>('latest');

  const isAdmin = profile?.is_admin || false;

  useEffect(() => {
    fetchPosts();
  }, [selectedBrand, sortBy]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let query = supabase.from('gacha_posts').select('*').eq('is_published', true);

      if (selectedBrand !== 'all') {
        query = query.eq('brand', selectedBrand);
      }

      if (sortBy === 'latest') {
        query = query.order('created_at', { ascending: false });
      } else {
        query = query.order('release_date', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return price ? `${price.toLocaleString()}원` : '가격 미정';
  };

  const tabs = [
    { value: 'all', label: '전체' },
    { value: '가챠', label: '가챠' },
    { value: '쿠지', label: '쿠지' },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        {/* 헤더 */}
        <div className='mb-6'>
          <div className='flex items-center justify-between mb-5'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900 mb-0.5'>신규 가챠 &amp; 쿠지 정보</h1>
              <p className='text-gray-400 text-sm'>최신 출시 정보를 확인하세요</p>
            </div>
            {isAdmin && (
              <Link
                href='/gacha-board/create'
                className='flex items-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95'
              >
                <Plus size={15} />
                새 게시글
              </Link>
            )}
          </div>

          {/* 카테고리 탭 & 정렬 */}
          <div className='flex items-center justify-between border-b border-gray-200'>
            {/* 탭 */}
            <div className='flex'>
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedBrand(tab.value)}
                  className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                    selectedBrand === tab.value
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 정렬 */}
            <div className='flex items-center gap-3 pb-1'>
              <button
                onClick={() => setSortBy('latest')}
                className={`text-xs transition-colors ${
                  sortBy === 'latest' ? 'text-gray-900 font-semibold' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                최신순
              </button>
              <span className='text-gray-200'>|</span>
              <button
                onClick={() => setSortBy('release')}
                className={`text-xs transition-colors ${
                  sortBy === 'release' ? 'text-gray-900 font-semibold' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                출시일순
              </button>
            </div>
          </div>
        </div>

        {/* 게시글 목록 */}
        {loading ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className='bg-white rounded-xl overflow-hidden animate-pulse border border-gray-100'>
                <div className='aspect-square bg-gray-200' />
                <div className='p-3 space-y-2'>
                  <div className='h-3 bg-gray-200 rounded w-1/3' />
                  <div className='h-4 bg-gray-200 rounded w-full' />
                  <div className='h-3 bg-gray-200 rounded w-2/3' />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className='text-center py-20'>
            <p className='text-gray-400'>아직 등록된 게시글이 없습니다.</p>
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {posts.map((post) => {
              const flag = COUNTRY_FLAG[post.country];

              return (
                <Link
                  key={post.id}
                  href={`/gacha-board/${post.id}`}
                  className='group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-200'
                >
                  {/* 이미지 */}
                  <div className='relative aspect-square bg-gray-50 overflow-hidden'>
                    {post.thumbnail_url || post.image_url ? (
                      <Image
                        src={post.thumbnail_url || post.image_url}
                        alt={post.title}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                    ) : (
                      <div className='flex items-center justify-center h-full text-gray-300 text-4xl'>
                        🎰
                      </div>
                    )}

                    {/* 국가 배지 */}
                    {flag && (
                      <div className='absolute top-2 left-2'>
                        <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-sm text-white'>
                          {flag} {post.country}
                        </span>
                      </div>
                    )}

                    {/* 조회수 */}
                    <div className='absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded-full flex items-center gap-1'>
                      <Eye size={10} className='text-white' />
                      <span className='text-white text-xs'>{post.view_count}</span>
                    </div>
                  </div>

                  {/* 내용 */}
                  <div className='p-3'>
                    {/* 브랜드 태그 */}
                    <span className='inline-block px-2 py-0.5 rounded text-xs font-semibold mb-1.5 bg-gray-100 text-gray-500'>
                      {post.brand}
                    </span>

                    {/* 제목 */}
                    <h3 className='font-semibold text-sm text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors leading-snug'>
                      {post.title}
                    </h3>

                    {/* 시리즈 */}
                    {post.series && (
                      <p className='text-xs text-gray-400 truncate mb-2'>{post.series}</p>
                    )}

                    {/* 출시일 & 가격 */}
                    <div className='flex items-center justify-between pt-2 border-t border-gray-50'>
                      <div className='flex items-center gap-1 text-gray-400'>
                        <Calendar size={10} />
                        <span className='text-xs'>{formatDate(post.release_date)}</span>
                      </div>
                      {post.price ? (
                        <span className='text-xs font-bold text-blue-600'>{formatPrice(post.price)}</span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
