import { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '자주 묻는 질문 (FAQ) — 가챠 지도',
  description:
    '가챠 지도 이용 방법, 캡슐토이·이치방쿠지 관련 자주 묻는 질문과 답변입니다. 매장 추가·수정 방법, 가챠폰 이용법, 쿠지 구매 팁을 정리했습니다.',
  alternates: { canonical: 'https://gachamap.vercel.app/faq' },
};

export default function FaqPage() {
  return (
    <main className='mx-auto max-w-[720px] px-4 py-10 text-gray-800'>
      <nav className='mb-4 text-sm text-gray-500'>
        <Link href='/' className='hover:underline'>홈</Link> /{' '}
        <span className='text-gray-700'>FAQ</span>
      </nav>

      <h1 className='mb-3 text-2xl font-bold'>자주 묻는 질문 (FAQ)</h1>
      <p className='mb-8 text-gray-500'>
        가챠 지도 이용과 캡슐토이·이치방쿠지에 관해 자주 들어오는 질문들을 모았습니다.
      </p>

      <section className='mb-10'>
        <h2 className='mb-4 border-b border-gray-200 pb-2 text-xl font-semibold'>서비스 이용</h2>
        <dl className='space-y-6'>
          <div>
            <dt className='font-medium text-gray-900'>가챠 지도는 무료인가요?</dt>
            <dd className='mt-2 text-sm leading-relaxed text-gray-600'>
              네, 완전 무료입니다. 회원가입 없이도 지도 조회와 매장 검색이 가능합니다. 게시판
              글 작성이나 매장 정보 제보 등 일부 기능은 로그인이 필요합니다.
            </dd>
          </div>
          <div>
            <dt className='font-medium text-gray-900'>내 현재 위치 기준으로 검색할 수 있나요?</dt>
            <dd className='mt-2 text-sm leading-relaxed text-gray-600'>
              브라우저의 위치 정보 권한을 허용하면 현재 위치 기준으로 주변 매장을 찾을 수 있습니다.
              모바일 환경에서도 동일하게 동작합니다.
            </dd>
          </div>
          <div>
            <dt className='font-medium text-gray-900'>캡슐토이, 쿠지, 랜덤박스 매장만 따로 볼 수 있나요?</dt>
            <dd className='mt-2 text-sm leading-relaxed text-gray-600'>
              지도 상단 필터 버튼을 이용하면 각 카테고리별로 필터링할 수 있습니다. 복수 카테고리
              동시 선택도 가능합니다.
            </dd>
          </div>
          <div>
            <dt className='font-medium text-gray-900'>앱이 있나요? 모바일에서도 잘 되나요?</dt>
            <dd className='mt-2 text-sm leading-relaxed text-gray-600'>
              별도 앱은 없지만 모바일 브라우저에 최적화되어 있습니다. Safari나 Chrome에서
              &ldquo;홈 화면에 추가&rdquo;하면 앱처럼 사용할 수 있습니다.
            </dd>
          </div>
        </dl>
      </section>

      <section className='mb-10'>
        <h2 className='mb-4 border-b border-gray-200 pb-2 text-xl font-semibold'>매장 정보</h2>
        <dl className='space-y-6'>
          <div>
            <dt className='font-medium text-gray-900'>지도에 없는 매장을 발견했어요. 어떻게 추가하나요?</dt>
            <dd className='mt-2 text-sm leading-relaxed text-gray-600'>
              <Link href='/gacha-board' className='text-blue-600 hover:underline'>가챠 게시판</Link>에
              매장명, 주소, 취급 카테고리를 제보해 주시면 검토 후 지도에 반영합니다. 사진을 함께
              첨부해 주시면 더 빨리 등록됩니다.
            </dd>
          </div>
          <div>
            <dt className='font-medium text-gray-900'>매장 정보가 잘못됐어요(폐업, 주소 변경 등).</dt>
            <dd className='mt-2 text-sm leading-relaxed text-gray-600'>
              게시판에 정정 내용을 남겨주세요. 폐업이나 이전 같은 중요한 변경 사항은 우선적으로
              처리합니다.
            </dd>
          </div>
          <div>
            <dt className='font-medium text-gray-900'>영업시간이 실시간으로 업데이트되나요?</dt>
            <dd className='mt-2 text-sm leading-relaxed text-gray-600'>
              영업시간은 커뮤니티 제보를 바탕으로 업데이트됩니다. 명절·임시 휴무 등 실시간 변동은
              반영되지 않을 수 있으니 방문 전 매장에 직접 확인하는 것을 권장합니다.
            </dd>
          </div>
        </dl>
      </section>

      <section className='mb-10'>
        <h2 className='mb-4 border-b border-gray-200 pb-2 text-xl font-semibold'>가챠·쿠지 이용</h2>
        <dl className='space-y-6'>
          <div>
            <dt className='font-medium text-gray-900'>가챠폰과 이치방쿠지(쿠지)는 어떻게 다른가요?</dt>
            <dd className='mt-2 text-sm leading-relaxed text-gray-600'>
              가챠폰은 동전을 넣고 캡슐을 직접 뽑는 무인 자동판매기 방식(500원~1,500원)이고,
              이치방쿠지는 매장 직원이 있는 복권식 방식(장당 8,000원~12,000원)입니다.{' '}
              <Link href='/guide/gacha-beginner' className='text-blue-600 hover:underline'>입문 가이드</Link>를
              참고하세요.
            </dd>
          </div>
          <div>
            <dt className='font-medium text-gray-900'>이치방쿠지 라스트원상이란 무엇인가요?</dt>
            <dd className='mt-2 text-sm leading-relaxed text-gray-600'>
              박스의 마지막 티켓을 뽑은 사람에게 추가로 지급되는 한정 컬러 피규어입니다. 일반 A상과
              색상이 다르며 희소성이 높습니다.{' '}
              <Link href='/guide/ichiban-kuji' className='text-blue-600 hover:underline'>이치방쿠지 가이드</Link>를
              참고하세요.
            </dd>
          </div>
          <div>
            <dt className='font-medium text-gray-900'>원하는 종류가 나올 확률을 높이는 방법이 있나요?</dt>
            <dd className='mt-2 text-sm leading-relaxed text-gray-600'>
              이치방쿠지는 잔여 등급표를 확인해 원하는 등급이 남아 있을 때 도전하는 것이 핵심입니다.
              가챠폰은 완전 랜덤입니다. 컴플리트가 목표라면 박스 단위 구매나 중고 교환을 활용하세요.
            </dd>
          </div>
          <div>
            <dt className='font-medium text-gray-900'>중복이 나왔을 때 교환·환불이 되나요?</dt>
            <dd className='mt-2 text-sm leading-relaxed text-gray-600'>
              대부분의 매장에서 교환·환불을 받지 않습니다. 당근마켓, 번개장터 또는 SNS 가챠 교환
              커뮤니티를 통해 원하는 종류로 맞교환하는 것이 일반적입니다.
            </dd>
          </div>
        </dl>
      </section>

      <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
        <p className='mb-2 font-semibold'>더 궁금한 점이 있으신가요?</p>
        <p className='text-sm text-gray-600'>
          <Link href='/gacha-board' className='text-blue-600 hover:underline'>가챠 게시판</Link>에
          질문을 남겨주시면 커뮤니티 또는 운영팀이 답변드립니다.
        </p>
      </div>
    </main>
  );
}
