'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';

interface ShopStaticMapProps {
  latitude: number;
  longitude: number;
  name: string;
  address?: string;
}

/**
 * /shops/[id] 페이지 등 단일 매장 위치만 보여주는 정적 카카오맵.
 * - 카카오맵 SDK는 layout.tsx에서 autoload=false 로 로드되므로
 *   윈도우 객체가 준비되면 명시적으로 maps.load 를 호출.
 */
export default function ShopStaticMap({ latitude, longitude, name, address }: ShopStaticMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const tryLoad = () => {
      if (cancelled) return false;
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          if (!cancelled) setIsLoaded(true);
        });
        return true;
      }
      return false;
    };

    if (!tryLoad()) {
      intervalId = setInterval(() => {
        if (tryLoad() && intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, 100);
      timeoutId = setTimeout(() => {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        if (!cancelled) setIsLoaded(true);
      }, 5000);
    }

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (!isLoaded) {
    return (
      <div className='flex h-[320px] w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-100'>
        <div className='text-center'>
          <svg
            className='mx-auto mb-2 h-8 w-8 animate-spin text-blue-600'
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
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
          <p className='text-sm text-gray-500'>지도를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const kakaoUrl = `https://map.kakao.com/link/map/${encodeURIComponent(name)},${latitude},${longitude}`;

  return (
    <div className='space-y-2'>
      <div className='h-[320px] w-full overflow-hidden rounded-lg border border-gray-200'>
        <Map
          center={{ lat: latitude, lng: longitude }}
          style={{ width: '100%', height: '100%' }}
          level={3}
          draggable
          zoomable
        >
          <MapMarker position={{ lat: latitude, lng: longitude }} title={name} />
        </Map>
      </div>
      <div className='flex items-center justify-between text-xs text-gray-500'>
        <span className='truncate pr-2'>
          {address ?? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`}
        </span>
        <a
          href={kakaoUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='shrink-0 rounded-md border border-gray-200 bg-white px-2.5 py-1 font-medium text-gray-700 hover:bg-gray-50'
        >
          카카오맵에서 길찾기 →
        </a>
      </div>
    </div>
  );
}
