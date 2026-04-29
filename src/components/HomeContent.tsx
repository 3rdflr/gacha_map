import Link from 'next/link';
import { Shop } from '@/types/db';

interface HomeContentProps {
  shops: Shop[];
}

const REGIONS = [
  { slug: 'hongdae', name: '홍대', desc: '서울 가챠·쿠지 1번지. 애니메이트 홍대점·AK& 등 핵심 매장 밀집' },
  { slug: 'gangnam', name: '강남', desc: '강남역·신논현 일대 캡슐토이·이치방쿠지 매장' },
  { slug: 'sinchon', name: '신촌·이대', desc: '대학가 가챠샵, 합리적인 가격대 라인업' },
  { slug: 'myeongdong', name: '명동', desc: '관광객 대상 캡슐토이·관광 굿즈 중심지' },
  { slug: 'busan', name: '부산', desc: '서면·남포동 가챠·쿠지 매장 모음' },
];

const GUIDES = [
  { slug: 'gacha-beginner', title: '가챠 입문 가이드', desc: '처음 가챠를 시작하는 분을 위한 종류·가격·구매법 총정리' },
  { slug: 'ichiban-kuji', title: '이치방쿠지 구매 방법', desc: '제일복권 등급·확률·매장에서 사는 법' },
  { slug: 'capsule-toy-brands', title: '캡슐토이 브랜드 비교', desc: '반다이·굿스마일·코토부키야 등 주요 브랜드 특징' },
];

