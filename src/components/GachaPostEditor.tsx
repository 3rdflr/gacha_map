'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { Upload, X, Save, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PostFormData {
  title: string;
  description: string;
  release_date: string;
  brand: string;
  price: string;
  series: string;
  tags: string;
  image_url: string;
}

export default function GachaPostEditor({ postId }: { postId?: string }) {
  const router = useRouter();
  const { user, profile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    description: '',
    release_date: '',
    brand: '가챠',
    price: '',
    series: '',
    tags: '',
    image_url: '',
  });
  const [previewImage, setPreviewImage] = useState<string>('');

  // 관리자 권한 체크
  useEffect(() => {
    if (!profile?.is_admin) {
      alert('관리자만 접근할 수 있습니다.');
      router.push('/gacha-board');
    }
  }, [profile, router]);

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('gacha_posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          title: data.title,
          description: data.description || '',
          release_date: data.release_date,
          brand: data.brand,
          price: data.price?.toString() || '',
          series: data.series || '',
          tags: data.tags?.join(', ') || '',
          image_url: data.image_url || '',
        });
        setPreviewImage(data.image_url || '');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      alert('게시글을 불러오는데 실패했습니다.');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 이미지 업로드
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('이미지 크기는 5MB 이하여야 합니다.');
      return;
    }

    setUploading(true);

    try {
      // 파일명 생성
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `gacha-posts/${fileName}`;

      // Supabase Storage에 업로드
      const { error } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (error) throw error;

      // 공개 URL 가져오기
      const {
        data: { publicUrl },
      } = supabase.storage.from('images').getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, image_url: publicUrl }));
      setPreviewImage(publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  // 이미지 제거
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image_url: '' }));
    setPreviewImage('');
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!formData.title || !formData.release_date) {
      alert('제목과 출시일은 필수 항목입니다.');
      return;
    }

    setLoading(true);

    try {
      const postData = {
        title: formData.title,
        description: formData.description,
        release_date: formData.release_date,
        brand: formData.brand,
        price: formData.price ? parseInt(formData.price) : null,
        series: formData.series,
        tags: formData.tags ? formData.tags.split(',').map((tag) => tag.trim()) : [],
        image_url: formData.image_url,
        thumbnail_url: formData.image_url,
        updated_at: new Date().toISOString(),
      };

      if (postId) {
        // 수정
        const { error } = await supabase.from('gacha_posts').update(postData).eq('id', postId);

        if (error) throw error;
        alert('게시글이 수정되었습니다.');
      } else {
        // 새 글 작성
        const { error } = await supabase.from('gacha_posts').insert({
          ...postData,
          created_by: user.id,
        });

        if (error) throw error;
        alert('게시글이 등록되었습니다.');
      }

      router.push('/gacha-board');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('게시글 저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!profile?.is_admin) {
    return null;
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4 max-w-4xl'>
        {/* 헤더 */}
        <div className='mb-8'>
          <Link
            href='/gacha-board'
            className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4'
          >
            <ArrowLeft size={20} />
            목록으로 돌아가기
          </Link>
          <h1 className='text-3xl font-bold text-gray-900'>
            {postId ? '게시글 수정' : '새 게시글 작성'}
          </h1>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className='bg-white rounded-xl shadow-md p-8'>
          {/* 제목 */}
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              제목 <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
              placeholder='예: 포켓몬 캐릭터 가챠 시리즈 Vol.5'
              required
            />
          </div>

          {/* 브랜드 & 시리즈 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                브랜드 <span className='text-red-500'>*</span>
              </label>
              <select
                name='brand'
                value={formData.brand}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
                required
              >
                <option value='가챠'>가챠</option>
                <option value='이치방쿠지'>이치방쿠지</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>시리즈</label>
              <input
                type='text'
                name='series'
                value={formData.series}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
                placeholder='예: 포켓몬, 원피스'
              />
            </div>
          </div>

          {/* 출시일 & 가격 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                출시일 <span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                name='release_date'
                value={formData.release_date}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>가격 (원)</label>
              <input
                type='number'
                name='price'
                value={formData.price}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
                placeholder='500'
              />
            </div>
          </div>

          {/* 설명 */}
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>설명</label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none'
              placeholder='상품에 대한 간단한 설명을 입력하세요'
            />
          </div>

          {/* 태그 */}
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              태그 (쉼표로 구분)
            </label>
            <input
              type='text'
              name='tags'
              value={formData.tags}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
              placeholder='예: 포켓몬, 피규어, 캐릭터'
            />
          </div>

          {/* 이미지 업로드 */}
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>이미지</label>

            {previewImage ? (
              <div className='relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden'>
                <Image src={previewImage} alt='Preview' fill className='object-contain' />
                <button
                  type='button'
                  onClick={handleRemoveImage}
                  className='absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition'
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className='flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition'>
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <Upload className='w-12 h-12 text-gray-400 mb-3' />
                  <p className='mb-2 text-sm text-gray-500'>
                    <span className='font-semibold'>클릭하여 업로드</span>
                  </p>
                  <p className='text-xs text-gray-500'>PNG, JPG (최대 5MB)</p>
                </div>
                <input
                  type='file'
                  className='hidden'
                  accept='image/*'
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            )}

            {uploading && <p className='text-sm text-blue-600 mt-2'>업로드 중...</p>}
          </div>

          {/* 제출 버튼 */}
          <div className='flex gap-4'>
            <button
              type='submit'
              disabled={loading || uploading}
              className='flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Save size={20} />
              {loading ? '저장 중...' : postId ? '수정하기' : '등록하기'}
            </button>

            <Link
              href='/gacha-board'
              className='px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition'
            >
              취소
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
