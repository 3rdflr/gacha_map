import ReviewForm from '@/components/ReviewForm';
import ReportForm from '@/components/ReportForm';
import { Shop } from '@/types/db';
import { X } from 'lucide-react';

interface BottomSheetProps {
  shop: Shop | null; // 선택된 가게 정보
  onClose: () => void; // 시트를 닫는 함수
}

export default function BottomSheet({ shop, onClose }: BottomSheetProps) {
  // shop이 null이면 시트를 렌더링하지 않습니다.
  const isOpen = !!shop;

  return (
    <div
      className={`
        fixed inset-0 z-50 transition-all duration-300 ease-in-out 
        ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
      `}
    >
      {/* 1. Backdrop (배경) - 클릭 시 시트 닫기 */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 
          ${isOpen ? 'opacity-50' : 'opacity-0'}
        `}
        onClick={onClose}
      />

      {/* 2. Bottom Sheet Panel */}
      <div
        className={`absolute bottom-0 w-full bg-white rounded-t-xl shadow-2xl transition-transform duration-300 p-4
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
          max-h-[90vh] overflow-y-auto
        `}
      >
        {shop && ( // shop 데이터가 있을 때만 내용 표시
          <>
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className='absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200'
              aria-label='닫기'
            >
              <X className='w-5 h-5 text-gray-600' />
            </button>

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
                  {shop.homepage.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:underline truncate max-w-[calc(100%-80px)]'
                    >
                      {link}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* 리뷰 작성 폼 */}
            <ReviewForm shopId={shop.id} />

            {/* 신고 폼 */}
            <ReportForm shopId={shop.id} />

            {/* 최종 업데이트 날짜 */}
            <p className='mt-6 text-xs text-right text-gray-400'>
              최종 업데이트: {new Date(shop.last_updated).toLocaleDateString('ko-KR')}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
