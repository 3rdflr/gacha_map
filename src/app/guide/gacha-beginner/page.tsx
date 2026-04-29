import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '가챠 입문 가이드 — 종류·가격·구매 방법 총정리',
  description:
    '처음 가챠를 시작하는 분을 위한 가이드. 가챠폰·캡슐토이·이치방쿠지의 차이, 가격대, 매장에서 실제로 구매하는 방법까지 단계별로 설명합니다.',
  alternates: { canonical: 'https://gachamap.vercel.app/guide/gacha-beginner' },
};

export default function GachaBeginnerGuide() {
  return (
    <main className='mx-auto max-w-[720px] px-4 py-10 text-gray-800'>
      <nav className='mb-4 text-sm text-gray-500'>
        <Link href='/' className='hover:underline'>홈</Link> /{' '}
        <span className='text-gray-700'>가챠 입문 가이드</span>
      </nav>

      <h1 className='mb-3 text-2xl font-bold'>가챠 입문 가이드 — 종류·가격·구매 방법 총정리</h1>
      <p className='mb-6 text-sm text-gray-500'>최종 업데이트: 2026년 4월</p>

      <p className='mb-6 leading-relaxed'>
        애니메이션·게임 굿즈에 관심을 가지면 한 번쯤 마주치게 되는 단어가 바로 <strong>가챠</strong>,
        <strong> 캡슐토이</strong>, <strong>이치방쿠지</strong>입니다. 모두 &ldquo;랜덤 요소가 포함된 굿즈
        구매 방식&rdquo;이라는 공통점이 있지만, 가격대·당첨 구조·취급 매장이 조금씩 다릅니다. 이 글에서는
        가챠를 처음 접하는 분을 위해 용어 정리부터 매장에서 실제로 어떻게 구매하는지까지 한 번에
        정리해 드리겠습니다.
      </p>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>가챠란 무엇인가요?</h2>
        <p className='mb-3 leading-relaxed'>
          <strong>가챠(ガチャ)</strong>의 정확한 명칭은 <strong>가챠폰(ガチャポン)</strong> 또는
          <strong> 가샤폰(ガシャポン)</strong>입니다. 일본어 의성어 &ldquo;가챠가챠&rdquo;(손잡이를 돌리는 소리)에서
          따온 이름으로, 동전을 넣고 손잡이를 돌리면 캡슐 하나가 떨어지는 자판기 방식의 굿즈
          판매기를 가리킵니다. 캡슐 안에는 보통 키링·미니 피규어·뱃지·마스코트 같은 작은 굿즈가
          들어 있습니다.
        </p>
        <p className='leading-relaxed'>
          한 회 가격은 보통 <strong>500원~5,000원</strong> 사이로, 일반 가챠는 1,000~2,000원, 정교한
          캡슐토이는 3,000~5,000원대가 많습니다. 시리즈마다 보통 4~6종의 라인업이 있으며, 어떤
          상품이 나올지는 뽑기 전까지 알 수 없습니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>가챠·캡슐토이·이치방쿠지의 차이</h2>
        <table className='mb-3 w-full border-collapse text-sm'>
          <thead>
            <tr className='border-b bg-gray-50'>
              <th className='p-2 text-left'>구분</th>
              <th className='p-2 text-left'>가격대</th>
              <th className='p-2 text-left'>당첨 구조</th>
              <th className='p-2 text-left'>대표 브랜드</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <td className='p-2'>가챠폰</td>
              <td className='p-2'>500~2,000원</td>
              <td className='p-2'>완전 랜덤</td>
              <td className='p-2'>반다이, 타카라토미</td>
            </tr>
            <tr className='border-b'>
              <td className='p-2'>캡슐토이</td>
              <td className='p-2'>3,000~5,000원</td>
              <td className='p-2'>완전 랜덤(시리즈 4~6종)</td>
              <td className='p-2'>굿스마일, 메가하우스</td>
            </tr>
            <tr>
              <td className='p-2'>이치방쿠지</td>
              <td className='p-2'>8,000~12,000원/장</td>
              <td className='p-2'>등급제(중복 없음)</td>
              <td className='p-2'>반프레스토</td>
            </tr>
          </tbody>
        </table>
        <p className='leading-relaxed'>
          가장 큰 차이는 <strong>중복 가능성</strong>입니다. 가챠와 캡슐토이는 같은 상품이 여러 번 나올
          수 있어 원하는 라인업을 모두 모으려면 운이 따라줘야 합니다. 반면 이치방쿠지는 매장에 비치된
          티켓 묶음에서 한 장씩 뽑는 방식이라, 한 묶음을 다 사면 모든 등급이 한 번씩 나옵니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>매장에서 가챠 구매하는 방법</h2>
        <ol className='list-decimal space-y-2 pl-5 leading-relaxed'>
          <li>
            <strong>매장 위치 확인.</strong> <Link href='/' className='text-blue-600 hover:underline'>
            가챠 지도</Link>에서 가까운 매장을 찾고, 영업시간을 확인하세요. 대형 매장은 주말 오후가
            가장 붐빕니다.
          </li>
          <li>
            <strong>현금/동전 준비.</strong> 가챠폰 자체는 동전 투입식이 많아 100원·500원 동전이
            필수입니다. 매장에 환전기가 있는 경우가 많지만, 줄 서야 할 수 있어 미리 챙겨가면 편합니다.
          </li>
          <li>
            <strong>라인업 사진 촬영.</strong> 손잡이를 돌리기 전, 자판기 상단의 라인업 사진과 가격을
            먼저 확인하세요. 같은 캐릭터라도 다른 시리즈가 옆 자판기에 있는 경우가 많습니다.
          </li>
          <li>
            <strong>동전 투입 후 손잡이 돌리기.</strong> 손잡이가 끝까지 돌아가지 않으면 동전이
            덜 들어간 것이니 다시 한 번 확인하세요.
          </li>
          <li>
            <strong>캡슐 회수 후 확인.</strong> 캡슐 안에는 굿즈와 함께 작은 안내지가 들어 있어 어떤
            상품인지 바로 알 수 있습니다. 매장에 따라 빈 캡슐 회수함이 따로 있으니 분리 배출 부탁드립니다.
          </li>
        </ol>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>예산은 얼마나 잡아야 할까?</h2>
        <p className='mb-3 leading-relaxed'>
          처음에는 <strong>한 시리즈 = 6종 라인업 기준 1만~2만 원</strong>으로 생각하면 적당합니다.
          한두 번 시도해서 원하는 캐릭터가 안 나오면 거기서 멈추는 것을 추천드립니다. 한 시리즈를
          전종 모으려면 평균 8~12회는 시도해야 하므로 캡슐토이 기준 4~6만 원이 들 수 있습니다.
        </p>
        <p className='leading-relaxed'>
          전종 컴플리트가 목표라면 <strong>이치방쿠지 한 박스 구매</strong>가 더 합리적인 경우도
          있습니다. 단, 박스 단위 구매는 보통 8~10만 원 이상이라 매장에 미리 문의해 박스 잔여 여부를
          확인해야 합니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>자주 묻는 질문</h2>
        <div className='mb-4'>
          <h3 className='mb-1 font-semibold'>편의점에서도 가챠를 살 수 있나요?</h3>
          <p className='leading-relaxed'>
            일부 편의점·다이소에 소형 가챠폰이 비치되어 있지만 라인업이 제한적입니다. 본격적으로
            컬렉션을 모으고 싶다면 전문 매장을 방문하는 것이 좋습니다.
          </p>
        </div>
        <div className='mb-4'>
          <h3 className='mb-1 font-semibold'>중복이 나왔어요. 교환할 수 있나요?</h3>
          <p className='leading-relaxed'>
            가챠 특성상 매장 내 교환·환불은 불가능합니다. 다만 트위터·중고나라·당근 등에서 같은
            시리즈를 모으는 분들과 교환 거래를 하시는 분들이 많습니다.
          </p>
        </div>
        <div className='mb-4'>
          <h3 className='mb-1 font-semibold'>일본 정품 여부는 어떻게 확인하나요?</h3>
          <p className='leading-relaxed'>
            정식 수입품은 캡슐 안 안내지에 한국어 설명이 함께 인쇄되어 있고, 매장 라인업 사진에 정식
            라이선스 마크가 표기됩니다. 라이선스가 명확하지 않은 매장은 피하시는 것이 안전합니다.
          </p>
        </div>
      </section>

      <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
        <p className='mb-2 font-semibold'>관련 가이드</p>
        <ul className='space-y-1'>
          <li>
            <Link href='/guide/ichiban-kuji' className='text-blue-600 hover:underline'>
              이치방쿠지 구매 방법 →
            </Link>
          </li>
          <li>
            <Link href='/guide/capsule-toy-brands' className='text-blue-600 hover:underline'>
              캡슐토이 브랜드 비교 →
            </Link>
          </li>
          <li>
            <Link href='/' className='text-blue-600 hover:underline'>
              가까운 가챠 매장 찾기 →
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
