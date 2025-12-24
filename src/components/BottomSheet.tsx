import ReviewForm from '@/components/ReviewForm';
import ReportForm from '@/components/ReportForm';
import { Shop } from '@/types/db';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface BottomSheetProps {
  shop: Shop | null;
  onClose: () => void;
}

export default function BottomSheet({ shop, onClose }: BottomSheetProps) {
  const isOpen = !!shop;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 이미지가 있는지 확인 (null, undefined, 빈 배열 모두 체크)
  const hasImages = shop?.images && Array.isArray(shop.images) && shop.images.length > 0;

  // 다음 이미지로 이동
  const nextImage = () => {
    if (hasImages && shop) {
      setCurrentImageIndex((prev) => (prev + 1) % shop.images!.length);
    }
  };

  // 이전 이미지로 이동
  const prevImage = () => {
    if (hasImages && shop) {
      setCurrentImageIndex((prev) => (prev - 1 + shop.images!.length) % shop.images!.length);
    }
  };

  // 시트가 닫힐 때 이미지 인덱스 초기화
  const handleClose = () => {
    setCurrentImageIndex(0);
    onClose();
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 transition-all duration-300 ease-in-out 
        ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
      `}
    >
      {/* 배경 오버레이 */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 
          ${isOpen ? 'opacity-50' : 'opacity-0'}
        `}
        onClick={handleClose}
      />

      {/* Bottom Sheet Panel */}
      <div
        className={`absolute bottom-0 w-full bg-white rounded-t-xl shadow-2xl transition-transform duration-300 p-4
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
          max-h-[90vh] overflow-y-auto
        `}
      >
        {shop && (
          <>
            {/* 닫기 버튼 */}
            <button
              onClick={handleClose}
              className='absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 z-10'
              aria-label='닫기'
            >
              <X className='w-5 h-5 text-gray-600' />
            </button>

            {/* 이미지 갤러리 (이미지가 있을 때만 표시) */}
            {hasImages && (
              <div className='relative w-full h-64 mb-4 rounded-lg overflow-hidden bg-gray-100'>
                <Image
                  src={shop.images![currentImageIndex]}
                  alt={`${shop.name} - ${currentImageIndex + 1}`}
                  fill
                  className='object-cover'
                  sizes='100vw'
                />

                {/* 이미지가 2개 이상일 때만 네비게이션 버튼 표시 */}
                {shop.images!.length > 1 && (
                  <>
                    {/* 이전 버튼 */}
                    <button
                      onClick={prevImage}
                      className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors'
                      aria-label='이전 이미지'
                    >
                      <ChevronLeft className='w-6 h-6' />
                    </button>

                    {/* 다음 버튼 */}
                    <button
                      onClick={nextImage}
                      className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors'
                      aria-label='다음 이미지'
                    >
                      <ChevronRight className='w-6 h-6' />
                    </button>

                    {/* 이미지 인디케이터 */}
                    <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5'>
                      {shop.images!.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-6'
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                          aria-label={`이미지 ${index + 1}로 이동`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* 가게 이름 및 기본 정보 */}
            <h2 className='text-2xl font-bold mb-1 pr-10'>{shop.name}</h2>
            <p className='text-sm text-gray-500 mb-4'>{shop.address_full}</p>

            {/* 카테고리 태그 */}
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
              {/* 전화번호 */}
              {shop.phone && (
                <div className='flex items-center space-x-2'>
                  <span className='font-semibold w-20'>전화번호</span>
                  <a href={`tel:${shop.phone}`} className='text-blue-600 hover:underline'>
                    {shop.phone}
                  </a>
                </div>
              )}

              {/* 영업시간 */}
              {shop.business_hours && (
                <div className='flex items-start space-x-2'>
                  <span className='font-semibold w-20'>영업시간</span>
                  <p className='flex-1 whitespace-pre-line'>{shop.business_hours}</p>
                </div>
              )}

              {/* 상세 주소 */}
              {shop.address_detail && (
                <div className='flex items-start space-x-2'>
                  <span className='font-semibold w-20'>상세 주소</span>
                  <p className='flex-1'>{shop.address_detail}</p>
                </div>
              )}

              {/* 웹사이트/SNS */}
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

            {/* 리뷰 작성 폼 (로그인 시에만 표시) */}
            <ReviewForm shopId={shop.id} />

            {/* 신고 폼 */}
            <ReportForm shopId={shop.id} />

            <p className='mt-6 text-xs text-right text-gray-400'>
              최종 업데이트: {new Date(shop.last_updated).toLocaleDateString('ko-KR')}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
