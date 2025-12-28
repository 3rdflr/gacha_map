import Image from 'next/image';
import { Shop } from '@/types/db';
import ReviewForm from '@/components/ReviewForm';
import ReportForm from '@/components/ReportForm';
import { ChevronLeft, ChevronRight, ArrowLeft, X } from 'lucide-react';
import { useState } from 'react';

interface ShopDetailViewProps {
  shop: Shop;
  onClose: () => void;
  onBackToList?: () => void;
}

export default function ShopDetailView({ shop, onClose, onBackToList }: ShopDetailViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasImages = shop?.images && Array.isArray(shop.images) && shop.images.length > 0;

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

  return (
    <>
      {/* 뒤로가기 버튼 (리스트에서 온 경우에만 표시) */}
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
      <p className='text-sm text-gray-500 mb-4'>{shop.address_full}</p>

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

      <ReviewForm shopId={shop.id} />
      <ReportForm shopId={shop.id} />

      <p className='mt-6 text-xs text-right text-gray-400'>
        최종 업데이트: {new Date(shop.last_updated).toLocaleDateString('ko-KR')}
      </p>
    </>
  );
}
