import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Service Role Key — NEXT_PUBLIC_ 없음 → 서버에서만 읽힘, 클라이언트에 절대 노출 안 됨
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function DELETE(request: Request) {
  // Authorization 헤더에서 액세스 토큰 추출
  const authHeader = request.headers.get('Authorization');
  const accessToken = authHeader?.replace('Bearer ', '');

  if (!accessToken) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  // 토큰으로 실제 로그인한 유저 확인
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);

  if (authError || !user) {
    return NextResponse.json({ error: '유효하지 않은 토큰입니다.' }, { status: 401 });
  }

  // profiles 테이블 삭제
  await supabaseAdmin.from('profiles').delete().eq('id', user.id);

  // Supabase Auth 유저 삭제
  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (error) {
    console.error('회원 탈퇴 실패:', error);
    return NextResponse.json({ error: '회원 탈퇴에 실패했습니다.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
