import { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '가챠 입문 가이드 — 캡슐토이 처음이라면 이것부터',
  description:
    '캡슐토이(가챠폰) 입문자를 위한 완벽 가이드. 가챠폰·이치방쿠지·랜덤박스 차이, 가격대, 매장 이용법, 인기 브랜드까지 한 번에 정리했습니다.',
  alternates: { canonical: 'https://gachamap.vercel.app/guide/gacha-beginner' },
};

export default function GachaBeginnerGuide() {
  return (
    <main className='mx-auto max-w-[720px] px-4 py-10 text-gray-800'>
      <nav className='mb-4 text-sm text-gray-500'>
        <Link href='/' className='hover:underline'>홈</Link> /{' '}
        <span className='text-gray-700'>가챠 입문 가이드</span>
      </nav>

      <h1 className='mb-3 text-2xl font-bold'>가챠 입문 가이드 — 캡슐토이 처음이라면 이것부터</h1>
      <p className='mb-6 text-sm text-gray-500'>최종 업데이트: 2026년 4월</p>

      <p className='mb-6 leading-relaxed'>
        일본 애니메이션과 게임 문화의 영향으로 국내에서도 <strong>캡슐토이(가챠폰)</strong>와{' '}
        <strong>이치방쿠지(제일복권)</strong> 매장이 빠르게 늘고 있습니다. 홍대·강남·신촌 등 번화가
        골목에서 형형색색의 캡슐 자동판매기나 쿠지 매대를 한 번쯤 보셨을 겁니다. 이 글에서는
        가챠를 처음 접하는 분들이 헷갈리기 쉬운 개념, 가격대, 매장 이용 방법을 정리했습니다.
      </p>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>가챠폰, 쿠지, 랜덤박스 — 뭐가 다른가요?</h2>
        <p className='mb-3 leading-relaxed'>크게 세 가지 방식이 있습니다. 각각 뽑는 방법과 가격, 상품 크기가 다릅니다.</p>
        <ul className='mb-4 list-disc space-y-2 pl-5 leading-relaxed'>
          <li>
            <strong>가챠폰(캡슐토이)</strong> — 500원~1,500원짜리 동전을 넣고 손잡이를 돌려 캡슐을
            뽑는 자동판매기 방식입니다. 한 기계에 보통 6~10종 중 랜덤으로 나옵니다. 소형 피규어,
            키링, 미니어처 소품이 주류입니다.
          </li>
          <li>
            <strong>이치방쿠지(제일복권 / 쿠지)</strong> — 매장 직원이 있는 복권 방식입니다. 박스
            안에 등급별 티켓이 정해진 수량만큼 들어 있고, 티켓 한 장당 8,000원~12,000원 수준입니다.
            대형 피규어부터 소품까지 퀄리티가 높은 편입니다.
          </li>
          <li>
            <strong>랜덤박스</strong> — 박스를 구매하면 여러 디자인 중 하나가 랜덤으로 들어 있는
            방식입니다. 한국·중국 브랜드(팝마트, 스컬판다 등)가 대표적입니다. 가격은
            10,000원~30,000원 사이가 많습니다.
          </li>
        </ul>
        <p className='leading-relaxed'>
          세 방식 중 가장 저렴하게 시작할 수 있는 건 <strong>가챠폰</strong>이고, 퀄리티 높은
          피규어를 원한다면 <strong>이치방쿠지</strong>가 적합합니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>가챠 매장 이용 방법</h2>
        <ol className='list-decimal space-y-3 pl-5 leading-relaxed'>
          <li>
            <strong>원하는 IP·캐릭터 먼저 확인.</strong> 기계마다 취급 IP가 다르므로, 특정 애니메이션
            캐릭터를 원한다면 사전에 어떤 매장에 해당 기계가 있는지 확인하는 게 좋습니다.{' '}
            <Link href='/' className='text-blue-600 hover:underline'>가챠 지도</Link>를 활용하면
            카테고리 필터로 빠르게 찾을 수 있습니다.
          </li>
          <li>
            <strong>동전 준비 또는 환전기 이용.</strong> 대부분의 가챠 매장에는 지폐를 동전으로
            바꿔주는 환전기가 있습니다. 일부 기계는 카드 결제도 지원합니다.
          </li>
          <li>
            <strong>원하는 기계 앞에서 뽑기.</strong> 캡슐에 인쇄된 미리보기 이미지로 어떤 디자인이
            나올지 대략 확인할 수 있습니다. 단, 실제로 어떤 종류가 나올지는 완전 랜덤입니다.
          </li>
          <li>
            <strong>캡슐 개봉 및 조립.</strong> 캡슐 안에 부품이 분리된 상태로 들어 있는 경우가
            많습니다. 설명서대로 조립하면 됩니다.
          </li>
          <li>
            <strong>중복이 나왔다면 교환 시장 활용.</strong> SNS나 중고 거래 플랫폼에는 가챠 교환
            커뮤니티가 활성화되어 있습니다.
          </li>
        </ol>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>가격대 및 예산 계획</h2>
        <p className='mb-3 leading-relaxed'>
          가챠는 운에 따라 지출이 크게 달라집니다. 미리 예산을 정해두는 게 중요합니다.
        </p>
        <ul className='mb-3 list-disc space-y-1 pl-5'>
          <li><strong>가챠폰 1회</strong> — 500원~1,500원</li>
          <li><strong>이치방쿠지 1장</strong> — 8,000원~12,000원</li>
          <li><strong>랜덤박스 1개</strong> — 12,000원~35,000원</li>
          <li><strong>이치방쿠지 1박스(컴플리트)</strong> — 70만원~100만원</li>
        </ul>
        <p className='leading-relaxed'>
          단순 체험이 목적이라면 가챠폰 3~5회 예산(약 3,000원~7,500원)으로 시작해 보세요.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>인기 브랜드 및 IP</h2>
        <ul className='list-disc space-y-2 pl-5 leading-relaxed'>
          <li><strong>반다이(BANDAI)</strong> — 건담, 원피스, 드래곤볼, 귀멸의 칼날 등 주요 IP를 폭넓게 커버합니다.</li>
          <li><strong>굿스마일컴퍼니(Good Smile Company)</strong> — 넨도로이드 시리즈로 유명하며, 고퀄리티 피규어를 주로 다룹니다.</li>
          <li><strong>타카라토미아츠(TAKARA TOMY A.R.T.S)</strong> — 저가형 가챠폰을 대량 공급하는 브랜드로, 동물·음식 미니어처 시리즈가 많습니다.</li>
          <li><strong>팝마트(POP MART)</strong> — 라부부, 스컬판다가 대표 캐릭터인 랜덤박스 브랜드입니다.</li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>자주 하는 질문</h2>
        <dl className='space-y-4'>
          <div>
            <dt className='font-medium'>확률을 조작할 수 있나요?</dt>
            <dd className='mt-1 text-sm leading-relaxed text-gray-600'>
              가챠폰은 완전 랜덤이라 조작 방법은 없습니다. 이치방쿠지는 잔여 등급이 표시되므로
              원하는 등급이 남아있는지 확인 후 도전하는 방식으로 효율을 높일 수 있습니다.
            </dd>
          </div>
          <div>
            <dt className='font-medium'>중복이 나왔을 때 환불되나요?</dt>
            <dd className='mt-1 text-sm leading-relaxed text-gray-600'>
              기본적으로 환불은 불가합니다. 중고 거래 커뮤니티나 SNS 교환 그룹을 이용하는 것이
              일반적입니다.
            </dd>
          </div>
        </dl>
      </section>

      <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
        <p className='mb-2 font-semibold'>관련 가이드</p>
        <ul className='space-y-1'>
          <li><Link href='/guide/ichiban-kuji' className='text-blue-600 hover:underline'>이치방쿠지 구매 방법 →</Link></li>
          <li><Link href='/guide/capsule-toy-brands' className='text-blue-600 hover:underline'>캡슐토이 브랜드 비교 →</Link></li>
          <li><Link href='/' className='text-blue-600 hover:underline'>가까운 매장 찾기 →</Link></li>
        </ul>
      </div>
    </main>
  );
}
