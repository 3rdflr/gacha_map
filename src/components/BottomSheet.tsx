import { Shop } from '@/types/db';
import ShopDetailView from '@/components/ShopDetailView';
import ShopListView from '@/components/ShopListView';

interface BottomSheetProps {
  mode: 'detail' | 'list';
  shop: Shop | null;
  shops: Shop[];
  onClose: () => void;
  onShopSelect?: (shop: Shop) => void;
  onBackToList?: () => void;
}

export default function BottomSheet({
  mode,
  shop,
  shops,
  onClose,
  onShopSelect,
  onBackToList,
}: BottomSheetProps) {
  const isOpen = mode === 'detail' ? !!shop : shops.length > 0;

  const handleClose = () => {
    onClose();
  };

  const handleShopSelect = (selectedShop: Shop) => {
    if (onShopSelect) {
      onShopSelect(selectedShop);
    }
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 transition-all duration-300 ease-in-out 
        ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
      `}
    >
      {/* 배경 오버레이 */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 
          ${isOpen ? 'opacity-50' : 'opacity-0'}
        `}
        onClick={handleClose}
      />

      {/* Bottom Sheet Panel */}
      <div
        className={`absolute bottom-0 w-full bg-white rounded-t-xl shadow-2xl transition-transform duration-300 p-4
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
          max-h-[90vh] overflow-y-auto
        `}
      >
        {/* 리스트 모드 */}
        {mode === 'list' && shops.length > 0 && (
          <ShopListView shops={shops} onClose={handleClose} onShopSelect={handleShopSelect} />
        )}

        {/* 상세 모드 */}
        {mode === 'detail' && shop && (
          <ShopDetailView shop={shop} onClose={handleClose} onBackToList={onBackToList} />
        )}
      </div>
    </div>
  );
}
