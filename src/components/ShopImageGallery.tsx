'use client';

import Image from 'next/image';
import { wsrvLoader } from '@/components/common/wsrvLoader';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface ShopImageGalleryProps {
  images: string[];
  shopName: string;
}

/**
 * /shops/[id] 페이지용 이미지 갤러리.
 * BottomSheet 의 ShopDetailView 갤러리와 동일한 UX (좌우 화살표 + 인디케이터).
 */
export default function ShopImageGallery({ images, shopName }: ShopImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const next = () => setCurrentIndex((p) => (p + 1) % images.length);
  const prev = () => setCurrentIndex((p) => (p - 1 + images.length) % images.length);

  return (
    <div className='relative mb-6 h-[280px] w-full overflow-hidden rounded-lg bg-gray-100 sm:h-[400px]'>
      <Image
        loader={wsrvLoader}
        src={images[currentIndex]}
        alt={`${shopName} - ${currentIndex + 1}`}
        className='h-full w-full object-cover'
        sizes='(max-width: 640px) 100vw, 820px'
        width={820}
        height={400}
        priority
      />

      {images.length > 1 && (
        <>
          <button
            type='button'
            onClick={prev}
            aria-label='이전 이미지'
            className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70'
          >
            <ChevronLeft className='h-6 w-6' />
          </button>

          <button
            type='button'
            onClick={next}
            aria-label='다음 이미지'
            className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70'
          >
            <ChevronRight className='h-6 w-6' />
          </button>

          <div className='absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5'>
            {images.map((_, i) => (
              <button
                key={i}
                type='button'
                aria-label={`${i + 1}번째 이미지로 이동`}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
