import { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이치방쿠지(제일복권) 완전 가이드 — 구매 방법부터 등급까지',
  description:
    '이치방쿠지(제일복권) 구매 방법, 등급 구조(A~라스트원), 가격, 국내 구매처, 꿀팁까지 총정리. 쿠지 처음이라면 이 글 하나로 충분합니다.',
  alternates: { canonical: 'https://gachamap.vercel.app/guide/ichiban-kuji' },
};

export default function IchibanKujiGuide() {
  return (
    <main className='mx-auto max-w-[720px] px-4 py-10 text-gray-800'>
      <nav className='mb-4 text-sm text-gray-500'>
        <Link href='/' className='hover:underline'>홈</Link> /{' '}
        <span className='text-gray-700'>이치방쿠지 가이드</span>
      </nav>

      <h1 className='mb-3 text-2xl font-bold'>이치방쿠지(제일복권) 완전 가이드 — 구매 방법부터 등급까지</h1>
      <p className='mb-6 text-sm text-gray-500'>최종 업데이트: 2026년 4월</p>

      <p className='mb-6 leading-relaxed'>
        <strong>이치방쿠지(一番くじ)</strong>는 반다이남코가 운영하는 복권 방식 굿즈 판매 시스템입니다.
        정해진 박스 안에 A등~라스트원상까지 등급별 티켓이 들어 있고, 한 장 뽑을 때마다 상품을 받는
        구조입니다. 랜덤박스나 가챠폰과 달리 <strong>박스 전체 구성이 공개</strong>되어 있어 어떤
        상품이 남아 있는지 확인하면서 전략적으로 도전할 수 있습니다.
      </p>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>등급 구조 이해하기</h2>
        <p className='mb-3 leading-relaxed'>
          이치방쿠지는 티켓을 뽑으면 알파벳 등급이 적혀 있고, 그 등급에 해당하는 상품을 받는
          방식입니다. 일반적인 구성은 다음과 같습니다.
        </p>
        <ul className='mb-4 list-disc space-y-2 pl-5 leading-relaxed'>
          <li>
            <strong>A상(最高賞)</strong> — 박스에서 가장 퀄리티 높은 대형 피규어. 보통 1~2개만 들어
            있어 확률이 매우 낮습니다.
          </li>
          <li>
            <strong>B상·C상</strong> — A상 다음 등급으로 중형 피규어, 아크릴 스탠드, 캔뱃지 세트 등
            구성이 다양합니다. 박스마다 수량이 다릅니다.
          </li>
          <li>
            <strong>D상~F상(하위 등급)</strong> — 클리어 파일, 수건, 머그컵 등 비교적 가격이 낮은
            굿즈. 수량이 많아 뽑힐 확률이 높습니다.
          </li>
          <li>
            <strong>라스트원상(ラストワン賞)</strong> — 박스의 마지막 남은 티켓을 뽑은 사람에게
            주어지는 특별 상품. 보통 A상 피규어의 컬러 바리에이션 버전이며, 중고 시장에서 가장 높은
            가격에 거래됩니다.
          </li>
          <li>
            <strong>더블찬스상</strong> — 일부 회차에서 운영하는 응모형 경품. 꽝 티켓을 모아 응모하면
            추첨을 통해 추가 상품을 받을 수 있습니다.
          </li>
        </ul>
        <p className='leading-relaxed'>
          등급 수와 수량은 회차마다 다르므로, 도전 전에 공식 홈페이지나 매장 안내문에서 반드시
          확인하세요.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>가격과 비용 계산</h2>
        <p className='mb-3 leading-relaxed'>
          국내 이치방쿠지 가격은 일반적으로 <strong>장당 8,000원~12,000원</strong> 수준입니다.
          일본 현지가(보통 760엔~1,100엔)보다 환율·수입 마진이 더해져 비싸지만, 공식 수입사를 통해
          정품을 구매하는 것이 사후 보증 측면에서 안전합니다.
        </p>
        <ul className='mb-4 list-disc space-y-1 pl-5'>
          <li>1회 뽑기: 8,000원~12,000원</li>
          <li>박스 컴플리트(전 티켓 구매): 보통 70만원~120만원 (회차에 따라 상이)</li>
          <li>A상 단품 중고 거래가: 30,000원~150,000원 이상 (IP·회차 인기도에 따라 변동)</li>
        </ul>
        <p className='leading-relaxed'>
          전략적으로 접근하고 싶다면 <strong>잔여 티켓 수</strong>를 확인하고, 원하는 등급이 아직
          남아 있을 때 방문하는 방법이 효과적입니다. 많은 매장이 남은 등급과 수량을 칠판이나
          POP 안내판에 표시해 둡니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>국내 구매처</h2>
        <p className='mb-3 leading-relaxed'>
          이치방쿠지는 아무 매장에서나 살 수 있는 게 아닙니다. 반다이남코코리아 공식 파트너 매장에서만
          정식 취급합니다.
        </p>
        <ul className='mb-4 list-disc space-y-2 pl-5 leading-relaxed'>
          <li>
            <strong>애니메이트 코리아</strong> — 홍대, 강남, 신촌, 건대 등 주요 지점에서 최신 회차를
            정기적으로 입고합니다. 발매일에 맞춰 방문하면 신규 회차를 가장 먼저 만날 수 있습니다.
          </li>
          <li>
            <strong>서브컬처 전문 편집샵</strong> — 홍대, 신촌 골목의 독립 굿즈샵 일부에서 이전 회차
            재고를 할인 판매하는 경우가 있습니다.
          </li>
          <li>
            <strong>온라인 쇼핑몰</strong> — 스마트스토어·쿠팡 등에서도 판매하지만, 운송 중 파손
            위험과 정품 여부를 꼼꼼히 확인하세요. 공식 수입품인지 여부를 꼭 체크해야 합니다.
          </li>
        </ul>
        <p className='leading-relaxed'>
          가까운 이치방쿠지 취급 매장은{' '}
          <Link href='/' className='text-blue-600 hover:underline'>가챠 지도</Link>에서 카테고리
          필터를 '쿠지'로 설정해 찾을 수 있습니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>구매 흐름 — 처음 도전한다면</h2>
        <ol className='list-decimal space-y-3 pl-5 leading-relaxed'>
          <li>
            <strong>원하는 IP·회차 확인.</strong> 반다이남코 공식 SNS나 애니메이트 홈페이지에서
            현재 판매 중인 회차 목록을 확인합니다. 귀멸의 칼날, 드래곤볼, 원피스 등 IP별로
            거의 매달 신규 회차가 출시됩니다.
          </li>
          <li>
            <strong>매장 방문 전 잔여 등급 확인.</strong> 인기 매장에서 A상은 발매 당일 마감되는
            경우가 많습니다. SNS에서 해당 회차 해시태그를 검색하거나 매장에 전화로 잔여 현황을
            물어볼 수 있습니다.
          </li>
          <li>
            <strong>매장에서 티켓 뽑기.</strong> 직원에게 몇 장 뽑을지 말하면 뭉치에서 랜덤으로
            티켓을 꺼내줍니다. 직접 고르는 건 불가합니다.
          </li>
          <li>
            <strong>등급 확인 후 상품 수령.</strong> 뽑은 티켓의 등급을 직원이 확인하고 해당
            상품을 전달해줍니다. 대형 상품은 별도 박스 포장이 됩니다.
          </li>
          <li>
            <strong>중복 또는 원치 않는 등급은 교환 커뮤니티 활용.</strong> 카카오톡 오픈채팅,
            네이버 카페, 트위터/X에 이치방쿠지 교환 커뮤니티가 활성화되어 있습니다.
          </li>
        </ol>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>자주 하는 질문</h2>
        <dl className='space-y-4'>
          <div>
            <dt className='font-medium'>라스트원상을 노릴 수 있나요?</dt>
            <dd className='mt-1 text-sm leading-relaxed text-gray-600'>
              잔여 티켓 수가 1장 남았을 때 방문하면 확정으로 받을 수 있습니다. 단, 그 타이밍을
              맞추는 게 어렵고, 인기 회차는 마지막 티켓을 위해 많은 사람이 경쟁하기도 합니다.
            </dd>
          </div>
          <div>
            <dt className='font-medium'>일본 현지와 국내 제품이 다른가요?</dt>
            <dd className='mt-1 text-sm leading-relaxed text-gray-600'>
              상품 자체는 동일하지만, 일부 회차는 국내 미출시인 경우도 있습니다. 국내에서 판매되는
              제품은 반드시 한국어 안내 스티커가 부착되어 있습니다.
            </dd>
          </div>
          <div>
            <dt className='font-medium'>전 등급 컴플리트를 한 번에 사는 게 나을까요?</dt>
            <dd className='mt-1 text-sm leading-relaxed text-gray-600'>
              확실히 모든 상품을 받을 수 있지만, 비용이 70만원 이상으로 올라가고 원치 않는 등급
              상품도 포함됩니다. 원하는 등급이 1~2개라면 단품 뽑기 후 중고 거래로 구매하는 편이
              대부분 저렴합니다.
            </dd>
          </div>
        </dl>
      </section>

      <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
        <p className='mb-2 font-semibold'>관련 가이드</p>
        <ul className='space-y-1'>
          <li><Link href='/guide/gacha-beginner' className='text-blue-600 hover:underline'>가챠 입문 가이드 →</Link></li>
          <li><Link href='/guide/capsule-toy-brands' className='text-blue-600 hover:underline'>캡슐토이 브랜드 비교 →</Link></li>
          <li><Link href='/' className='text-blue-600 hover:underline'>가까운 매장 찾기 →</Link></li>
        </ul>
      </div>
    </main>
  );
}
