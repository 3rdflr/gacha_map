'use client';

import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Shop } from '@/types/db';
import { useState, useMemo } from 'react';
import BottomSheet from './BottomSheet';

interface MapProps {
  shops: Shop[];
}

// 필터링할 카테고리 목록 정의
const CATEGORIES = ['가챠', '쿠지', '굿즈'];

export default function KakaoMap({ shops }: MapProps) {
  // 초기 중심 좌표 (홍대 입구 근처)
  const [center, setCenter] = useState({ lat: 37.556, lng: 126.923 });

  // 위치 로딩 상태
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // 현재 선택된 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // ⭐️ 선택된 가게 상태 추가 (null이면 시트 닫힘)
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  // 현재 위치 상태 (위치를 찾았을 때만 표시)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  // 카테고리에 따라 마커 필터링 (useMemo로 성능 최적화)
  const filteredShops = useMemo(() => {
    if (selectedCategory === '전체') return shops;
    return shops.filter((shop) => shop.categories?.includes(selectedCategory));
  }, [shops, selectedCategory]);

  // 현재 위치로 이동하는 함수
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
        setCurrentLocation({ lat: latitude, lng: longitude }); // 현재 위치 저장
        setIsLoadingLocation(false);
        console.log('📍 현재 위치:', latitude, longitude);
      },
      (error) => {
        setIsLoadingLocation(false);
        console.error('위치 가져오기 실패:', error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('위치 접근 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.');
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
        enableHighAccuracy: true, // 높은 정확도
        timeout: 5000, // 5초 타임아웃
        maximumAge: 0, // 캐시 사용 안 함
      },
    );
  };

  // 바텀 시트 닫기 핸들러
  const handleCloseSheet = () => {
    setSelectedShop(null);
  };

  return (
    <div className='relative w-full h-[80vh] rounded-2xl'>
      {/* 카테고리 필터 (지도 위에 띄움) */}
      <div className='absolute top-4 left-0 right-0 z-10 px-4'>
        <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-md transition-colors
                ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600' // 선택됨
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50' // 선택 안됨
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
        className='absolute top-20 right-4 z-10 bg-white p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        title='내 위치로 이동'
      >
        {isLoadingLocation ? (
          // 로딩 스피너
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
          // 위치 아이콘
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

      {/* 카카오맵 */}
      <Map center={center} style={{ width: '100%', height: '100%' }} level={3}>
        {/* 일반 가게 마커들 - 깔끔한 원형 마커 */}
        {filteredShops.map((shop) => (
          <MapMarker
            key={shop.id}
            position={{ lat: shop.latitude, lng: shop.longitude }}
            title={shop.name}
            onClick={() => setSelectedShop(shop)}
          ></MapMarker>
        ))}

        {/* 현재 위치 마커 - 빨간색 펄스 효과 */}
        {currentLocation && (
          <CustomOverlayMap position={currentLocation} yAnchor={0.5}>
            {/* 컨테이너 자체를 중앙 정렬하기 위해 -translate-x-1/2 적용 */}
            <div className='relative flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-50'>
              {/* 1. 퍼지는 핑 효과 (Absolute로 배경에 깔기) */}
              <span className='absolute inline-flex h-8 w-8 rounded-full bg-red-400 opacity-75 animate-ping'></span>

              {/* 2. 중앙 고정 점 (Relative 또는 Absolute) */}
              <span className='relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-white shadow-lg'></span>
            </div>
          </CustomOverlayMap>
        )}
      </Map>

      {/* 결과 개수 표시 */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10'>
        <div className='bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg border border-gray-200'>
          <span className='text-sm font-medium text-gray-800'>
            {selectedCategory} <span className='text-blue-600'>{filteredShops.length}</span>개 발견
          </span>
        </div>
      </div>

      {/* 바텀 시트 렌더링 */}
      <BottomSheet shop={selectedShop} onClose={handleCloseSheet} />
    </div>
  );
}
