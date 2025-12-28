'use client';

import React, { useEffect } from 'react';

// window 객체에 adsbygoogle이 있음을 알리는 타입 선언
declare global {
  interface Window {
    adsbygoogle: unknown[] | undefined;
  }
}

interface GoogleAdProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: 'true' | 'false';
  className?: string;
  style?: React.CSSProperties;
}

const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export function loadAds() {
  if (typeof window !== 'undefined') {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense 로드 실패:', err);
    }
  }
}

export default function GoogleAd({
  slot,
  format = 'auto',
  responsive = 'true',
  className = '',
  style = { display: 'block' },
}: GoogleAdProps) {
  useEffect(() => {
    // 광고 스크립트가 로드되었는지 확인하고 광고를 로드
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error('AdSense load error:', e);
    }
  }, []); // 컴포넌트 마운트 시 한 번 실행

  if (!PUBLISHER_ID) {
    // 개발 환경 등에서 ID가 없는 경우 광고 표시 안 함
    return (
      <div className='text-center py-4 bg-gray-100 text-sm text-gray-500'>광고 ID 설정 필요</div>
    );
  }

  return (
    <div className={`my-4 ${className}`} style={{ minHeight: '100px' }}>
      <ins
        className='adsbygoogle'
        style={style}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
