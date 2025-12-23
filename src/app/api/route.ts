import { NextResponse } from 'next/server';
// DB 연결 로직 (예: Supabase 클라이언트)

export async function GET() {
  // 1. Supabase 또는 DB에서 가게 목록을 가져오는 쿼리 실행
  // 2. 쿼리 파라미터를 받아와 지도 영역 내의 가게만 필터링 (lat, lng, bounds)

  const shops = [
    // DB에서 가져온 데이터 예시
    { id: 1, name: '샵A', latitude: 37.555, longitude: 126.999, categories: ['가챠'] },
    // ...
  ];

  return NextResponse.json({ shops });
}
