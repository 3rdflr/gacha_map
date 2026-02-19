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

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        {/* 헤더 */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h1 className='text-4xl font-bold text-gray-900 mb-2'>
                🎰 신규 가챠 & 이치방쿠지 정보
              </h1>
              <p className='text-gray-600'>최신 가챠 및 이치방쿠지 출시 정보를 확인하세요</p>
            </div>

            {isAdmin && (
              <Link
                href='/gacha-board/create'
                className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all hover:shadow-xl active:scale-95'
              >
                <Plus size={20} />새 게시글 작성
              </Link>
            )}
          </div>

          {/* 필터 및 정렬 */}
          <div className='flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl shadow-sm'>
            {/* 브랜드 필터 */}
            <div className='flex gap-2'>
              <button
                onClick={() => setSelectedBrand('all')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedBrand === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedBrand('가챠')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedBrand === '가챠'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                가챠
              </button>
              <button
                onClick={() => setSelectedBrand('이치방쿠지')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedBrand === '이치방쿠지'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                이치방쿠지
              </button>
            </div>

            {/* 정렬 */}
            <div className='flex gap-2 ml-auto'>
              <button
                onClick={() => setSortBy('latest')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  sortBy === 'latest'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                최신순
              </button>
              <button
                onClick={() => setSortBy('release')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  sortBy === 'release'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                출시일순
              </button>
            </div>
          </div>
        </div>

        {/* 게시글 목록 */}
        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className='bg-white rounded-xl shadow-md overflow-hidden animate-pulse'>
                <div className='h-48 bg-gray-200' />
                <div className='p-4 space-y-3'>
                  <div className='h-4 bg-gray-200 rounded w-3/4' />
                  <div className='h-3 bg-gray-200 rounded w-1/2' />
                  <div className='h-3 bg-gray-200 rounded w-full' />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className='text-center py-20'>
            <p className='text-gray-500 text-lg'>아직 등록된 게시글이 없습니다.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/gacha-board/${post.id}`}
                className='group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'
              >
                {/* 이미지 */}
                <div className='relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden'>
                  {post.thumbnail_url || post.image_url ? (
                    <Image
                      src={post.thumbnail_url || post.image_url}
                      alt={post.title}
                      fill
                      className='object-cover group-hover:scale-110 transition-transform duration-300'
                    />
                  ) : (
                    <div className='flex items-center justify-center h-full'>
                      <span className='text-6xl'>🎰</span>
                    </div>
                  )}

                  {/* 브랜드 배지 */}
                  <div className='absolute top-3 left-3'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                        post.brand === '가챠' ? 'bg-blue-500' : 'bg-purple-500'
                      }`}
                    >
                      {post.brand}
                    </span>
                  </div>

                  {/* 조회수 */}
                  <div className='absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1'>
                    <Eye size={12} className='text-white' />
                    <span className='text-white text-xs'>{post.view_count}</span>
                  </div>
                </div>

                {/* 내용 */}
                <div className='p-5'>
                  <h3 className='font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors'>
                    {post.title}
                  </h3>

                  {post.series && (
                    <p className='text-sm text-blue-600 font-medium mb-2'>{post.series}</p>
                  )}

                  {post.description && (
                    <p className='text-sm text-gray-600 line-clamp-2 mb-3'>{post.description}</p>
                  )}

                  {/* 메타 정보 */}
                  <div className='space-y-2 text-sm'>
                    <div className='flex items-center gap-2 text-gray-500'>
                      <Calendar size={14} />
                      <span>출시일: {formatDate(post.release_date)}</span>
                    </div>

                    {post.price && (
                      <div className='flex items-center gap-2'>
                        <span className='font-bold text-blue-600'>{formatPrice(post.price)}</span>
                      </div>
                    )}

                    {post.tags && post.tags.length > 0 && (
                      <div className='flex items-center gap-2 flex-wrap'>
                        <Tag size={14} className='text-gray-400' />
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className='px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs'
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
