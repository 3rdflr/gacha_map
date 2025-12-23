import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='mt-16 bg-gray-100 border-t border-gray-200'>
      <div className='max-w-[720px] mx-auto py-6 flex justify-center gap-4 text-sm text-gray-600'>
        <Link href='/about'>서비스 소개</Link>
        <span>|</span>
        <Link href='/privacy'>개인정보처리방침</Link>
        <span>|</span>
        <Link href='/terms'>이용약관</Link>
      </div>

      <p className='text-center text-xs text-gray-400 pb-4'>
        © {new Date().getFullYear()} 국내 가챠 지도
      </p>
    </footer>
  );
}
