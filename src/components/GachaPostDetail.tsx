'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Eye, Tag, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { wsrvLoader } from '@/components/common/wsrvLoader';
import GoogleAd from '@/components/GoogleAd';
import { formatDate, formatPrice } from '@/lib/formatters';

interface GachaPost {
  id: string;
  title: string;
  description: string;
  release_date: string;
  brand: string;
  country: string;
  price: number;
  image_url: string;
  images: string[] | null;
  captions: string[] | null;
  series: string;
  tags: string[];
  view_count: number;
  created_at: string;
}

export default function GachaPostDetail({ postId }: { postId: string }) {
  const router = useRouter();
  const { profile } = useAuthStore();
  const [post, setPost] = useState<GachaPost | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = profile?.is_admin || false;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchPost(); }, [postId]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      await supabase.rpc('increment_view_count', { post_id: postId });

      const { data, error } = await supabase
        .from('gacha_posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      alert('게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase.from('gacha_posts').delete().eq('id', postId);
      if (error) throw error;
      alert('게시글이 삭제되었습니다.');
      router.push('/gacha-board');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };


  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='container mx-auto px-4 max-w-2xl'>
          <div className='bg-white rounded-xl shadow-md p-8 animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-3/4 mb-4' />
            <div className='h-96 bg-gray-200 rounded mb-4' />
            <div className='h-4 bg-gray-200 rounded w-full mb-2' />
            <div className='h-4 bg-gray-200 rounded w-2/3' />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='container mx-auto px-4 max-w-2xl text-center'>
          <p className='text-gray-500'>게시글을 찾을 수 없습니다.</p>
          <Link href='/gacha-board' className='text-blue-600 hover:underline mt-4 inline-block'>
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  // images[] 우선, 없으면 image_url fallback
  const allImages: string[] = post.images?.length ? post.images : (post.image_url ? [post.image_url] : []);
  const allCaptions: string[] = post.captions || [];
  const mainImage = allImages[0] ?? null;
  // 대표 이미지는 상단 풀블리드 + 하단 콘텐츠 섹션 모두 표시
  const detailImages = allImages;

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* 상단 메인 이미지 (풀블리드) */}
      {mainImage && (
        <div className='relative w-full bg-gray-50' style={{ aspectRatio: '4/3', maxHeight: '480px' }}>
          <Image
            loader={wsrvLoader}
            src={mainImage}
            alt={post.title}
            fill
            className='object-contain'
            priority
          />
        </div>
      )}

      <div className='container mx-auto px-4 max-w-2xl py-6'>
        {/* 뒤로가기 */}
        <Link
          href='/gacha-board'
          className='inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-5 text-sm'
        >
          <ArrowLeft size={16} />
          목록으로 돌아가기
        </Link>

        {/* 배지 + 제목 + 메타 */}
        <div className='mb-6'>
          <div className='flex items-center gap-2 mb-3 flex-wrap'>
            {post.country === '일본' && (
              <span className='px-3 py-1 rounded-full text-xs font-bold text-white bg-red-500'>
                🇯🇵 일본
              </span>
            )}
            {post.country === '한국' && (
              <span className='px-3 py-1 rounded-full text-xs font-bold text-white bg-blue-500'>
                🇰🇷 한국
              </span>
            )}
            <span className='px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600'>
              {post.brand}
            </span>
            {post.series && (
              <span className='text-xs text-gray-400 font-medium'>{post.series}</span>
            )}
          </div>

          <div className='flex items-start justify-between gap-3'>
            <h1 className='text-2xl font-bold text-gray-900 leading-snug'>{post.title}</h1>
            {isAdmin && (
              <div className='flex gap-1 flex-shrink-0'>
                <Link
                  href={`/gacha-board/edit/${post.id}`}
                  className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition'
                  title='수정'
                >
                  <Edit size={18} />
                </Link>
                <button
                  onClick={handleDelete}
                  className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition'
                  title='삭제'
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>

          <div className='flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500'>
            <div className='flex items-center gap-1'>
              <Calendar size={14} />
              <span>출시일: {formatDate(post.release_date)}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Eye size={14} />
              <span>조회 {post.view_count}</span>
            </div>
            {post.price && (
              <span className='font-bold text-blue-600 text-base'>{formatPrice(post.price, post.country)}</span>
            )}
          </div>
        </div>

        {/* 태그 */}
        {post.tags && post.tags.length > 0 && (
          <div className='flex items-center gap-2 flex-wrap mb-6'>
            <Tag size={14} className='text-gray-400' />
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className='px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium'
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 상세 설명 */}
        {post.description && (
          <div className='mb-8'>
            <h2 className='text-base font-semibold text-gray-800 mb-2'>상세 정보</h2>
            <p className='text-gray-700 whitespace-pre-wrap leading-relaxed text-sm'>
              {post.description}
            </p>
          </div>
        )}

        <hr className='mb-8' />

        {/* 전체 이미지 + 각 캡션 (대표 이미지 포함) */}
        {detailImages.map((imgUrl, idx) => (
          <div key={imgUrl} className='mb-8'>
            <div className='relative w-full rounded-xl overflow-hidden bg-gray-100' style={{ aspectRatio: '4/3' }}>
              <Image
                loader={wsrvLoader}
                src={imgUrl}
                alt={`${post.title} - 이미지 ${idx + 1}`}
                fill
                className='object-contain'
              />
            </div>
            {allCaptions[idx] && (
              <p className='mt-3 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap'>
                {allCaptions[idx]}
              </p>
            )}
          </div>
        ))}

        {/* 등록일 */}
        <div className='pt-4 border-t text-xs text-gray-400'>
          등록일: {formatDate(post.created_at)}
        </div>

        {/* 하단 광고 */}
        <div className='mt-8'>
          <GoogleAd slot='6852499093' format='auto' responsive='true' />
        </div>
      </div>
    </div>
  );
}
