'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { X, Camera, Save, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { wsrvLoader } from '@/components/common/wsrvLoader';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

interface UserProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ user, isOpen, onClose }: UserProfileModalProps) {
  const router = useRouter();
  const { deleteAccount } = useAuthStore();
  const [nickname, setNickname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // 탈퇴 확인 단계: false → 확인창 표시 → true → 처리 중
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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
      setNickname(user.user_metadata.full_name || '');
      setAvatarUrl(user.user_metadata.avatar_url || '');
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (isOpen && user) {
      loadProfile();
      setShowDeleteConfirm(false);
      setDeleteConfirmInput('');
    }
  }, [isOpen, user, loadProfile]);

  const handleSave = async () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    setIsSaving(true);
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      nickname: nickname.trim(),
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString(),
    });
    setIsSaving(false);
    if (error) {
      alert('프로필 저장에 실패했습니다.');
    } else {
      alert('프로필이 저장되었습니다!');
      onClose();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
    setIsLoading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    const { error: uploadError } = await supabase.storage.from('profiles').upload(filePath, file);
    if (uploadError) {
      alert('이미지 업로드에 실패했습니다.');
      setIsLoading(false);
      return;
    }
    const { data } = supabase.storage.from('profiles').getPublicUrl(filePath);
    setAvatarUrl(data.publicUrl);
    setIsLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmInput !== '탈퇴') return;
    setIsDeleting(true);
    try {
      await deleteAccount();
      alert('회원 탈퇴가 완료됐습니다.');
      onClose();
      router.push('/');
    } catch {
      alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[60] flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/50' onClick={onClose} />

      <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
          aria-label='닫기'
        >
          <X className='w-5 h-5 text-gray-600' />
        </button>

        <h2 className='text-2xl font-bold mb-6'>프로필 수정</h2>

        {isLoading ? (
          <div className='flex justify-center items-center h-48'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600' />
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

            {/* 닉네임 */}
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
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white' />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className='w-5 h-5' />
                  저장하기
                </>
              )}
            </button>

            {/* 회원 탈퇴 */}
            <div className='border-t border-gray-100 pt-4'>
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className='flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition-colors'
                >
                  <Trash2 size={14} />
                  회원 탈퇴
                </button>
              ) : (
                <div className='bg-red-50 border border-red-200 rounded-lg p-4 space-y-3'>
                  <p className='text-sm font-semibold text-red-700'>정말 탈퇴하시겠습니까?</p>
                  <p className='text-xs text-red-500'>
                    탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다.
                    <br />
                    확인하려면 아래에 <strong>탈퇴</strong>를 입력하세요.
                  </p>
                  <input
                    type='text'
                    value={deleteConfirmInput}
                    onChange={(e) => setDeleteConfirmInput(e.target.value)}
                    placeholder='탈퇴'
                    className='w-full border border-red-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400'
                  />
                  <div className='flex gap-2'>
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteConfirmInput('');
                      }}
                      className='flex-1 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
                    >
                      취소
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      disabled={deleteConfirmInput !== '탈퇴' || isDeleting}
                      className='flex-1 py-2 text-sm bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center gap-1'
                    >
                      {isDeleting ? (
                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white' />
                      ) : (
                        <>
                          <Trash2 size={14} />
                          탈퇴하기
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
