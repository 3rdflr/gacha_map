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
