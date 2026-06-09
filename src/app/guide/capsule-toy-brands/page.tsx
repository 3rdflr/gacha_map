import { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '캡슐토이 브랜드 비교 — 반다이·굿스마일·타카라토미·팝마트',
  description:
    '캡슐토이·가챠폰 주요 브랜드(반다이, 굿스마일컴퍼니, 타카라토미아츠, 팝마트)를 가격대, 퀄리티, 취급 IP 기준으로 비교합니다.',
  alternates: { canonical: 'https://gachamap.vercel.app/guide/capsule-toy-brands' },
};

export default function CapsuleToyBrandsGuide() {
  return (
    <main className='mx-auto max-w-[720px] px-4 py-10 text-gray-800'>
      <nav className='mb-4 text-sm text-gray-500'>
        <Link href='/' className='hover:underline'>홈</Link> /{' '}
        <span className='text-gray-700'>캡슐토이 브랜드 비교</span>
      </nav>

      <h1 className='mb-3 text-2xl font-bold'>캡슐토이 브랜드 비교 — 반다이·굿스마일·타카라토미·팝마트</h1>
      <p className='mb-6 text-sm text-gray-500'>최종 업데이트: 2026년 4월</p>

      <p className='mb-6 leading-relaxed'>
        국내 가챠 매장에서 볼 수 있는 브랜드는 크게 일본계 완구 브랜드와 한국·중국계 랜덤박스
        브랜드로 나뉩니다. 브랜드마다 가격대, 퀄리티, 취급 IP가 달라 처음 선택할 때 헷갈릴 수
        있습니다. 이 글에서는 주요 4개 브랜드를 항목별로 비교합니다.
      </p>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>반다이(BANDAI) — 국내 최다 IP 보유</h2>
        <p className='mb-3 leading-relaxed'>
          반다이남코의 완구 브랜드 반다이는 국내 가챠 시장에서 가장 높은 점유율을 차지합니다.
          원피스, 드래곤볼, 귀멸의 칼날, 건담 등 메이저 애니메이션 IP를 독점적으로 보유하고
          있어 팬층이 두텁습니다.
        </p>
        <ul className='mb-3 list-disc space-y-1 pl-5'>
          <li><strong>가챠폰 가격</strong>: 1회 500원~1,000원</li>
          <li><strong>이치방쿠지</strong>: 반다이 자회사 반프레스토 운영, 티켓당 8,000원~12,000원</li>
          <li><strong>퀄리티</strong>: 입문용 가챠폰은 단색 성형품이 많고, 이치방쿠지 상위 등급은 고퀄리티</li>
          <li><strong>추천 대상</strong>: 특정 애니 IP 팬, 이치방쿠지 입문자</li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>굿스마일컴퍼니(Good Smile Company) — 고퀄리티 피규어</h2>
        <p className='mb-3 leading-relaxed'>
          넨도로이드(Nendoroid)와 피그마(figma) 시리즈로 세계적으로 유명한 일본 피규어 브랜드입니다.
          고퀄리티 도색과 섬세한 디테일로 수집가들에게 인기가 높습니다.
        </p>
        <ul className='mb-3 list-disc space-y-1 pl-5'>
          <li><strong>주요 시리즈</strong>: 넨도로이드 페티(Nendoroid Petit) — 미니 사이즈 가챠 버전</li>
          <li><strong>가격</strong>: 넨도로이드 페티 1회 1,000원~1,500원</li>
          <li><strong>퀄리티</strong>: 동가격대 최상급, 도색 완성품 제공</li>
          <li><strong>추천 대상</strong>: 고퀄리티 수집 목적, 선물용</li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>타카라토미아츠(TAKARA TOMY A.R.T.S) — 저가 대중형</h2>
        <p className='mb-3 leading-relaxed'>
          저가형 가챠폰을 대량 공급하는 브랜드로, 가격 대비 종류가 많습니다. 애니 IP보다는 동물,
          음식, 일상 소품 미니어처 시리즈가 강세입니다.
        </p>
        <ul className='mb-3 list-disc space-y-1 pl-5'>
          <li><strong>가챠폰 가격</strong>: 1회 300원~500원으로 최저가 수준</li>
          <li><strong>대표 시리즈</strong>: 동물 피규어, 미니 음식 모형, 마스코트 키링</li>
          <li><strong>퀄리티</strong>: 단색 성형품이 많고 도색은 제한적</li>
          <li><strong>추천 대상</strong>: 어린이, 캐주얼 수집가, 예산이 적은 입문자</li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>팝마트(POP MART) — 아트토이·랜덤박스</h2>
        <p className='mb-3 leading-relaxed'>
          중국 베이징에서 시작한 아트토이 브랜드로, 국내에도 단독 매장이 여럿 오픈했습니다.
          라부부(LABUBU), 스컬판다(SKULLPANDA), 몰리(MOLLY) 등 독자적인 캐릭터를 랜덤박스 형태로
          판매합니다.
        </p>
        <ul className='mb-3 list-disc space-y-1 pl-5'>
          <li><strong>랜덤박스 가격</strong>: 1개 12,000원~35,000원, 시크릿 에디션 별도</li>
          <li><strong>시크릿 확률</strong>: 약 1/144</li>
          <li><strong>퀄리티</strong>: 도색 완성품, 비닐 소재 소프트 피규어 계열</li>
          <li><strong>추천 대상</strong>: 아트토이 수집가, MZ세대, 인테리어 소품으로 활용하는 분</li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>브랜드 한눈에 비교</h2>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse text-sm'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border border-gray-200 px-3 py-2 text-left'>브랜드</th>
                <th className='border border-gray-200 px-3 py-2 text-left'>가격(1회)</th>
                <th className='border border-gray-200 px-3 py-2 text-left'>퀄리티</th>
                <th className='border border-gray-200 px-3 py-2 text-left'>주요 IP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border border-gray-200 px-3 py-2 font-medium'>반다이</td>
                <td className='border border-gray-200 px-3 py-2'>500~1,000원</td>
                <td className='border border-gray-200 px-3 py-2'>중~상</td>
                <td className='border border-gray-200 px-3 py-2'>원피스, 건담, 귀멸</td>
              </tr>
              <tr className='bg-gray-50'>
                <td className='border border-gray-200 px-3 py-2 font-medium'>굿스마일</td>
                <td className='border border-gray-200 px-3 py-2'>1,000~1,500원</td>
                <td className='border border-gray-200 px-3 py-2'>최상</td>
                <td className='border border-gray-200 px-3 py-2'>미쿠, 바이올렛 등</td>
              </tr>
              <tr>
                <td className='border border-gray-200 px-3 py-2 font-medium'>타카라토미</td>
                <td className='border border-gray-200 px-3 py-2'>300~500원</td>
                <td className='border border-gray-200 px-3 py-2'>중</td>
                <td className='border border-gray-200 px-3 py-2'>동물·음식 미니어처</td>
              </tr>
              <tr className='bg-gray-50'>
                <td className='border border-gray-200 px-3 py-2 font-medium'>팝마트</td>
                <td className='border border-gray-200 px-3 py-2'>12,000~35,000원</td>
                <td className='border border-gray-200 px-3 py-2'>상</td>
                <td className='border border-gray-200 px-3 py-2'>라부부, 몰리 등</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
        <p className='mb-2 font-semibold'>관련 가이드</p>
        <ul className='space-y-1'>
          <li><Link href='/guide/gacha-beginner' className='text-blue-600 hover:underline'>가챠 입문 가이드 →</Link></li>
          <li><Link href='/guide/ichiban-kuji' className='text-blue-600 hover:underline'>이치방쿠지 구매 방법 →</Link></li>
          <li><Link href='/' className='text-blue-600 hover:underline'>가까운 매장 찾기 →</Link></li>
        </ul>
      </div>
    </main>
  );
}
