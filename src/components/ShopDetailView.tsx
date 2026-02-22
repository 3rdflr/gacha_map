import Image from 'next/image';
import { Shop } from '@/types/db';
import { wsrvLoader } from '@/components/common/wsrvLoader';
// import GoogleAd from '@/components/GoogleAd';
import ReviewForm from '@/components/ReviewForm';
import ReportForm from '@/components/ReportForm';
import { ChevronLeft, ChevronRight, ArrowLeft, X, Star, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface ShopDetailViewProps {
  shop: Shop;
  onClose: () => void;
  onBackToList?: () => void;
}

interface Review {
  id: number;
  shop_id: number;
  user_id: string;
  rating: number;
  content: string | null;
  created_at: string;
  user_email?: string; // 사용자 정보 (옵션)
}

export default function ShopDetailView({ shop, onClose, onBackToList }: ShopDetailViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const hasImages = shop?.images && Array.isArray(shop.images) && shop.images.length > 0;

  // 리뷰 데이터 가져오기
  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('shop_id', shop.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      setReviews(data || []);

      // 평균 평점 계산
      if (data && data.length > 0) {
        const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
        setAverageRating(Math.round(avg * 10) / 10);
      } else {
        setAverageRating(null);
      }
    } catch (error) {
      console.error('리뷰 로딩 실패:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchReviews(); }, [shop.id]);

  const nextImage = () => {
    if (hasImages && shop) {
      setCurrentImageIndex((prev) => (prev + 1) % shop.images!.length);
    }
  };

  const prevImage = () => {
    if (hasImages && shop) {
      setCurrentImageIndex((prev) => (prev - 1 + shop.images!.length) % shop.images!.length);
    }
  };

  // 별점 렌더링 함수
  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const starSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    return (
      <div className='flex gap-0.5'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* 뒤로가기 버튼 */}
      {onBackToList && (
        <button
          onClick={onBackToList}
          className='absolute top-4 left-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 z-10 flex items-center gap-1'
          aria-label='리스트로 돌아가기'
        >
          <ArrowLeft className='w-5 h-5 text-gray-600' />
          <span className='text-sm font-medium text-gray-600 pr-1'>목록</span>
        </button>
      )}

      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className='absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 z-10'
        aria-label='닫기'
      >
        <X className='w-5 h-5 text-gray-600' />
      </button>

      {/* 이미지 갤러리 */}
      {hasImages && (
        <div className='relative w-full h-64 mb-4 rounded-lg overflow-hidden bg-gray-100 mt-12'>
          <Image
            loader={wsrvLoader}
            src={shop.images![currentImageIndex]}
            alt={`${shop.name} - ${currentImageIndex + 1}`}
            className='w-full h-full object-cover'
            sizes='100vw'
            width={500}
            height={500}
            priority
          />

          {shop.images!.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors'
              >
                <ChevronLeft className='w-6 h-6' />
              </button>

              <button
                onClick={nextImage}
                className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors'
              >
                <ChevronRight className='w-6 h-6' />
              </button>

              <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5'>
                {shop.images!.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <h2 className={`text-2xl font-bold mb-1 ${onBackToList ? 'mt-12' : 'mt-0'} pr-10`}>
        {shop.name}
      </h2>
      <p className='text-sm text-gray-500 mb-2'>{shop.address_full}</p>

      {/* 평균 평점 표시 */}
      {averageRating && (
        <div className='flex items-center gap-2 mb-4'>
          {renderStars(Math.round(averageRating), 'lg')}
          <span className='text-lg font-semibold text-gray-700'>{averageRating}</span>
          <span className='text-sm text-gray-500'>({reviews.length}개 리뷰)</span>
        </div>
      )}

      <div className='flex flex-wrap gap-2 mb-4'>
        {shop.categories?.map((cat, index) => (
          <span
            key={index}
            className='px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full'
          >
            #{cat}
          </span>
        ))}
      </div>

      <div className='space-y-3 text-sm text-gray-700 border-t pt-4'>
        {shop.phone && (
          <div className='flex items-center space-x-2'>
            <span className='font-semibold w-20'>전화번호</span>
            <a href={`tel:${shop.phone}`} className='text-blue-600 hover:underline'>
              {shop.phone}
            </a>
          </div>
        )}

        {shop.business_hours && (
          <div className='flex items-start space-x-2'>
            <span className='font-semibold w-20'>영업시간</span>
            <p className='flex-1 whitespace-pre-line'>{shop.business_hours}</p>
          </div>
        )}

        {shop.address_detail && (
          <div className='flex items-start space-x-2'>
            <span className='font-semibold w-20'>상세 주소</span>
            <p className='flex-1'>{shop.address_detail}</p>
          </div>
        )}

        {shop.homepage && (
          <div className='flex items-center space-x-2'>
            <span className='font-semibold w-20'>웹사이트</span>
            <div className='flex-1 flex flex-col gap-1'>
              {shop.homepage.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:underline truncate'
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 사용자 리뷰 목록 */}
      <div className='mt-8 border-t pt-6'>
        <h3 className='text-lg font-bold mb-4 flex items-center gap-2'>
          💬 방문 후기
          <span className='text-sm font-normal text-gray-500'>({reviews.length})</span>
        </h3>

        {loadingReviews ? (
          <div className='text-center py-8 text-gray-500'>리뷰를 불러오는 중...</div>
        ) : reviews.length === 0 ? (
          <div className='text-center py-8 bg-gray-50 rounded-lg'>
            <p className='text-gray-500 mb-2'>아직 작성된 리뷰가 없습니다.</p>
            <p className='text-sm text-gray-400'>첫 번째 리뷰를 남겨보세요!</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {reviews.map((review) => (
              <div key={review.id} className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
                      <User className='w-5 h-5 text-white' />
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-700'>
                        {review.user_email || '익명 사용자'}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {new Date(review.created_at).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  {renderStars(review.rating)}
                </div>
                {review.content && (
                  <p className='text-sm text-gray-700 whitespace-pre-line mt-2'>{review.content}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 리뷰 작성 폼 */}
      <ReviewForm shopId={shop.id} onReviewSubmitted={fetchReviews} />

      {/* 구글 애드센스 광고 (리뷰와 신고 사이) */}
      {/* <div className='my-8 py-6 border-t border-b border-gray-200 bg-gray-50/50 rounded-lg'>
        <GoogleAd slot='6852499093' />
      </div> */}

      {/* 신고 폼 */}
      <ReportForm shopId={shop.id} />

      <p className='mt-6 text-xs text-right text-gray-400'>
        최종 업데이트: {new Date(shop.last_updated).toLocaleDateString('ko-KR')}
      </p>
    </>
  );
}
