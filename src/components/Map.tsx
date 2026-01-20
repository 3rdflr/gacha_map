'use client';

import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Shop } from '@/types/db';
import { useState, useMemo, useEffect } from 'react';
import BottomSheet from './BottomSheet';
import ShopSuggestionModal from './ShopSuggestionModal';
import { Plus } from 'lucide-react';

interface MapProps {
  shops: Shop[];
}

const CATEGORIES = ['가챠', '쿠지', '굿즈'];

export default function KakaoMap({ shops }: MapProps) {
  const [center, setCenter] = useState({ lat: 37.556, lng: 126.923 });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [sheetMode, setSheetMode] = useState<'detail' | 'list'>('detail');
  const [isFromList, setIsFromList] = useState(false);
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // 카카오맵 스크립트 로드 - 더 안정적인 방법
  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        // 이미 로드된 경우
        window.kakao.maps.load(() => {
          console.log('카카오맵 로드 완료');
          setIsMapLoaded(true);
        });
      } else {
        // 로드되지 않은 경우 재시도
        const checkInterval = setInterval(() => {
          if (window.kakao && window.kakao.maps) {
            clearInterval(checkInterval);
            window.kakao.maps.load(() => {
              console.log('카카오맵 로드 완료 (재시도)');
              setIsMapLoaded(true);
            });
          }
        }, 100);

        // 5초 후에도 로드 안되면 정리
        setTimeout(() => {
          clearInterval(checkInterval);
          if (!window.kakao || !window.kakao.maps) {
            console.error('카카오맵 로드 실패');
            // 그래도 시도해보기
            setIsMapLoaded(true);
          }
        }, 5000);
      }
    };

    // 약간의 딜레이 후 실행
    const timer = setTimeout(loadKakaoMap, 100);

    return () => clearTimeout(timer);
  }, []);

  // 카테고리 필터링
  const filteredShops = useMemo(() => {
    if (selectedCategory === '전체') return shops;
    return shops.filter((shop) => shop.categories?.includes(selectedCategory));
  }, [shops, selectedCategory]);

  // 현재 위치로 이동
  const handleMoveToCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
        setCurrentLocation({ lat: latitude, lng: longitude });
        setIsLoadingLocation(false);
      },
      (error) => {
        setIsLoadingLocation(false);
        console.error('위치 가져오기 실패:', error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('위치 접근 권한이 거부되었습니다.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('위치 정보를 사용할 수 없습니다.');
            break;
          case error.TIMEOUT:
            alert('위치 요청 시간이 초과되었습니다.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  // 마커 클릭 (상세보기 모드)
  const handleMarkerClick = (shop: Shop) => {
    setSelectedShop(shop);
    setSheetMode('detail');
    setIsFromList(false);
  };

  // 리스트 버튼 클릭
  const handleListClick = () => {
    setSheetMode('list');
    setSelectedShop(null);
    setIsFromList(false);
  };

  // 바텀시트 닫기
  const handleCloseSheet = () => {
    setSelectedShop(null);
    setSheetMode('detail');
    setIsFromList(false);
  };

  // 리스트에서 가게 선택 (상세보기로 전환)
  const handleShopSelectFromList = (shop: Shop) => {
    setSelectedShop(shop);
    setSheetMode('detail');
    setIsFromList(true);
    setCenter({ lat: shop.latitude, lng: shop.longitude });
  };

  // 리스트로 돌아가기
  const handleBackToList = () => {
    setSelectedShop(null);
    setSheetMode('list');
    setIsFromList(false);
  };

  // 새 가게 추천 버튼
  const handleSuggestShop = () => {
    setIsSuggestionModalOpen(true);
  };

  // 맵이 로드되지 않았으면 로딩 표시
  if (!isMapLoaded) {
    return (
      <div className='relative w-full h-[80vh] rounded-2xl flex items-center justify-center bg-gray-100'>
        <div className='text-center'>
          <svg
            className='animate-spin h-12 w-12 text-blue-600 mx-auto mb-4'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          <p className='text-gray-600 font-medium'>지도를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='relative w-full h-[80vh] rounded-2xl mb-10'>
      {/* 카테고리 필터 */}
      <div className='absolute top-4 left-0 right-0 z-10 px-4'>
        <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
          <button
            onClick={() => setSelectedCategory('전체')}
            className={`
              px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-md transition-colors
              ${
                selectedCategory === '전체'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }
            `}
          >
            전체
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-md transition-colors
                ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 현재 위치 버튼 */}
      <button
        onClick={handleMoveToCurrentLocation}
        disabled={isLoadingLocation}
        className='absolute top-20 right-4 z-10 bg-white p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50'
        title='내 위치로 이동'
      >
        {isLoadingLocation ? (
          <svg
            className='animate-spin h-6 w-6 text-blue-600'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-blue-600'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
        )}
      </button>

      {/* 새 가게 추천 버튼 */}
      <button
        onClick={handleSuggestShop}
        className='absolute top-36 right-4 z-10 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors'
        title='새 가게 추천하기'
      >
        <Plus className='w-6 h-6' />
      </button>

      {/* 카카오맵 */}
      <Map center={center} style={{ width: '100%', height: '100%' }} level={3}>
        {filteredShops.map((shop) => (
          <MapMarker
            key={shop.id}
            position={{ lat: shop.latitude, lng: shop.longitude }}
            title={shop.name}
            onClick={() => handleMarkerClick(shop)}
          />
        ))}

        {currentLocation && (
          <CustomOverlayMap position={currentLocation} yAnchor={0.5}>
            <div className='relative flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-50'>
              <span className='absolute inline-flex h-8 w-8 rounded-full bg-red-400 opacity-75 animate-ping'></span>
              <span className='relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-white shadow-lg'></span>
            </div>
          </CustomOverlayMap>
        )}
      </Map>

      {/* 결과 개수 표시 (클릭 시 리스트 표시) */}
      <button
        onClick={handleListClick}
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg border border-gray-200 hover:bg-white hover:shadow-xl transition-all'
      >
        <span className='text-sm font-medium text-gray-800'>
          {selectedCategory} <span className='text-blue-600'>{filteredShops.length}</span>개 발견 →
        </span>
      </button>

      {/* 바텀 시트 */}
      <BottomSheet
        mode={sheetMode}
        shop={selectedShop}
        shops={filteredShops}
        onClose={handleCloseSheet}
        onShopSelect={handleShopSelectFromList}
        onBackToList={isFromList ? handleBackToList : undefined}
      />

      {/* 새 가게 추천 모달 */}
      {isSuggestionModalOpen && (
        <ShopSuggestionModal
          isOpen={isSuggestionModalOpen}
          onClose={() => setIsSuggestionModalOpen(false)}
        />
      )}
    </div>
  );
}
