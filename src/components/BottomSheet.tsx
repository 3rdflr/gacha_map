import ReviewForm from '@/components/ReviewForm';
import ReportForm from '@/components/ReportForm';
import Image from 'next/image';
import { Shop } from '@/types/db';
import GoogleAd, { loadAds } from '@/components/GoogleAd';
import { X, ChevronLeft, ChevronRight, ArrowLeft, MapPin } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

interface BottomSheetProps {
  mode: 'detail' | 'list';
  shop: Shop | null;
  shops: Shop[];
  onClose: () => void;
  onShopSelect?: (shop: Shop) => void;
  onBackToList?: () => void; // ⭐️ 리스트로 돌아가기 콜백
}

export default function BottomSheet({
  mode,
  shop,
  shops,
  onClose,
  onShopSelect,
  onBackToList,
}: BottomSheetProps) {
  const isOpen = mode === 'detail' ? !!shop : shops.length > 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 이미지가 있는지 확인
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

  // 리스트에서 가게 선택
  const handleShopClick = (selectedShop: Shop) => {
    if (onShopSelect) {
      onShopSelect(selectedShop);
    }
  };

  // ⭐️ 광고가 삽입된 리스트를 useMemo로 메모이제이션
  const itemsWithAds = useMemo(() => {
    if (mode !== 'list') return [];

    const result: (Shop | 'ad')[] = [];
    shops.forEach((shop, index) => {
      result.push(shop);
      // 10개마다 광고 삽입
      if ((index + 1) % 10 === 0 && index !== shops.length - 1) {
        result.push('ad');
      }
    });
    return result;
  }, [mode, shops]); // shops 배열이 변경될 때만 재계산

  // 광고 로드
  useEffect(() => {
    if (mode === 'list' && isOpen) {
      // 약간의 딜레이를 주어 DOM이 렌더링된 후 광고 로드
      const timer = setTimeout(() => {
        loadAds();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [mode, isOpen]);

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
        {/* 리스트 모드 */}
        {mode === 'list' && (
          <>
            <button
              onClick={handleClose}
              className='absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 z-10'
              aria-label='닫기'
            >
              <X className='w-5 h-5 text-gray-600' />
            </button>

            <h2 className='text-2xl font-bold mb-4 pr-10'>매장 목록</h2>
            <p className='text-sm text-gray-500 mb-4'>총 {shops.length}개의 매장</p>

            <div className='space-y-3'>
              {itemsWithAds.map((item, index) => {
                // 광고 블록
                if (item === 'ad') {
                  return (
                    <div
                      key={`ad-${index}`}
                      className='bg-gray-50 border border-gray-200 rounded-lg p-4 text-center'
                    >
                      <GoogleAd slot='6852499093' />
                    </div>
                  );
                }

                // 가게 리스트 아이템
                const shopItem = item as Shop;
                return (
                  <button
                    key={shopItem.id}
                    onClick={() => handleShopClick(shopItem)}
                    className='w-full bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all text-left'
                  >
                    <div className='flex items-start gap-3'>
                      {/* 썸네일 이미지 */}
                      {shopItem.images && shopItem.images.length > 0 ? (
                        <Image
                          src={shopItem.images[0]}
                          alt={shopItem.name}
                          className='w-20 h-20 rounded-lg object-cover flex-shrink-0'
                          sizes='100vw'
                          width={200}
                          height={200}
                          priority
                        />
                      ) : (
                        <div className='w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0'>
                          <MapPin className='w-8 h-8 text-gray-400' />
                        </div>
                      )}

                      {/* 가게 정보 */}
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-bold text-lg mb-1 truncate'>{shopItem.name}</h3>
                        <p className='text-sm text-gray-600 mb-2 truncate'>
                          {shopItem.address_full}
                        </p>

                        {/* 카테고리 태그 */}
                        <div className='flex flex-wrap gap-1'>
                          {shopItem.categories?.slice(0, 3).map((cat, idx) => (
                            <span
                              key={idx}
                              className='px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full'
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* 상세 모드 */}
        {mode === 'detail' && shop && (
          <>
            {/* ⭐️ 뒤로가기 버튼 (리스트에서 온 경우에만 표시) */}
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
              onClick={handleClose}
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
                            index === currentImageIndex
                              ? 'bg-white w-6'
                              : 'bg-white/50 hover:bg-white/80'
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
        )}
      </div>
    </div>
  );
}
