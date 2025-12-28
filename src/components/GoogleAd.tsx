'use client';

import React, { useEffect, useRef } from 'react';

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

export default function GoogleAd({
  slot,
  format = 'auto',
  responsive = 'true',
  className = '',
  style = { display: 'block' },
}: GoogleAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    // 이미 광고가 로드되었거나, ref가 없으면 실행하지 않음
    if (isAdPushed.current || !adRef.current) return;

    try {
      // ins 요소가 비어있는지 확인
      const insElement = adRef.current;
      if (insElement && insElement.innerHTML.trim() === '') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdPushed.current = true;
      }
    } catch (e) {
      console.error('AdSense load error:', e);
    }

    // cleanup 함수에서 ref 초기화
    return () => {
      isAdPushed.current = false;
    };
  }, []);

  if (!PUBLISHER_ID) {
    return (
      <div className='text-center py-4 bg-gray-100 text-sm text-gray-500'>광고 ID 설정 필요</div>
    );
  }

  return (
    <div className={`my-4 ${className}`} style={{ minHeight: '100px' }}>
      <ins
        ref={adRef}
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
