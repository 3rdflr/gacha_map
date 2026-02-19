import { redirect } from 'next/navigation';

// /gacha-board/edit 직접 접근 시 목록으로 리다이렉트
export default function Page() {
  redirect('/gacha-board');
}
