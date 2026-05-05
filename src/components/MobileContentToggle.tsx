'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface MobileContentToggleProps {
  children: ReactNode;
}

/**
 * 모바일/태블릿(<lg)에서 SSR 본문을 기본 접힘 상태로 보여주고,
 * 토글 버튼으로 펼칠 수 있게 하는 래퍼.
 *
 * - SEO/AdSense 크롤러는 DOM 자체를 읽으므로 children은 항상 마운트
 * - 모바일에서는 max-height + overflow-hidden 으로 시각적으로만 숨김
 * - lg 이상에서는 토글 버튼 자체를 숨기고 본문 항상 노출(기존 데스크탑 레이아웃 유지)
 */
export default function MobileContentToggle({ children }: MobileContentToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='lg:flex-1 lg:min-h-0 lg:overflow-y-auto'>
      {/* 토글 버튼 — 모바일/태블릿 전용 */}
      <div className='lg:hidden border-y border-gray-200 bg-white'>
        <button
          type='button'
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls='home-ssr-content'
          className='flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100'
        >
          {isOpen ? '매장 정보 · 가이드 접기' : '매장 정보 · 가이드 더 보기'}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/*
        children 컨테이너
        - 모바일: 펼침 여부에 따라 max-h 토글 (display:none 안 써서 크롤링 안전)
        - lg: max-h-none 으로 항상 펼쳐짐
      */}
      <div
        id='home-ssr-content'
        aria-hidden={!isOpen ? true : undefined}
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out lg:!max-h-none lg:!overflow-visible ${
          isOpen ? 'max-h-[20000px]' : 'max-h-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