export default function HomeContent({ shops }: HomeContentProps) {
  const previewShops = shops.slice(0, 12);
  const totalShops = shops.length;

  return (
    <div className='mx-auto max-w-[960px] px-4 py-10 text-gray-800'>
      <section className='mb-10'>
        <h1 className='mb-3 text-2xl font-bold'>전국 가챠·쿠지·캡슐토이 매장 지도</h1>
        <p className='mb-3 leading-relaxed'>
          <strong>가챠 지도</strong>는 전국에 흩어져 있는 가챠폰(캡슐 자판기), 이치방쿠지(제일복권),
          캡슐토이 매장을 한 화면에서 찾아볼 수 있도록 만든 무료 정보 서비스입니다. 홍대·강남·신촌·명동
          같은 서울 핵심 상권부터 부산·대구 등 지방 매장까지, 현재까지 등록된{' '}
          <strong>{totalShops.toLocaleString()}곳 이상의 매장</strong>을 지도와 리스트 두 가지 방식으로
          확인할 수 있습니다.
        </p>
        <p className='leading-relaxed'>
          가챠 입문자라면 어떤 브랜드가 어떤 매장에 있는지, 신규 출시 라인업이 어디에서 풀렸는지
          파악하기 어렵습니다. 본 서비스는 매장 위치, 취급 카테고리(가챠 / 쿠지 / 굿즈), 영업 정보,
          최근 업데이트 시점을 한눈에 정리해 가챠 매장 탐색에 드는 시간을 크게 줄여 줍니다.
        </p>
      </section>

      <section className='mb-10'>
        <h2 className='mb-4 text-xl font-semibold'>지역별로 둘러보기</h2>
        <p className='mb-4 leading-relaxed'>
          가챠샵은 특정 상권에 집중적으로 모여 있는 경향이 강합니다. 지역 페이지에서는 해당 동네의
          분위기, 동선, 함께 둘러볼 만한 매장을 함께 정리해두었습니다.
        </p>
        <ul className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {REGIONS.map((r) => (
            <li key={r.slug} className='rounded-lg border border-gray-200 p-4 hover:bg-gray-50'>
              <Link href={`/regions/${r.slug}`} className='block'>
                <div className='mb-1 font-semibold'>{r.name} 가챠 매장</div>
                <p className='text-sm text-gray-600'>{r.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className='mb-10'>
        <h2 className='mb-4 text-xl font-semibold'>가챠·쿠지 가이드</h2>
        <p className='mb-4 leading-relaxed'>
          처음 가챠를 시작하거나 이치방쿠지를 사보고 싶은 분을 위한 입문 가이드를 준비했습니다.
          용어부터 가격대, 매장에서 실제로 어떻게 구매하는지까지 단계별로 설명합니다.
        </p>
        <ul className='space-y-3'>
          {GUIDES.map((g) => (
            <li key={g.slug} className='rounded-lg border border-gray-200 p-4 hover:bg-gray-50'>
              <Link href={`/guide/${g.slug}`} className='block'>
                <div className='mb-1 font-semibold'>{g.title}</div>
                <p className='text-sm text-gray-600'>{g.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className='mb-10'>
        <h2 className='mb-4 text-xl font-semibold'>최근 등록된 매장</h2>
        <p className='mb-4 leading-relaxed'>
          아래는 최근 등록·검증된 매장 일부입니다. 전체 목록은 지도에서 핀을 통해 확인할 수 있고,
          개별 매장의 상세 정보(영업시간·취급 브랜드·연락처)는 매장 카드를 클릭해 들어가실 수
          있습니다.
        </p>
        <ul className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {previewShops.map((shop) => (
            <li
              key={shop.id}
              className='rounded-lg border border-gray-200 p-4 hover:bg-gray-50'
            >
              <Link href={`/shops/${shop.id}`} className='block'>
                <div className='mb-1 font-semibold'>{shop.name}</div>
                <p className='mb-1 text-sm text-gray-600'>{shop.address_full}</p>
                {shop.categories && shop.categories.length > 0 && (
                  <p className='text-xs text-gray-500'>
                    취급: {shop.categories.join(' · ')}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className='mb-10'>
        <h2 className='mb-4 text-xl font-semibold'>자주 묻는 질문</h2>

        <div className='mb-4'>
          <h3 className='mb-1 font-semibold'>가챠와 쿠지는 어떻게 다른가요?</h3>
          <p className='leading-relaxed'>
            가챠(가챠폰)는 동전을 넣고 손잡이를 돌려 무작위 캡슐을 뽑는 자판기 방식이고,
            이치방쿠지(제일복권)는 모든 티켓이 당첨인 복권 방식 굿즈 판매입니다. 가챠는 같은
            상품이 중복으로 나올 수 있지만, 쿠지는 미리 정해진 등급별 상품이 매번 다른 티켓에
            할당돼 있어 중복 없이 받을 수 있다는 차이가 있습니다.
          </p>
        </div>

        <div className='mb-4'>
          <h3 className='mb-1 font-semibold'>매장 정보는 정확한가요?</h3>
          <p className='leading-relaxed'>
            공개된 매장 정보를 기반으로 운영자가 직접 검증한 매장만 지도에 표시하고 있습니다.
            다만 실제 운영 시간이나 취급 라인업은 변동이 잦으니 방문 전 매장에 직접 확인하는 것을
            권장합니다.
          </p>
        </div>

        <div className='mb-4'>
          <h3 className='mb-1 font-semibold'>지도에 매장이 빠져 있어요. 추가할 수 있나요?</h3>
          <p className='leading-relaxed'>
            지도 우측 하단의 매장 제보 버튼으로 신규 매장을 알려주시면, 운영자 확인 후 가능한 빨리
            반영하고 있습니다.
          </p>
        </div>

        <p className='mt-4'>
          <Link href='/faq' className='text-blue-600 hover:underline'>
            더 많은 질문 보기 →
          </Link>
        </p>
      </section>

      <section>
        <h2 className='mb-3 text-xl font-semibold'>본 서비스에 대해</h2>
        <p className='leading-relaxed'>
          가챠 지도는 가챠·쿠지·캡슐토이 시장에 관심을 가진 개인이 직접 매장 정보를 수집·검증해
          무료로 제공하는 비공식 정보 서비스입니다. 매장 운영사·브랜드사와는 직접적인 관련이 없으며,
          모든 콘텐츠는 정보 제공 목적으로 작성되었습니다. 서비스 소개와 데이터 출처에 관한 내용은{' '}
          <Link href='/about' className='text-blue-600 hover:underline'>
            서비스 소개
          </Link>{' '}
          페이지에서 확인하실 수 있습니다.
        </p>
      </section>
    </div>
  );
}
