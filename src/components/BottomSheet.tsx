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

/**
 * 매장 상세 / 목록 패널.
 *  - 모바일(<lg): 화면 하단에서 올라오는 BottomSheet (검정 오버레이 포함)
 *  - 데스크톱(lg+): 화면 좌측에서 슬라이드 인 되는 사이드바 (오버레이 없음 → 지도 조작 가능)
 *    헤더(약 64px)와 겹치지 않도록 lg:top-16 부터 시작.
 */
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
        fixed inset-0 z-40 transition-all duration-300 ease-in-out
        lg:pointer-events-none
        ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
      `}
    >
      {/* 배경 오버레이 — 모바일 전용 */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 lg:hidden
          ${isOpen ? 'opacity-50' : 'opacity-0'}
        `}
        onClick={handleClose}
      />

      {/*
        패널
          모바일: 하단에서 올라오는 시트 (overlay 위)
          데스크탑: 좌측 고정 사이드바 (헤더 아래에서 시작)
      */}
      <div
        className={`absolute bg-white shadow-2xl transition-transform duration-300 p-4 overflow-y-auto
          bottom-0 w-full h-[90vh] rounded-t-xl
          lg:bottom-0 lg:top-16 lg:left-0 lg:h-auto lg:w-[400px] lg:max-w-[92vw] lg:rounded-none lg:rounded-r-xl lg:border-r lg:border-gray-200 lg:pointer-events-auto
          ${
            isOpen
              ? 'translate-y-0 lg:translate-x-0 lg:translate-y-0'
              : 'translate-y-full lg:-translate-x-full lg:translate-y-0'
          }
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
