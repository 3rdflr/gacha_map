import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='border-t border-gray-200 bg-gray-100'>
      <div className='mx-auto max-w-[960px] px-4 py-8 text-sm text-gray-600'>
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-4'>
          <div>
            <p className='mb-2 font-semibold text-gray-800'>서비스</p>
            <ul className='space-y-1'>
              <li>
                <Link href='/' className='hover:underline'>
                  지도
                </Link>
              </li>
              <li>
                <Link href='/gacha-board' className='hover:underline'>
                  가챠 보드
                </Link>
              </li>
              <li>
                <Link href='/faq' className='hover:underline'>
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href='/about' className='hover:underline'>
                  서비스 소개
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className='mb-2 font-semibold text-gray-800'>가이드</p>
            <ul className='space-y-1'>
              <li>
                <Link href='/guide/gacha-beginner' className='hover:underline'>
                  가챠 입문
                </Link>
              </li>
              <li>
                <Link href='/guide/ichiban-kuji' className='hover:underline'>
                  이치방쿠지
                </Link>
              </li>
              <li>
                <Link href='/guide/capsule-toy-brands' className='hover:underline'>
                  브랜드 비교
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className='mb-2 font-semibold text-gray-800'>지역</p>
            <ul className='space-y-1'>
              <li>
                <Link href='/regions/hongdae' className='hover:underline'>
                  홍대
                </Link>
              </li>
              <li>
                <Link href='/regions/gangnam' className='hover:underline'>
                  강남
                </Link>
              </li>
              <li>
                <Link href='/regions/sinchon' className='hover:underline'>
                  신촌·이대
                </Link>
              </li>
              <li>
                <Link href='/regions/myeongdong' className='hover:underline'>
                  명동
                </Link>
              </li>
              <li>
                <Link href='/regions/busan' className='hover:underline'>
                  부산
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className='mb-2 font-semibold text-gray-800'>정책</p>
            <ul className='space-y-1'>
              <li>
                <Link href='/privacy' className='hover:underline'>
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href='/terms' className='hover:underline'>
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className='mt-8 text-center text-xs text-gray-400'>
          © {new Date().getFullYear()} 가챠 지도 — 본 서비스는 비공식 정보 서비스입니다.
        </p>
      </div>
    </footer>
  );
}
