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
    persistSession: false, // 세션 캐시 비활성화
  },
  global: {
    headers: {
      'cache-control': 'no-cache', // 캐시 비활성화
    },
  },
});

/**
 * 모든 인증된 가게 목록을 가져오는 함수
 */
export async function getVerifiedShops(): Promise<Shop[]> {
  console.log('🔍 Fetching shops from Supabase...');

  const { data, error } = await supabase.from('shops').select('*').eq('is_verified', true);

  if (error) {
    console.error('❌ Supabase Error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return [];
  }

  console.log('✅ Fetched shops:', data?.length || 0);
  console.log('Sample data:', data?.[0]); // 첫 번째 데이터 확인

  return data as Shop[];
}
