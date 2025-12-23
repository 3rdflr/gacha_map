'use client';

import { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { LogOut, User as UserIcon, Settings } from 'lucide-react';
import UserProfileModal from './UserProfileModal';
import { useAuthStore } from '@/store/useAuthStore';

export default function Header() {
  const { user, profile, isLoading, logout, loadProfile } = useAuthStore();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // 카카오 로그인 핸들러
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  // 표시할 닉네임 결정
  const displayName = profile?.nickname || user?.user_metadata.full_name || '사용자';

  // 표시할 아바타 URL 결정
  const displayAvatar = profile?.avatar_url || user?.user_metadata.avatar_url;

  return (
    <>
      <header className='sticky top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between pointer-events-none bg-white shadow-md'>
        {/* 로고 영역 */}
        <div className='pointer-events-auto flex items-center justify-center'>
          <Image src={'/logo.png'} alt='가챠맵 로고' width={50} height={50} />
          <Link href='/' className='text-xl text-neutral-900 px-3 py-1'>
            전국 가챠 지도 1.0v
          </Link>
        </div>

        {/* 우측 로그인/유저 정보 영역 */}
        <div className='pointer-events-auto flex items-center gap-2'>
          {isLoading ? (
            // 로딩 스켈레톤
            <div className='w-20 h-9 bg-gray-200 rounded-full animate-pulse' />
          ) : user ? (
            // 로그인 상태일 때
            <div className='flex items-center gap-2 bg-white/90 backdrop-blur-sm p-1 pr-3 rounded-full shadow-md border border-gray-200'>
              {/* 프로필 이미지 (클릭 시 수정 모달) */}
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
                {/* 호버 시 설정 아이콘 표시 */}
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
            // 비로그인 상태일 때
            <button
              onClick={handleLogin}
              className='bg-[#FEE500] hover:bg-[#FDD835] text-black text-sm font-bold px-4 py-2 rounded-full shadow-md transition-transform active:scale-95 flex items-center gap-2'
            >
              <span className='hidden xs:inline'>카카오 로그인</span>
            </button>
          )}
        </div>
      </header>

      {/* 프로필 수정 모달 */}
      {user && (
        <UserProfileModal
          user={user}
          isOpen={isProfileModalOpen}
          onClose={() => {
            setIsProfileModalOpen(false);
            // 모달 닫을 때 프로필 데이터 새로고침
            if (user) loadProfile(user.id);
          }}
        />
      )}
    </>
  );
}
