'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { Upload, X, Save, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { wsrvLoader } from '@/components/common/wsrvLoader';

interface PostFormData {
  title: string;
  description: string;
  release_date: string;
  brand: string;
  country: string;
  price: string;
  series: string;
  tags: string;
}

interface UploadItem {
  id: string;
  previewUrl: string;
  publicUrl: string;
  caption: string;
  status: 'pending' | 'compressing' | 'uploading' | 'done' | 'error';
}

export default function GachaPostEditor({ postId }: { postId?: string }) {
  const router = useRouter();
  const { user, profile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    description: '',
    release_date: '',
    brand: '가챠',
    country: '일본',
    price: '',
    series: '',
    tags: '',
  });
  const [uploadItems, setUploadItems] = useState<UploadItem[]>([]);

  useEffect(() => {
    if (!profile?.is_admin) {
      alert('관리자만 접근할 수 있습니다.');
      router.push('/gacha-board');
    }
  }, [profile, router]);

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
          country: data.country || '일본',
          price: data.price?.toString() || '',
          series: data.series || '',
          tags: data.tags?.join(', ') || '',
        });

        // 기존 이미지 복원 (images[] 우선, 없으면 image_url fallback)
        const existingUrls: string[] = data.images?.length ? data.images : (data.image_url ? [data.image_url] : []);
        const existingCaptions: string[] = data.captions || [];
        setUploadItems(
          existingUrls.map((url, idx) => ({
            id: url,
            previewUrl: url,
            publicUrl: url,
            caption: existingCaptions[idx] || '',
            status: 'done',
          })),
        );
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

  const handleCaptionChange = (id: string, caption: string) => {
    setUploadItems((prev) => prev.map((i) => (i.id === id ? { ...i, caption } : i)));
  };

  const compressForUpload = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        const MAX_PX = 1920;
        if (width > MAX_PX || height > MAX_PX) {
          if (width > height) {
            height = Math.round((height * MAX_PX) / width);
            width = MAX_PX;
          } else {
            width = Math.round((width * MAX_PX) / height);
            height = MAX_PX;
          }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(file);
            resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }));
          },
          'image/jpeg',
          0.82,
        );
      };
      img.src = url;
    });
  };

  const uploadOne = async (item: UploadItem, file: File): Promise<string> => {
    setUploadItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: 'compressing' } : i)),
    );
    const uploadFile = await compressForUpload(file);

    setUploadItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: 'uploading' } : i)),
    );
    const fileExt = uploadFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `gacha-posts/${fileName}`;

    const { error } = await supabase.storage.from('images').upload(filePath, uploadFile);
    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath);
    return publicUrl;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newItems: UploadItem[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      previewUrl: URL.createObjectURL(file),
      publicUrl: '',
      caption: '',
      status: 'pending',
    }));
    setUploadItems((prev) => [...prev, ...newItems]);

    await Promise.all(
      files.map(async (file, idx) => {
        const item = newItems[idx];
        try {
          const publicUrl = await uploadOne(item, file);
          setUploadItems((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, publicUrl, status: 'done' } : i)),
          );
        } catch {
          setUploadItems((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, status: 'error' } : i)),
          );
        }
      }),
    );

    e.target.value = '';
  };

  const handleRemoveImage = (id: string) => {
    setUploadItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item && item.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(item.previewUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

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

    const isUploading = uploadItems.some((i) => i.status === 'compressing' || i.status === 'uploading');
    if (isUploading) {
      alert('이미지 업로드가 완료될 때까지 기다려주세요.');
      return;
    }

    const doneItems = uploadItems.filter((i) => i.status === 'done');
    const images = doneItems.map((i) => i.publicUrl);
    const captions = doneItems.map((i) => i.caption);
    const firstImageUrl = images[0] || '';

    setLoading(true);
    try {
      const postData = {
        title: formData.title,
        description: formData.description,
        release_date: formData.release_date,
        brand: formData.brand,
        country: formData.country,
        price: formData.price ? parseInt(formData.price) : null,
        series: formData.series,
        tags: formData.tags ? formData.tags.split(',').map((tag) => tag.trim()) : [],
        image_url: firstImageUrl,
        thumbnail_url: firstImageUrl,
        images,
        captions,
        updated_at: new Date().toISOString(),
      };

      if (postId) {
        const { error } = await supabase.from('gacha_posts').update(postData).eq('id', postId);
        if (error) throw error;
        alert('게시글이 수정되었습니다.');
      } else {
        const { error } = await supabase.from('gacha_posts').insert({ ...postData, created_by: user.id });
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

  if (!profile?.is_admin) return null;

  const isUploading = uploadItems.some((i) => i.status === 'compressing' || i.status === 'uploading');
  const doneCount = uploadItems.filter((i) => i.status === 'done').length;

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4 max-w-4xl'>
        {/* 헤더 */}
        <div className='mb-8'>
          <Link href='/gacha-board' className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4'>
            <ArrowLeft size={20} />
            목록으로 돌아가기
          </Link>
          <h1 className='text-3xl font-bold text-gray-900'>
            {postId ? '게시글 수정' : '새 게시글 작성'}
          </h1>
        </div>

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

          {/* 국가 & 브랜드 & 시리즈 */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                국가 <span className='text-red-500'>*</span>
              </label>
              <select
                name='country'
                value={formData.country}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
                required
              >
                <option value='일본'>🇯🇵 일본</option>
                <option value='한국'>🇰🇷 한국</option>
              </select>
            </div>
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
                <option value='쿠지'>쿠지</option>
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
            <label className='block text-sm font-semibold text-gray-700 mb-2'>태그 (쉼표로 구분)</label>
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
            <div className='flex items-center justify-between mb-2'>
              <label className='block text-sm font-semibold text-gray-700'>
                이미지
                {uploadItems.length > 0 && (
                  <span className='ml-2 text-xs font-normal text-gray-400'>
                    {doneCount}/{uploadItems.length}장 완료
                  </span>
                )}
              </label>
            </div>
            <p className='text-xs text-gray-400 mb-3'>첫 번째 이미지가 대표 이미지로 자동 설정됩니다. 각 이미지마다 설명을 입력할 수 있어요.</p>

            {/* 이미지 + 캡션 목록 */}
            {uploadItems.length > 0 && (
              <div className='space-y-4 mb-3'>
                {uploadItems.map((item, idx) => (
                  <div key={item.id} className='flex gap-3 items-start border border-gray-200 rounded-lg p-3'>
                    {/* 썸네일 */}
                    <div className='relative flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden'>
                      <Image
                        loader={item.status === 'done' ? wsrvLoader : undefined}
                        src={item.previewUrl}
                        alt={`이미지 ${idx + 1}`}
                        fill
                        unoptimized={item.status !== 'done'}
                        className='object-cover'
                      />
                      {idx === 0 && item.status === 'done' && (
                        <div className='absolute bottom-1 left-1'>
                          <span className='text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded'>대표</span>
                        </div>
                      )}
                      {(item.status === 'compressing' || item.status === 'uploading') && (
                        <div className='absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1'>
                          <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                          <span className='text-white text-xs'>
                            {item.status === 'compressing' ? '압축' : '업로드'}
                          </span>
                        </div>
                      )}
                      {item.status === 'error' && (
                        <div className='absolute inset-0 bg-red-500/70 flex items-center justify-center'>
                          <span className='text-white text-xs font-semibold'>실패</span>
                        </div>
                      )}
                    </div>

                    {/* 캡션 입력 */}
                    <div className='flex-1'>
                      <label className='text-xs text-gray-500 mb-1 block'>이미지 {idx + 1} 설명</label>
                      <textarea
                        value={item.caption}
                        onChange={(e) => handleCaptionChange(item.id, e.target.value)}
                        rows={3}
                        className='w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none'
                        placeholder={idx === 0 ? '대표 이미지 설명 (선택)' : `이미지 ${idx + 1} 설명 (선택)`}
                      />
                    </div>

                    {/* 삭제 버튼 */}
                    <button
                      type='button'
                      onClick={() => handleRemoveImage(item.id)}
                      className='flex-shrink-0 p-1.5 bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 rounded-full transition'
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {/* 추가 업로드 버튼 */}
                <label className='flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition text-gray-400 text-sm'>
                  <Upload size={18} />
                  이미지 추가
                  <input
                    type='file'
                    className='hidden'
                    accept='image/*'
                    multiple
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
            )}

            {/* 초기 업로드 영역 */}
            {uploadItems.length === 0 && (
              <label className='flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition'>
                <div className='flex flex-col items-center justify-center'>
                  <Upload className='w-10 h-10 text-gray-400 mb-2' />
                  <p className='text-sm text-gray-500 mb-1'>
                    <span className='font-semibold'>클릭하여 업로드</span>
                  </p>
                  <p className='text-xs text-gray-400'>여러 장 동시 선택 가능 · 20MB 초과 시 자동 압축</p>
                </div>
                <input
                  type='file'
                  className='hidden'
                  accept='image/*'
                  multiple
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          {/* 제출 버튼 */}
          <div className='flex gap-4'>
            <button
              type='submit'
              disabled={loading || isUploading}
              className='flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Save size={20} />
              {loading ? '저장 중...' : isUploading ? '업로드 중...' : postId ? '수정하기' : '등록하기'}
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
