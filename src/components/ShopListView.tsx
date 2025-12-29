import { Shop } from '@/types/db';
import ShopListItem from '@/components/ShopListItem';
import { X, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

interface ShopListViewProps {
  shops: Shop[];
  onClose: () => void;
  onShopSelect: (shop: Shop) => void;
}

export default function ShopListView({ shops, onClose, onShopSelect }: ShopListViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 필터링
  const filteredShops = useMemo(() => {
    if (!searchQuery.trim()) return shops;

    const query = searchQuery.toLowerCase().trim();
    return shops.filter((shop) => {
      const nameMatch = shop.name.toLowerCase().includes(query);
      const addressMatch = shop.address_full.toLowerCase().includes(query);
      return nameMatch || addressMatch;
    });
  }, [shops, searchQuery]);

  return (
    <>
      <button
        onClick={onClose}
        className='absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 z-10'
        aria-label='닫기'
      >
        <X className='w-5 h-5 text-gray-600' />
      </button>

      <h2 className='text-2xl font-bold mb-4 pr-10'>매장 목록</h2>

      {/* 검색창 */}
      <div className='relative mb-4'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
        <input
          type='text'
          placeholder='가게 이름 또는 주소 검색...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
          >
            <X className='w-4 h-4' />
          </button>
        )}
      </div>

      {/* 결과 개수 */}
      <p className='text-sm text-gray-500 mb-4'>
        {searchQuery ? (
          <>
            <span className='font-semibold text-blue-600'>{filteredShops.length}</span>개의 검색
            결과 (전체 {shops.length}개)
          </>
        ) : (
          <>총 {shops.length}개의 매장</>
        )}
      </p>

      {/* 검색 결과 없음 */}
      {filteredShops.length === 0 && (
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <Search className='w-16 h-16 text-gray-300 mb-4' />
          <p className='text-gray-500 font-medium mb-2'>검색 결과가 없습니다</p>
          <p className='text-sm text-gray-400'>다른 검색어를 시도해보세요</p>
        </div>
      )}

      {/* 매장 리스트 (광고 제거됨) */}
      {filteredShops.length > 0 && (
        <div className='space-y-3'>
          {filteredShops.map((shop) => (
            <ShopListItem key={shop.id} shop={shop} onClick={onShopSelect} />
          ))}
        </div>
      )}
    </>
  );
}
