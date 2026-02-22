import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Service Role Key — 서버에서만 사용 (클라이언트에 노출되지 않음)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function DELETE(request: Request) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'userId가 필요합니다.' }, { status: 400 });
  }

  // profiles 테이블 삭제
  await supabaseAdmin.from('profiles').delete().eq('id', userId);

  // Supabase Auth 유저 삭제
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    console.error('회원 탈퇴 실패:', error);
    return NextResponse.json({ error: '회원 탈퇴에 실패했습니다.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
