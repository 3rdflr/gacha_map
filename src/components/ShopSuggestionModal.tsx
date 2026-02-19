'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { X, Upload, Plus, Trash2, Store } from 'lucide-react';
import Image from 'next/image';
import { wsrvLoader } from '@/components/common/wsrvLoader';

interface ShopSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShopSuggestionModal({ isOpen, onClose }: ShopSuggestionModalProps) {
  const user = useAuthStore((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 폼 상태
  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  // 이미지 URL 추가
  const handleAddImageUrl = () => {
    if (currentImageUrl.trim()) {
      // URL 유효성 검사
      try {
        new URL(currentImageUrl);
        setImageUrls([...imageUrls, currentImageUrl.trim()]);
        setCurrentImageUrl('');
      } catch {
        alert('올바른 URL 형식이 아닙니다.');
      }
    }
  };

  // 이미지 URL 삭제
  const handleRemoveImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  // 폼 초기화
  const resetForm = () => {
    setShopName('');
    setAddress('');
    setProductInfo('');
    setImageUrls([]);
    setCurrentImageUrl('');
  };

  // 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!shopName.trim()) {
      alert('가게 이름을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from('shop_suggestions').insert({
      user_id: user.id,
      shop_name: shopName.trim(),
      address: address.trim() || null,
      product_info: productInfo.trim() || null,
      images: imageUrls.length > 0 ? imageUrls : null,
    });

    setIsSubmitting(false);

    if (error) {
      console.error('추천 제출 실패:', error);
      alert('가게 추천 제출에 실패했습니다. 다시 시도해주세요.');
    } else {
      alert('✅ 가게 추천이 제출되었습니다!\n검토 후 지도에 추가하겠습니다. 감사합니다!');
      resetForm();
      onClose();
    }
  };

  // 로그인하지 않은 경우
  if (!user) {
    return (
      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black transition-opacity ${
            isOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={onClose}
        />
        <div
          className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 transition-transform ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <button
            onClick={onClose}
            className='absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200'
          >
            <X className='w-5 h-5 text-gray-600' />
          </button>

          <div className='text-center py-8'>
            <Store className='w-16 h-16 text-blue-600 mx-auto mb-4' />
            <h2 className='text-2xl font-bold mb-2'>로그인이 필요합니다</h2>
            <p className='text-gray-600 mb-4'>가게를 추천하려면 로그인이 필요합니다.</p>
            <button
              onClick={onClose}
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold'
            >
              확인
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto'>
      <div className='absolute inset-0 bg-black/50' onClick={onClose} />

      <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 my-8 p-6 max-h-[90vh] overflow-y-auto'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200'
        >
          <X className='w-5 h-5 text-gray-600' />
        </button>

        <div className='flex items-center gap-3 mb-6'>
          <Store className='w-8 h-8 text-blue-600' />
          <div>
            <h2 className='text-2xl font-bold'>새 가게 추천하기</h2>
            <p className='text-sm text-gray-500'>발견한 가게를 공유해주세요!</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* 가게 이름 (필수) */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              가게 이름 <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder='예: 메가하우스 홍대점'
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* 주소 */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>주소 (선택)</label>
            <input
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='예: 서울시 마포구 홍익로 123'
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* 파는 물건 정보 */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              파는 물건 정보 (선택)
            </label>
            <textarea
              value={productInfo}
              onChange={(e) => setProductInfo(e.target.value)}
              placeholder='예: 가챠폰, 이치방쿠지, 애니메이션 굿즈, 귀멸의칼날 피규어 등'
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
              rows={3}
              maxLength={500}
            />
            <p className='text-xs text-gray-500 text-right mt-1'>{productInfo.length}/500</p>
          </div>

          {/* 이미지 URL */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              가게 사진 URL (선택)
            </label>
            <div className='flex gap-2 mb-3'>
              <input
                type='url'
                value={currentImageUrl}
                onChange={(e) => setCurrentImageUrl(e.target.value)}
                placeholder='https://example.com/image.jpg'
                className='flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddImageUrl();
                  }
                }}
              />
              <button
                type='button'
                onClick={handleAddImageUrl}
                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2'
              >
                <Plus className='w-4 h-4' />
                추가
              </button>
            </div>

            {/* 추가된 이미지 목록 */}
            {imageUrls.length > 0 && (
              <div className='space-y-2'>
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-3 bg-gray-50 rounded-xl p-2 border border-gray-100'
                  >
                    {/* 이미지 컨테이너 */}
                    <div className='relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center'>
                      <Image
                        loader={wsrvLoader}
                        src={url}
                        alt={`미리보기 ${index + 1}`}
                        fill
                        sizes='48px'
                        className='object-cover'
                        // 이미지 로드 실패 시 투명하게 처리 (부모의 아이콘이 보이게 됨)
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {/* 이미지 로드 실패 시 보여줄 기본 아이콘 (이미지 뒤에 깔려 있음) */}
                      <Store className='w-5 h-5 text-gray-400 absolute' />
                    </div>

                    <span className='flex-1 text-sm text-gray-600 truncate font-medium'>{url}</span>

                    <button
                      type='button'
                      onClick={() => handleRemoveImageUrl(index)}
                      className='p-2 hover:bg-red-50 text-red-500 transition-colors rounded-lg'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 안내 메시지 */}
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <p className='text-sm text-blue-800'>
              사진 정보를 포함하면 해당 가게를 확인하기 더 좋아요
            </p>
          </div>

          {/* 제출 버튼 */}
          <button
            type='submit'
            disabled={isSubmitting || !shopName.trim()}
            className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2'
          >
            {isSubmitting ? (
              <>
                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                제출 중...
              </>
            ) : (
              <>
                <Upload className='w-5 h-5' />
                가게 추천하기
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
