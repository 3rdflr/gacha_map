'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Eye, Tag, ArrowLeft, Edit, Trash2 } from 'lucide-react';

interface GachaPost {
  id: string;
  title: string;
  description: string;
  release_date: string;
  brand: string;
  price: number;
  image_url: string;
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

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      // 조회수 증가
      await supabase.rpc('increment_view_count', { post_id: postId });

      // 게시글 가져오기
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

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='container mx-auto px-4 max-w-4xl'>
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
        <div className='container mx-auto px-4 max-w-4xl text-center'>
          <p className='text-gray-500'>게시글을 찾을 수 없습니다.</p>
          <Link href='/gacha-board' className='text-blue-600 hover:underline mt-4 inline-block'>
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4 max-w-4xl'>
        {/* 뒤로가기 */}
        <Link
          href='/gacha-board'
          className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6'
        >
          <ArrowLeft size={20} />
          목록으로 돌아가기
        </Link>

        {/* 게시글 컨테이너 */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          {/* 이미지 */}
          {post.image_url && (
            <div className='relative w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100'>
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className='object-contain'
                priority
              />
            </div>
          )}

          {/* 내용 */}
          <div className='p-8'>
            {/* 헤더 */}
            <div className='flex items-start justify-between mb-6'>
              <div className='flex-1'>
                {/* 브랜드 배지 */}
                <div className='flex items-center gap-2 mb-3'>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold text-white ${
                      post.brand === '가챠' ? 'bg-blue-500' : 'bg-purple-500'
                    }`}
                  >
                    {post.brand}
                  </span>
                  {post.series && (
                    <span className='text-sm text-blue-600 font-medium'>{post.series}</span>
                  )}
                </div>

                {/* 제목 */}
                <h1 className='text-3xl font-bold text-gray-900 mb-4'>{post.title}</h1>

                {/* 메타 정보 */}
                <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600'>
                  <div className='flex items-center gap-1'>
                    <Calendar size={16} />
                    <span>출시일: {formatDate(post.release_date)}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Eye size={16} />
                    <span>조회 {post.view_count}</span>
                  </div>
                  {post.price && (
                    <div className='font-bold text-blue-600 text-lg'>{formatPrice(post.price)}</div>
                  )}
                </div>
              </div>

              {/* 관리자 액션 */}
              {isAdmin && (
                <div className='flex gap-2'>
                  <Link
                    href={`/gacha-board/edit/${post.id}`}
                    className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition'
                    title='수정'
                  >
                    <Edit size={20} />
                  </Link>
                  <button
                    onClick={handleDelete}
                    className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition'
                    title='삭제'
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* 구분선 */}
            <hr className='my-6' />

            {/* 설명 */}
            {post.description && (
              <div className='mb-6'>
                <h2 className='text-lg font-semibold text-gray-900 mb-3'>상세 정보</h2>
                <p className='text-gray-700 whitespace-pre-wrap leading-relaxed'>
                  {post.description}
                </p>
              </div>
            )}

            {/* 태그 */}
            {post.tags && post.tags.length > 0 && (
              <div className='flex items-center gap-2 flex-wrap'>
                <Tag size={16} className='text-gray-400' />
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className='px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* 등록일 */}
            <div className='mt-8 pt-6 border-t text-sm text-gray-500'>
              등록일: {formatDate(post.created_at)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
