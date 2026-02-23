'use client';

import { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { LogOut, User as UserIcon, Settings, X, Map, Newspaper } from 'lucide-react';
import UserProfileModal from './UserProfileModal';
import { useAuthStore } from '@/store/useAuthStore';

export default function Header() {
  const { user, profile, isLoading, logout, loadProfile } = useAuthStore();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const displayName = profile?.nickname || user?.user_metadata.full_name || '사용자';
  const displayAvatar = profile?.avatar_url || user?.user_metadata.avatar_url;

  return (
    <>
      <header className='sticky top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between pointer-events-none bg-white shadow-md'>
        {/* 로고 영역 — 클릭 시 사이드바 */}
        <div className='pointer-events-auto flex items-center gap-1'>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className='flex items-center gap-1 rounded-lg hover:bg-gray-100 transition-colors p-1'
            aria-label='메뉴 열기'
          >
            <Image src='/logo.png' alt='가챠맵 로고' width={40} height={40} />
            <span className='text-sm sm:text-lg font-medium text-neutral-900 px-1'>
              전국 가챠 지도
            </span>
          </button>
        </div>

        {/* 우측 로그인/유저 영역 */}
        <div className='pointer-events-auto flex items-center gap-2'>
          {isLoading ? (
            <div className='w-20 h-9 bg-gray-200 rounded-full animate-pulse' />
          ) : user ? (
            <div className='flex items-center gap-2 bg-white/90 backdrop-blur-sm p-1 pr-3 rounded-full shadow-md border border-gray-200'>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className='relative group'
                title='프로필 수정'
              >
                {displayAvatar ? (
                  <Image
                    src={displayAvatar}
                    alt='Profile'
                    width={32}
                    height={32}
                    className='w-8 h-8 rounded-full border border-gray-200 group-hover:opacity-80 transition-opacity'
                  />
                ) : (
                  <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors'>
                    <UserIcon size={16} />
                  </div>
                )}
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                  <Settings size={14} className='text-blue-600' />
                </div>
              </button>

              <span className='text-sm font-semibold text-gray-700 hidden sm:block'>
                {displayName}님
              </span>

              <button
                onClick={logout}
                className='ml-2 p-1.5 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full transition-colors'
                title='로그아웃'
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className='bg-[#FEE500] hover:bg-[#FDD835] text-black text-sm font-bold px-4 py-2 rounded-full shadow-md transition-transform active:scale-95 flex items-center gap-2'
            >
              카카오 로그인
            </button>
          )}
        </div>
      </header>

      {/* 사이드바 오버레이 */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 z-50 bg-black/40'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* 사이드바 헤더 */}
        <div className='flex items-center justify-between px-5 py-4 border-b'>
          <div className='flex items-center gap-2'>
            <Image src='/logo.png' alt='가챠맵 로고' width={32} height={32} />
            <span className='font-bold text-gray-900'>가챠 지도</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className='p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500'
          >
            <X size={20} />
          </button>
        </div>

        {/* 메뉴 */}
        <nav className='flex-1 px-3 py-4 space-y-1'>
          <Link
            href='/'
            onClick={() => setIsSidebarOpen(false)}
            className='flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-medium'
          >
            <Map size={20} className='text-blue-500' />
            가챠 지도
          </Link>
          <Link
            href='/gacha-board'
            onClick={() => setIsSidebarOpen(false)}
            className='flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-medium'
          >
            <Newspaper size={20} className='text-blue-500' />
            신규 가챠·쿠지 정보
          </Link>
        </nav>

        {/* 하단 버전 */}
        <div className='px-5 py-4 border-t text-xs text-gray-400'>
          전국 가챠 지도 1.01v
        </div>
      </aside>

      {/* 프로필 수정 모달 */}
      {user && (
        <UserProfileModal
          user={user}
          isOpen={isProfileModalOpen}
          onClose={() => {
            setIsProfileModalOpen(false);
            if (user) loadProfile(user.id);
          }}
        />
      )}
    </>
  );
}
