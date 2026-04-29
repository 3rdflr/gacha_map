import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '캡슐토이 브랜드 비교 — 반다이·굿스마일·코토부키야·메가하우스',
  description:
    '국내에서 만날 수 있는 주요 캡슐토이/가챠 브랜드의 특징·가격대·인기 시리즈를 한눈에 비교했습니다. 어떤 브랜드가 어떤 매장에 있는지도 함께 안내합니다.',
  alternates: { canonical: 'https://gachamap.vercel.app/guide/capsule-toy-brands' },
};

export default function BrandComparisonGuide() {
  return (
    <main className='mx-auto max-w-[720px] px-4 py-10 text-gray-800'>
      <nav className='mb-4 text-sm text-gray-500'>
        <Link href='/' className='hover:underline'>홈</Link> /{' '}
        <span className='text-gray-700'>캡슐토이 브랜드 비교</span>
      </nav>

      <h1 className='mb-3 text-2xl font-bold'>캡슐토이 브랜드 비교 — 반다이·굿스마일·코토부키야·메가하우스</h1>
      <p className='mb-6 text-sm text-gray-500'>최종 업데이트: 2026년 4월</p>

      <p className='mb-6 leading-relaxed'>
        가챠샵에 가면 같은 캐릭터의 캡슐토이가 여러 종류로 진열되어 있는 경우가 많습니다. 같은
        애니메이션이라도 어느 브랜드에서 만든 상품인지에 따라 퀄리티·가격·라인업 구성이 달라지기
        때문입니다. 이 글에서는 국내에서 자주 만날 수 있는 4대 캡슐토이/가챠 브랜드의 특징을 정리해
        드리겠습니다.
      </p>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>1. 반다이(BANDAI) / 가샤폰</h2>
        <p className='mb-3 leading-relaxed'>
          가챠 시장 점유율 1위 브랜드입니다. <strong>가샤폰(GASHAPON)</strong>이라는 자체 브랜드명으로
          캡슐토이를 운영하고 있고, 자판기 형태 가챠폰의 표준 규격(캡슐 사이즈·동전 투입구)도 사실상
          반다이가 정한 것이 업계 기준이 됐습니다.
        </p>
        <ul className='mb-3 list-disc space-y-1 pl-5'>
          <li><strong>가격대</strong>: 500원~2,000원 (소형) / 3,000~5,000원 (대형 캡슐토이)</li>
          <li><strong>대표 시리즈</strong>: HG가챠, 카비프린(귀멸의 칼날), 가샤폰 짱구, 디지몬 어드벤처</li>
          <li><strong>강점</strong>: 안정적인 퀄리티, 폭넓은 IP 라이선스(원피스·드래곤볼·건담)</li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>2. 굿스마일컴퍼니(Good Smile Company)</h2>
        <p className='mb-3 leading-relaxed'>
          넨도로이드·피그마로 유명한 일본 피규어 브랜드. 캡슐토이도 운영하지만 가챠샵에서는 주로
          <strong> 트레이딩 피규어</strong> 시리즈를 만날 수 있습니다. 라이센스 IP가 다양하고, 채색
          마감이 일반 가챠보다 한 단계 위라는 평이 많습니다.
        </p>
        <ul className='mb-3 list-disc space-y-1 pl-5'>
          <li><strong>가격대</strong>: 캡슐토이 4,000~6,000원 / 트레이딩 박스 1만 원대</li>
          <li><strong>대표 시리즈</strong>: 페이트 시리즈 캡슐토이, 호로요이 트레이딩 피규어</li>
          <li><strong>강점</strong>: 채색·디테일 우수, 컬렉터 선호도 높음</li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>3. 코토부키야(KOTOBUKIYA)</h2>
        <p className='mb-3 leading-relaxed'>
          프라모델 기반 브랜드로 더 잘 알려져 있지만, 미니 피규어 캡슐토이 라인업도 운영합니다.
          국내 가챠샵에서는 <strong>아크릴 스탠드</strong>·<strong>틴배지</strong> 형태로 자주
          만날 수 있고, 디자인이 간결한 편이라 데스크 데코용으로 인기입니다.
        </p>
        <ul className='mb-3 list-disc space-y-1 pl-5'>
          <li><strong>가격대</strong>: 2,000~4,000원</li>
          <li><strong>대표 시리즈</strong>: 메가미 디바이스 미니, 프레임암즈 걸 미니</li>
          <li><strong>강점</strong>: 메카닉·미소녀 IP에 강함</li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>4. 메가하우스(MEGAHOUSE)</h2>
        <p className='mb-3 leading-relaxed'>
          반다이남코 그룹 산하 브랜드로, 원피스·터치 등 클래식 IP의 정교한 캐릭터 굿즈에 강점이
          있습니다. <strong>러키쿠지·랜덤 트레이딩 박스</strong> 형태도 자주 발매하기 때문에
          이치방쿠지와 헷갈릴 수 있는데, 메가하우스 라인은 대부분 박스 단위 판매입니다.
        </p>
        <ul className='mb-3 list-disc space-y-1 pl-5'>
          <li><strong>가격대</strong>: 트레이딩 박스 1만 원대 / 단품 4,000~6,000원</li>
          <li><strong>대표 시리즈</strong>: P.O.P 미니, 룩업 시리즈</li>
          <li><strong>강점</strong>: 클래식 애니 IP의 디테일</li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>브랜드별로 매장이 다른가요?</h2>
        <p className='mb-3 leading-relaxed'>
          정식 라이선스 매장은 대부분 4개 브랜드를 모두 취급합니다. 다만 <strong>매장의 주력
          라인업</strong>은 다를 수 있어, 굿스마일·메가하우스 트레이딩 피규어를 많이 들여놓는 매장과
          반다이 가샤폰 자판기 위주 매장이 구분됩니다.
        </p>
        <p className='leading-relaxed'>
          어느 매장에서 어느 브랜드를 주로 취급하는지는 <Link href='/' className='text-blue-600 hover:underline'>
          가챠 지도</Link>의 매장 카드에 표시되는 &ldquo;취급 카테고리&rdquo;와 &ldquo;취급 브랜드&rdquo; 정보를 참고하세요.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>처음이라면 어떤 브랜드부터?</h2>
        <p className='leading-relaxed'>
          가성비·라인업 다양성을 고려하면 <strong>반다이 가샤폰</strong>으로 시작하는 것을 추천드립니다.
          가격대가 1,000~2,000원 선이라 입문 부담이 적고, 대중적인 IP가 많아 어떤 매장에서도 신상을
          쉽게 만날 수 있습니다. 컬렉터로 한 단계 올라가고 싶다면 굿스마일·메가하우스의 트레이딩
          피규어 박스를 구매해 본격적인 디스플레이를 시작해 보는 코스가 자연스럽습니다.
        </p>
      </section>

      <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
        <p className='mb-2 font-semibold'>관련 가이드</p>
        <ul className='space-y-1'>
          <li>
            <Link href='/guide/gacha-beginner' className='text-blue-600 hover:underline'>
              가챠 입문 가이드 →
            </Link>
          </li>
          <li>
            <Link href='/guide/ichiban-kuji' className='text-blue-600 hover:underline'>
              이치방쿠지 구매 방법 →
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
