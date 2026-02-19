'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Eye, Tag, Plus } from 'lucide-react';
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

export default function GachaBoardPage() {
  const { profile } = useAuthStore();
  const [posts, setPosts] = useState<GachaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'release'>('latest');

  const isAdmin = profile?.is_admin || false;

  useEffect(() => {
    fetchPosts();
  }, [selectedCountry, selectedBrand, sortBy]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let query = supabase.from('gacha_posts').select('*').eq('is_published', true);

      if (selectedCountry !== 'all') {
        query = query.eq('country', selectedCountry);
      }

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

  const countryConfig: Record<string, { label: string; flag: string; color: string }> = {
    일본: { label: '일본 쿠지', flag: '🇯🇵', color: 'bg-red-500' },
    한국: { label: '한국 쿠지', flag: '🇰🇷', color: 'bg-blue-500' },
  };

  const brandConfig: Record<string, { color: string; bg: string }> = {
    가챠: { color: 'text-emerald-700', bg: 'bg-emerald-100' },
    이치방쿠지: { color: 'text-purple-700', bg: 'bg-purple-100' },
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        {/* 헤더 */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 mb-1'>
                신규 가챠 &amp; 쿠지 정보
              </h1>
              <p className='text-gray-500 text-sm'>최신 가챠 및 쿠지 출시 정보를 확인하세요</p>
            </div>

            {isAdmin && (
              <Link
                href='/gacha-board/create'
                className='flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95'
              >
                <Plus size={16} />
                새 게시글
              </Link>
            )}
          </div>

          {/* 국가 탭 */}
          <div className='flex gap-1 mb-4 border-b border-gray-200'>
            <button
              onClick={() => { setSelectedCountry('all'); setSelectedBrand('all'); }}
              className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                selectedCountry === 'all'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => { setSelectedCountry('일본'); setSelectedBrand('all'); }}
              className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                selectedCountry === '일본'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              🇯🇵 일본 쿠지
            </button>
            <button
              onClick={() => { setSelectedCountry('한국'); setSelectedBrand('all'); }}
              className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                selectedCountry === '한국'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              🇰🇷 한국 쿠지
            </button>
          </div>

          {/* 브랜드 필터 & 정렬 */}
          <div className='flex flex-wrap gap-3 items-center'>
            <div className='flex gap-2'>
              <button
                onClick={() => setSelectedBrand('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                  selectedBrand === 'all'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedBrand('가챠')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                  selectedBrand === '가챠'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
                }`}
              >
                가챠
              </button>
              <button
                onClick={() => setSelectedBrand('이치방쿠지')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                  selectedBrand === '이치방쿠지'
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
                }`}
              >
                이치방쿠지
              </button>
            </div>

            <div className='flex gap-2 ml-auto'>
              <button
                onClick={() => setSortBy('latest')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition ${
                  sortBy === 'latest' ? 'text-gray-900 font-bold' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                최신순
              </button>
              <span className='text-gray-300 text-xs self-center'>|</span>
              <button
                onClick={() => setSortBy('release')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition ${
                  sortBy === 'release' ? 'text-gray-900 font-bold' : 'text-gray-400 hover:text-gray-700'
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
            <p className='text-gray-400 text-base'>아직 등록된 게시글이 없습니다.</p>
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {posts.map((post) => {
              const country = post.country;
              const countryInfo = countryConfig[country];
              const brandInfo = brandConfig[post.brand];

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

                    {/* 국가 뱃지 */}
                    {countryInfo && (
                      <div className='absolute top-2 left-2'>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold text-white shadow ${countryInfo.color}`}
                        >
                          {countryInfo.flag} {country}
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
                    {/* 브랜드 */}
                    {brandInfo && (
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mb-1.5 ${brandInfo.bg} ${brandInfo.color}`}
                      >
                        {post.brand}
                      </span>
                    )}

                    {/* 제목 */}
                    <h3 className='font-semibold text-sm text-gray-900 line-clamp-2 mb-1.5 group-hover:text-blue-600 transition-colors leading-snug'>
                      {post.title}
                    </h3>

                    {/* 시리즈 */}
                    {post.series && (
                      <p className='text-xs text-gray-500 mb-1.5 truncate'>{post.series}</p>
                    )}

                    {/* 출시일 & 가격 */}
                    <div className='flex items-center justify-between mt-2 pt-2 border-t border-gray-50'>
                      <div className='flex items-center gap-1 text-gray-400'>
                        <Calendar size={10} />
                        <span className='text-xs'>{formatDate(post.release_date)}</span>
                      </div>
                      {post.price ? (
                        <span className='text-xs font-bold text-blue-600'>{formatPrice(post.price)}</span>
                      ) : null}
                    </div>

                    {/* 태그 */}
                    {post.tags && post.tags.length > 0 && (
                      <div className='flex gap-1 flex-wrap mt-2'>
                        {post.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className='px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-xs'
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
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
