'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Notice() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hideNotice = localStorage.getItem('hideNotice');
    const today = new Date().toDateString();

    if (hideNotice !== today) {
      setIsOpen(true);
    }
  }, []);

  const closePopup = (neverShowToday: boolean) => {
    if (neverShowToday) {
      const today = new Date().toDateString();
      localStorage.setItem('hideNotice', today);
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    // 전체 화면 오버레이 (배경 어둡게 + 블러 효과)
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
      {/* 팝업 컨테이너 */}
      <div className='relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-300'>
        {/* 상단 장식 바 (선택사항) */}
        <div className='h-2 bg-blue-500 w-full' />

        <div className='p-8 text-center'>
          {/* 아이콘/이모지 영역 */}
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50'>
            <span className='text-3xl'>📢</span>
          </div>

          <h2 className='mb-2 text-2xl font-bold text-gray-800'>알려드립니다</h2>

          <div className='space-y-3 text-gray-600'>
            <p className='leading-relaxed'>
              본 페이지는 더 나은 서비스를 위해 <br />
              <span className='font-semibold text-blue-600 text-lg underline decoration-blue-200 underline-offset-4'>
                지속적으로 업데이트
              </span>{' '}
              중입니다.
            </p>
            <p className='text-sm'>
              별도의 외부 유료 광고 협찬 없이 운영되오니, <br />
              새로운 정보가 있다면 언제든 제보 부탁드립니다!
            </p>
            <div className='mt-2 pt-2 border-t border-gray-100'>
              <Link
                href='/gacha-board'
                onClick={() => setIsOpen(false)}
                className='inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors'
              >
                🎰 신규 가챠 &amp; 이치방쿠지 정보 보러가기 →
              </Link>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className='mt-8 flex flex-col gap-3'>
            <button
              onClick={() => closePopup(false)}
              className='w-full rounded-xl bg-gray-900 py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]'
            >
              확인했습니다
            </button>
            <button
              onClick={() => closePopup(true)}
              className='text-sm text-gray-400 underline decoration-gray-300 underline-offset-4 hover:text-gray-600'
            >
              오늘 하루 보지 않기
            </button>
          </div>
        </div>

        {/* 우측 상단 닫기 X 버튼 (선택사항) */}
        <button
          onClick={() => closePopup(false)}
          className='absolute right-4 top-6 text-gray-400 hover:text-gray-600'
        >
          <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
