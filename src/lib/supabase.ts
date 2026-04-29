import { createClient } from '@supabase/supabase-js';
import { Shop } from '@/types/db'; // 앞에서 정의한 Shop 타입

// 환경 변수 설정 (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 필요)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: 'public',
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

/**
 * 모든 인증된 가게 목록을 가져오는 함수
 */
export async function getVerifiedShops(): Promise<Shop[]> {
  const { data, error } = await supabase.from('shops').select('*').eq('is_verified', true);

  if (error) {
    console.error('❌ Supabase Error:', error);
    return [];
  }

  return data as Shop[];
}

/**
 * 단일 매장 정보 조회
 */
export async function getShopById(id: number): Promise<Shop | null> {
  const { data, error } = await supabase
    .from('shops')
    .select('*')
    .eq('id', id)
    .eq('is_verified', true)
    .single();

  if (error) {
    console.error('getShopById error:', error);
    return null;
  }
  return data as Shop;
}

/**
 * 좌표 근처 매장 N개 (단순 거리 정렬)
 */
export async function getNearbyShops(
  lat: number,
  lng: number,
  excludeId: number,
  limit = 6,
): Promise<Shop[]> {
  const all = await getVerifiedShops();
  return all
    .filter((s) => s.id !== excludeId)
    .map((s) => ({
      shop: s,
      d: Math.hypot(s.latitude - lat, s.longitude - lng),
    }))
    .sort((a, b) => a.d - b.d)
    .slice(0, limit)
    .map((x) => x.shop);
}
