import Image from 'next/image';
import { Shop } from '@/types/db';
import { MapPin } from 'lucide-react';
import { wsrvLoader } from '@/components/common/wsrvLoader';

interface ShopListItemProps {
  shop: Shop;
  onClick: (shop: Shop) => void;
}

export default function ShopListItem({ shop, onClick }: ShopListItemProps) {
  return (
    <button
      onClick={() => onClick(shop)}
      className='w-full bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all text-left'
    >
      <div className='flex items-start gap-3'>
        {/* 썸네일 이미지 */}
        {shop.images && shop.images.length > 0 ? (
          <Image
            loader={wsrvLoader}
            src={shop.images[0]}
            alt={shop.name}
            className='w-20 h-20 rounded-lg object-cover flex-shrink-0'
            sizes='100vw'
            width={200}
            height={200}
            priority
          />
        ) : (
          <div className='w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0'>
            <MapPin className='w-8 h-8 text-gray-400' />
          </div>
        )}

        {/* 가게 정보 */}
        <div className='flex-1 min-w-0'>
          <h3 className='font-bold text-lg mb-1 truncate'>{shop.name}</h3>
          <p className='text-sm text-gray-600 mb-2 truncate'>{shop.address_full}</p>

          {/* 카테고리 태그 */}
          <div className='flex flex-wrap gap-1'>
            {shop.categories?.slice(0, 3).map((cat, idx) => (
              <span
                key={idx}
                className='px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full'
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
