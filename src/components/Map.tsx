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

interface Cluster {
  id: string;
  lat: number;
  lng: number;
  shops: Shop[];
}

const CATEGORIES = ['가챠', '쿠지', '굿즈'];
const CLUSTER_RADIUS = 60; // 클러스터링 반경 (픽셀)
const CLUSTER_MIN_LEVEL = 5; // 이 레벨 이상에서 클러스터링 활성화

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
  const [mapLevel, setMapLevel] = useState(3);
  const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null);

  // 카카오맵 스크립트 로드
  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          setIsMapLoaded(true);
        });
      } else {
        const checkInterval = setInterval(() => {
          if (window.kakao && window.kakao.maps) {
            clearInterval(checkInterval);
            window.kakao.maps.load(() => {
              setIsMapLoaded(true);
            });
          }
        }, 100);

        setTimeout(() => {
          clearInterval(checkInterval);
          if (!window.kakao || !window.kakao.maps) {
            console.error('카카오맵 로드 실패');
            setIsMapLoaded(true);
          }
        }, 5000);
      }
    };

    const timer = setTimeout(loadKakaoMap, 100);
    return () => clearTimeout(timer);
  }, []);

  // 카테고리 필터링
  const filteredShops = useMemo(() => {
    if (selectedCategory === '전체') return shops;
    return shops.filter((shop) => shop.categories?.includes(selectedCategory));
  }, [shops, selectedCategory]);

  // 마커 클러스터링 로직
  const clusteredData = useMemo(() => {
    // 줌 레벨이 낮으면 (확대되어 있으면) 클러스터링 안함
    if (mapLevel < CLUSTER_MIN_LEVEL || !mapInstance) {
      return { clusters: [], markers: filteredShops };
    }

    const clusters: Cluster[] = [];
    const processed = new Set<number>();

    filteredShops.forEach((shop, index) => {
      if (processed.has(index)) return;

      // 현재 가게의 화면 좌표 계산
      const projection = mapInstance.getProjection();
      const point1 = projection.pointFromCoords(
        new window.kakao.maps.LatLng(shop.latitude, shop.longitude),
      );

      // 근처 가게들 찾기
      const nearbyShops = [shop];
      processed.add(index);

      filteredShops.forEach((otherShop, otherIndex) => {
        if (processed.has(otherIndex) || index === otherIndex) return;

        const point2 = projection.pointFromCoords(
          new window.kakao.maps.LatLng(otherShop.latitude, otherShop.longitude),
        );

        // 픽셀 거리 계산
        const distance = Math.sqrt(
          Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2),
        );

        if (distance < CLUSTER_RADIUS) {
          nearbyShops.push(otherShop);
          processed.add(otherIndex);
        }
      });

      // 2개 이상이면 클러스터로
      if (nearbyShops.length > 1) {
        const avgLat = nearbyShops.reduce((sum, s) => sum + s.latitude, 0) / nearbyShops.length;
        const avgLng = nearbyShops.reduce((sum, s) => sum + s.longitude, 0) / nearbyShops.length;

        clusters.push({
          id: `cluster-${index}`,
          lat: avgLat,
          lng: avgLng,
          shops: nearbyShops,
        });
      }
    });

    // 클러스터되지 않은 개별 마커들
    const markers = filteredShops.filter((_, index) => !processed.has(index));

    return { clusters, markers };
  }, [filteredShops, mapLevel, mapInstance]);

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

  // 클러스터 클릭 (확대 또는 리스트 표시)
  const handleClusterClick = (cluster: Cluster) => {
    if (mapLevel <= 6) {
      // 충분히 확대되었으면 해당 가게들 리스트 표시
      setSheetMode('list');
      setSelectedShop(null);
      setIsFromList(false);
    } else {
      // 더 확대
      setCenter({ lat: cluster.lat, lng: cluster.lng });
      if (mapInstance) {
        mapInstance.setLevel(mapLevel - 2);
      }
    }
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

  // 리스트에서 가게 선택
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

  // 새 가게 추천
  const handleSuggestShop = () => {
    setIsSuggestionModalOpen(true);
  };

  return (
    <div className='relative w-full h-full'>
      {/* 지도 로딩 오버레이 — 컨테이너 크기는 항상 유지해 CLS 방지 */}
      {!isMapLoaded && (
        <div className='absolute inset-0 z-20 rounded-2xl flex items-center justify-center bg-gray-100'>
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
      )}
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
      <Map
        center={center}
        style={{ width: '100%', height: '100%' }}
        level={3}
        onCreate={(map) => setMapInstance(map)}
        onZoomChanged={(map) => setMapLevel(map.getLevel())}
      >
        {/* 개별 마커 */}
        {clusteredData.markers.map((shop) => (
          <MapMarker
            key={shop.id}
            position={{ lat: shop.latitude, lng: shop.longitude }}
            title={shop.name}
            onClick={() => handleMarkerClick(shop)}
          />
        ))}

        {/* 클러스터 마커 */}
        {clusteredData.clusters.map((cluster) => (
          <CustomOverlayMap
            key={cluster.id}
            position={{ lat: cluster.lat, lng: cluster.lng }}
            yAnchor={0.5}
          >
            <div
              onClick={() => handleClusterClick(cluster)}
              className='transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform'
            >
              <div className='relative'>
                {/* 클러스터 배경 */}
                <div className='absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-30 animate-pulse'></div>

                {/* 클러스터 원 */}
                <div
                  className='relative bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full shadow-lg border-3 border-white flex items-center justify-center font-bold'
                  style={{
                    width: Math.min(60, 40 + Math.log(cluster.shops.length) * 8) + 'px',
                    height: Math.min(60, 40 + Math.log(cluster.shops.length) * 8) + 'px',
                    fontSize: cluster.shops.length > 99 ? '14px' : '16px',
                  }}
                >
                  {cluster.shops.length}
                </div>
              </div>
            </div>
          </CustomOverlayMap>
        ))}

        {/* 현재 위치 마커 */}
        {currentLocation && (
          <CustomOverlayMap position={currentLocation} yAnchor={0.5}>
            <div className='relative flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-50'>
              <span className='absolute inline-flex h-8 w-8 rounded-full bg-red-400 opacity-75 animate-ping'></span>
              <span className='relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-white shadow-lg'></span>
            </div>
          </CustomOverlayMap>
        )}
      </Map>

      {/* 결과 개수 표시 */}
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
