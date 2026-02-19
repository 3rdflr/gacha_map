'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { X, Camera, Save } from 'lucide-react';
import Image from 'next/image';
import { wsrvLoader } from '@/components/common/wsrvLoader';

interface UserProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ user, isOpen, onClose }: UserProfileModalProps) {
  const [nickname, setNickname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const loadProfile = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);

    const { data } = await supabase
      .from('profiles')
      .select('nickname, avatar_url')
      .eq('id', user.id)
      .single();

    if (data) {
      setNickname(data.nickname || '');
      setAvatarUrl(data.avatar_url || user.user_metadata.avatar_url || '');
    } else {
      // 프로필이 없으면 카카오 정보로 초기화
      setNickname(user.user_metadata.full_name || '');
      setAvatarUrl(user.user_metadata.avatar_url || '');
    }

    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (isOpen && user) {
      loadProfile();
    }
  }, [isOpen, user, loadProfile]);

  const handleSave = async () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    setIsSaving(true);

    // upsert: 있으면 업데이트, 없으면 생성
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      nickname: nickname.trim(),
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString(),
    });

    setIsSaving(false);

    if (error) {
      console.error('프로필 저장 실패:', error);
      alert('프로필 저장에 실패했습니다.');
    } else {
      alert('프로필이 저장되었습니다!');
      onClose();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    // 이미지 파일 체크
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setIsLoading(true);

    // Supabase Storage에 업로드
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('profiles').upload(filePath, file);

    if (uploadError) {
      console.error('업로드 실패:', uploadError);
      alert('이미지 업로드에 실패했습니다.');
      setIsLoading(false);
      return;
    }

    // Public URL 가져오기
    const { data } = supabase.storage.from('profiles').getPublicUrl(filePath);

    setAvatarUrl(data.publicUrl);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[60] flex items-center justify-center'>
      {/* 배경 오버레이 */}
      <div className='absolute inset-0 bg-black/50' onClick={onClose} />

      {/* 모달 */}
      <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6'>
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
          aria-label='닫기'
        >
          <X className='w-5 h-5 text-gray-600' />
        </button>

        {/* 제목 */}
        <h2 className='text-2xl font-bold mb-6'>프로필 수정</h2>

        {isLoading ? (
          <div className='flex justify-center items-center h-48'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
          </div>
        ) : (
          <div className='space-y-6'>
            {/* 프로필 이미지 */}
            <div className='flex flex-col items-center'>
              <div className='relative'>
                <div className='w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200'>
                  {avatarUrl ? (
                    <Image
                      loader={wsrvLoader}
                      src={avatarUrl}
                      alt='Profile'
                      width={96}
                      height={96}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                      <Camera className='w-8 h-8 text-gray-400' />
                    </div>
                  )}
                </div>

                {/* 카메라 버튼 */}
                <label
                  htmlFor='avatar-upload'
                  className='absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors shadow-lg'
                >
                  <Camera className='w-4 h-4' />
                  <input
                    id='avatar-upload'
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                  />
                </label>
              </div>
              <p className='text-xs text-gray-500 mt-2'>클릭하여 이미지 변경 (최대 5MB)</p>
            </div>

            {/* 닉네임 입력 */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>닉네임</label>
              <input
                type='text'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder='닉네임을 입력하세요'
                maxLength={20}
                className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <p className='text-xs text-gray-500 mt-1 text-right'>{nickname.length}/20</p>
            </div>

            {/* 계정 정보 */}
            <div className='bg-gray-50 rounded-lg p-4 space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>이메일</span>
                <span className='font-medium'>{user.email || '없음'}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>로그인 방식</span>
                <span className='font-medium'>카카오</span>
              </div>
            </div>

            {/* 저장 버튼 */}
            <button
              onClick={handleSave}
              disabled={isSaving || !nickname.trim()}
              className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2'
            >
              {isSaving ? (
                <>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                  저장 중...
                </>
              ) : (
                <>
                  <Save className='w-5 h-5' />
                  저장하기
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
