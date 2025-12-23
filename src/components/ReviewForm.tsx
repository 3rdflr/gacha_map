'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { Star, Send } from 'lucide-react';

export default function ReviewForm({ shopId }: { shopId: number }) {
  const user = useAuthStore((state) => state.user);
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 로그인하지 않은 경우 폼을 표시하지 않음
  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from('reviews').insert({
      shop_id: shopId,
      user_id: user.id,
      rating,
      content: content.trim(),
    });

    setIsSubmitting(false);

    if (error) {
      if (error.code === '23505') {
        alert('이미 이 가게에 리뷰를 작성하셨습니다.');
      } else {
        console.error('리뷰 등록 실패:', error);
        alert('리뷰 등록에 실패했습니다.');
      }
    } else {
      alert('리뷰가 등록되었습니다!');
      setContent('');
      setRating(5);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mt-6 border-t pt-6'>
      <h3 className='text-lg font-bold mb-4'>리뷰 남기기</h3>

      {/* 별점 선택 (인터랙티브) */}
      <div className='mb-4'>
        <label className='block text-sm font-semibold text-gray-700 mb-2'>
          별점을 선택해주세요
        </label>
        <div className='flex gap-1'>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type='button'
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className='transition-transform hover:scale-110 active:scale-95'
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoveredRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                } transition-colors`}
              />
            </button>
          ))}
        </div>
        <p className='text-xs text-gray-500 mt-1'>
          {rating === 5 && '⭐ 최고예요!'}
          {rating === 4 && '⭐ 좋아요'}
          {rating === 3 && '⭐ 괜찮아요'}
          {rating === 2 && '⭐ 별로예요'}
          {rating === 1 && '⭐ 최악이에요'}
        </p>
      </div>

      {/* 리뷰 내용 입력 */}
      <div className='mb-4'>
        <label className='block text-sm font-semibold text-gray-700 mb-2'>리뷰 내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='이 가게에 대한 솔직한 후기를 남겨주세요'
          className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
          rows={4}
          maxLength={500}
        />
        <p className='text-xs text-gray-500 text-right mt-1'>{content.length}/500</p>
      </div>

      {/* 제출 버튼 */}
      <button
        type='submit'
        disabled={isSubmitting || !content.trim()}
        className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2'
      >
        {isSubmitting ? (
          <>
            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
            등록 중...
          </>
        ) : (
          <>
            <Send className='w-5 h-5' />
            리뷰 등록하기
          </>
        )}
      </button>
    </form>
  );
}
