import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '이치방쿠지(제일복권) 구매 방법 — 등급·확률·매장 가이드',
  description:
    '이치방쿠지(一番くじ, 제일복권)의 등급 구조, 당첨 확률, 한국에서 정식 매장에서 구매하는 방법을 정리했습니다. 신규 회차·가격대·박스 구매 팁 포함.',
  alternates: { canonical: 'https://gachamap.vercel.app/guide/ichiban-kuji' },
};

export default function IchibanKujiGuide() {
  return (
    <main className='mx-auto max-w-[720px] px-4 py-10 text-gray-800'>
      <nav className='mb-4 text-sm text-gray-500'>
        <Link href='/' className='hover:underline'>홈</Link> /{' '}
        <span className='text-gray-700'>이치방쿠지 구매 방법</span>
      </nav>

      <h1 className='mb-3 text-2xl font-bold'>이치방쿠지(제일복권) 구매 방법 — 등급·확률·매장 가이드</h1>
      <p className='mb-6 text-sm text-gray-500'>최종 업데이트: 2026년 4월</p>

      <p className='mb-6 leading-relaxed'>
        <strong>이치방쿠지(一番くじ)</strong>, 한국어로는 <strong>제일복권</strong>이라고 부르는 이
        시스템은 반다이남코의 자회사 <strong>반프레스토(BANPRESTO)</strong>가 운영하는 복권식 굿즈
        판매 방식입니다. 일본 애니메이션·게임 IP의 한정 굿즈를 등급별로 구성해, 매장에서 한 장씩 티켓을
        구매하면 정해진 상품이 즉시 지급되는 구조입니다. 이 글에서는 등급 구조, 한국 정식 매장에서
        구매하는 법, 박스 단위 구매 시 알아둘 점까지 정리했습니다.
      </p>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>이치방쿠지의 등급 구조</h2>
        <p className='mb-3 leading-relaxed'>
          한 회차 이치방쿠지는 보통 <strong>A상부터 라스트원상까지 7~8개 등급</strong>으로 구성됩니다.
          상위 등급일수록 큰 피규어·고급 굿즈가 배정되고, 하위 등급일수록 키링·뱃지·클리어파일 같은
          소품이 들어갑니다.
        </p>
        <ul className='mb-3 list-disc space-y-1 pl-5'>
          <li><strong>A상</strong> — 메인 캐릭터 대형 피규어 (회차당 1개)</li>
          <li><strong>B상</strong> — 서브 캐릭터 피규어 또는 비네트</li>
          <li><strong>C상</strong> — 미니 피규어, 콜드캐스트 모형</li>
          <li><strong>D~F상</strong> — 머그컵, 타올, 클리어파일, 아크릴 스탠드</li>
          <li><strong>G상</strong> — 미니 일러스트 카드, 뱃지, 키링</li>
          <li><strong>라스트원상</strong> — 마지막 티켓을 뽑은 사람에게 지급되는 한정 컬러 피규어</li>
        </ul>
        <p className='leading-relaxed'>
          <strong>더블 찬스 캠페인</strong>도 흔히 함께 진행됩니다. 박스에서 뽑은 티켓 번호 또는 응모권을
          이용해 추첨식으로 추가 굿즈를 받을 수 있는 이벤트입니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>당첨 확률은 어떻게 되나요?</h2>
        <p className='mb-3 leading-relaxed'>
          이치방쿠지는 가챠와 달리 <strong>박스 안 티켓 구성이 미리 정해져 있습니다</strong>. 예를 들어
          A상 1장, B상 2장, C상 3장처럼 등급별 수량이 고정되어 있고, 박스 한 통을 다 사면 모든 등급이
          &ldquo;최소 한 장씩&rdquo;은 나오게 설계되어 있습니다.
        </p>
        <p className='leading-relaxed'>
          따라서 한 박스에 평균 80장의 티켓이 들어 있다면, A상이 나올 확률은 약 1/80입니다. 초반에 누가
          이미 A상을 뽑아갔다면, 남은 티켓 안에 A상이 있을 확률은 0이 됩니다. 이 때문에 매장 도착 시
          <strong> 잔여 등급표</strong>를 먼저 확인하는 것이 중요합니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>한국에서 이치방쿠지 사는 법</h2>
        <ol className='list-decimal space-y-2 pl-5 leading-relaxed'>
          <li>
            <strong>정식 매장 확인.</strong> 반프레스토 정식 라이선스 매장(애니메이트, 일부 가챠 전문샵)에서
            취급합니다. <Link href='/' className='text-blue-600 hover:underline'>가챠 지도</Link>의 카테고리 필터에서
            &ldquo;쿠지&rdquo;로 좁혀 검색해 보세요.
          </li>
          <li>
            <strong>회차 발매일 체크.</strong> 신규 회차는 일본과 한국이 보통 1~2주 시차로 발매됩니다.
            인기 IP(귀멸의 칼날, 원피스, 주술회전 등)는 발매일 당일에 매진되는 경우가 많아 사전 예약을
            받는 매장도 있습니다.
          </li>
          <li>
            <strong>매장 도착 후 등급표 확인.</strong> 매장에 비치된 보드에 어떤 등급이 몇 장 남았는지가
            표시됩니다. 원하는 등급이 0인 경우 다른 매장을 알아보거나 다음 회차를 기다리는 편이
            합리적입니다.
          </li>
          <li>
            <strong>티켓 한 장씩 결제.</strong> 한 장당 가격은 회차에 따라 8,000원~12,000원 사이입니다.
            티켓을 뽑은 즉시 매장 직원이 해당 등급의 상품을 봉투에 담아 줍니다.
          </li>
          <li>
            <strong>라스트원상 노리기.</strong> 박스의 마지막 티켓을 뽑으면 라스트원상이 추가 지급됩니다.
            매장에 따라 마지막 1~5장만 따로 판매하거나 사전 예약을 받는 경우가 있습니다.
          </li>
        </ol>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>박스 단위 구매(박스깡)는 가능할까?</h2>
        <p className='mb-3 leading-relaxed'>
          한 박스(약 80장) 통째로 구매하면 모든 등급이 한 번씩은 나오기 때문에 컴플리트가 목표인
          분에게는 가장 안전한 방법입니다. 박스 가격은 보통 <strong>70만 원~100만 원 선</strong>이며,
          매장에 따라 박스 단위 판매를 받지 않는 경우도 많습니다. 사전에 매장에 전화로 문의하는 것이
          좋습니다.
        </p>
        <p className='leading-relaxed'>
          단, 박스깡 후 잔여 등급(D~G상)을 중고로 정리하는 분들도 많아, 정말 A상만 원하는 경우엔
          개별 구매 + 중고 거래 조합이 더 저렴할 수 있습니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>구매 시 주의사항</h2>
        <ul className='list-disc space-y-2 pl-5 leading-relaxed'>
          <li>
            <strong>정식 라이선스 여부 확인.</strong> 정식 매장은 반프레스토 로고와 회차 발매 포스터를
            매장에 비치합니다. 라이선스 없는 매장에서 판매되는 &ldquo;유사 쿠지&rdquo;는 품질·환불 문제 가능성이
            있습니다.
          </li>
          <li>
            <strong>중복 등급은 환불 불가.</strong> 같은 등급에서 같은 캐릭터가 나오는 경우가 있습니다.
            교환·환불은 매장에서 받지 않으니 SNS 교환 시장을 활용하세요.
          </li>
          <li>
            <strong>박스 잔여 정보는 실시간 변동.</strong> 인기 회차는 한 시간 사이에 등급이 빠질 수
            있어, 매장 도착 시점 기준으로 다시 확인해야 합니다.
          </li>
        </ul>
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
            <Link href='/guide/capsule-toy-brands' className='text-blue-600 hover:underline'>
              캡슐토이 브랜드 비교 →
            </Link>
          </li>
          <li>
            <Link href='/' className='text-blue-600 hover:underline'>
              가까운 쿠지 매장 찾기 →
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
