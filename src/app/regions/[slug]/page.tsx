import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getVerifiedShops } from '@/lib/supabase';
import { Shop } from '@/types/db';

export const revalidate = 3600;

interface RegionDef {
  slug: string;
  name: string;
  longName: string;
  intro: string;
  // 좌표 박스 (lat min/max, lng min/max)
  bbox: { minLat: number; maxLat: number; minLng: number; maxLng: number };
  access: string;
  nearby: string;
}

const REGIONS: RegionDef[] = [
  {
    slug: 'hongdae',
    name: '홍대',
    longName: '홍대 가챠·쿠지 매장 가이드',
    intro:
      '홍대 일대는 서울에서 가챠·이치방쿠지 매장이 가장 밀집된 지역입니다. 애니메이트 홍대점을 중심으로 AK&·서브컬처 전문샵이 모여 있어, 한 번 방문으로 여러 매장을 둘러보기 좋습니다. 신규 회차 발매일에는 줄을 서야 하는 경우가 많으니 평일 낮 시간이 비교적 한산합니다.',
    bbox: { minLat: 37.546, maxLat: 37.564, minLng: 126.916, maxLng: 126.935 },
    access: '지하철 2호선 홍대입구역 9번 출구에서 도보 5~10분. 공항철도·경의중앙선도 동일 역사 이용 가능합니다.',
    nearby: '연남동 카페 거리, 합정역 메세나폴리스, 망원시장. 매장 투어 후 식사·카페 일정을 함께 잡기 좋습니다.',
  },
  {
    slug: 'gangnam',
    name: '강남',
    longName: '강남·신논현 가챠 매장 가이드',
    intro:
      '강남역·신논현역 일대는 직장인 수요와 관광 수요가 함께 있는 상권입니다. 대형 캡슐토이 매장과 백화점 내 굿즈 코너가 함께 있어 짧은 시간에 효율적으로 둘러볼 수 있습니다. 강남대로보다는 뒷골목 매장에 가챠폰 자판기가 모여 있는 경우가 많습니다.',
    bbox: { minLat: 37.495, maxLat: 37.508, minLng: 127.022, maxLng: 127.040 },
    access: '지하철 2호선 강남역, 9호선 신논현역에서 도보 3~10분.',
    nearby: '신세계백화점 강남점, 코엑스, 가로수길.',
  },
  {
    slug: 'sinchon',
    name: '신촌·이대',
    longName: '신촌·이대 가챠 매장 가이드',
    intro:
      '대학가 특성상 합리적인 가격대의 가챠폰 자판기가 곳곳에 흩어져 있는 지역입니다. 본격적인 컬렉터용 매장보다는 1,000~2,000원대 일반 가챠가 많아, 가볍게 즐기기에 적합합니다. 유플렉스·현대백화점 신촌점 지하 코너를 함께 둘러보세요.',
    bbox: { minLat: 37.554, maxLat: 37.563, minLng: 126.935, maxLng: 126.948 },
    access: '지하철 2호선 신촌역·이대역에서 도보 5~15분.',
    nearby: '연세로 차 없는 거리, 이화여대 캠퍼스, 신촌 기차역.',
  },
  {
    slug: 'myeongdong',
    name: '명동',
    longName: '명동 가챠·캡슐토이 매장 가이드',
    intro:
      '명동은 외국인 관광객 비율이 높아 캐릭터 굿즈·기념품 성격이 강한 캡슐토이가 많은 지역입니다. 한국 캐릭터(라인프렌즈·카카오프렌즈) 캡슐토이도 함께 즐길 수 있고, 면세점 인근의 대형 굿즈샵에서 한정 라인업을 만날 수 있습니다.',
    bbox: { minLat: 37.560, maxLat: 37.567, minLng: 126.978, maxLng: 126.990 },
    access: '지하철 4호선 명동역, 2호선 을지로입구역에서 도보 5분.',
    nearby: '명동성당, 남산타워 케이블카, 롯데백화점 본점.',
  },
  {
    slug: 'busan',
    name: '부산',
    longName: '부산 가챠·쿠지 매장 가이드',
    intro:
      '부산은 서면·남포동 두 축이 가챠샵의 중심입니다. 서면은 직장인·대학생 수요로 신상 회차 회전율이 빠르고, 남포동은 광복로 거리 인근에 가챠폰 자판기가 다수 있습니다. 광역시 단위에서 서울 다음으로 매장 밀도가 높은 도시입니다.',
    bbox: { minLat: 35.090, maxLat: 35.165, minLng: 129.020, maxLng: 129.110 },
    access: '부산 지하철 1호선 서면·남포동역.',
    nearby: '부산타워, BIFF 광장, 자갈치 시장, 광안리 해수욕장.',
  },
];

function findRegion(slug: string) {
  return REGIONS.find((r) => r.slug === slug);
}

function filterShopsInBbox(shops: Shop[], bbox: RegionDef['bbox']) {
  return shops.filter(
    (s) =>
      s.latitude >= bbox.minLat &&
      s.latitude <= bbox.maxLat &&
      s.longitude >= bbox.minLng &&
      s.longitude <= bbox.maxLng,
  );
}

export async function generateStaticParams() {
  return REGIONS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const region = findRegion(params.slug);
  if (!region) return {};
  return {
    title: `${region.name} 가챠·쿠지 매장 모음 | 가챠 지도`,
    description: region.intro.slice(0, 140),
    alternates: { canonical: `https://gachamap.vercel.app/regions/${region.slug}` },
  };
}

export default async function RegionPage({ params }: { params: { slug: string } }) {
  const region = findRegion(params.slug);
  if (!region) return notFound();

  const allShops = await getVerifiedShops();
  const shops = filterShopsInBbox(allShops, region.bbox);

  return (
    <main className='mx-auto max-w-[820px] px-4 py-10 text-gray-800'>
      <nav className='mb-4 text-sm text-gray-500'>
        <Link href='/' className='hover:underline'>홈</Link> /{' '}
        <span className='text-gray-700'>{region.name}</span>
      </nav>

      <h1 className='mb-3 text-2xl font-bold'>{region.longName}</h1>
      <p className='mb-6 leading-relaxed'>{region.intro}</p>

      <section className='mb-10'>
        <h2 className='mb-3 text-xl font-semibold'>{region.name}의 가챠·쿠지 매장 ({shops.length}곳)</h2>
        {shops.length === 0 ? (
          <p className='leading-relaxed text-gray-600'>
            현재 등록된 매장이 없습니다. 인근 지역의 매장은{' '}
            <Link href='/' className='text-blue-600 hover:underline'>지도</Link>에서 확인하실 수 있습니다.
          </p>
        ) : (
          <ul className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            {shops.map((shop) => (
              <li key={shop.id} className='rounded-lg border border-gray-200 p-4 hover:bg-gray-50'>
                <Link href={`/shops/${shop.id}`} className='block'>
                  <div className='mb-1 font-semibold'>{shop.name}</div>
                  <p className='mb-1 text-sm text-gray-600'>{shop.address_full}</p>
                  {shop.categories && shop.categories.length > 0 && (
                    <p className='text-xs text-gray-500'>취급: {shop.categories.join(' · ')}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className='mb-10'>
        <h2 className='mb-3 text-xl font-semibold'>가는 방법</h2>
        <p className='leading-relaxed'>{region.access}</p>
      </section>

      <section className='mb-10'>
        <h2 className='mb-3 text-xl font-semibold'>주변 함께 둘러볼 곳</h2>
        <p className='leading-relaxed'>{region.nearby}</p>
      </section>

      <section className='mb-10'>
        <h2 className='mb-3 text-xl font-semibold'>방문 전 알아두면 좋은 점</h2>
        <ul className='list-disc space-y-2 pl-5 leading-relaxed'>
          <li>신규 이치방쿠지 회차는 발매 당일 매진되는 경우가 많으니 매장 SNS를 미리 확인하세요.</li>
          <li>가챠폰 자판기는 동전 투입식이 많아 100원·500원 동전을 미리 챙기는 것이 편합니다.</li>
          <li>매장에 따라 박스 단위 구매·예약을 받지 않는 곳이 있어 사전 문의를 권장합니다.</li>
        </ul>
      </section>

      <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
        <p className='mb-2 font-semibold'>다른 지역 둘러보기</p>
        <ul className='grid grid-cols-2 gap-2'>
          {REGIONS.filter((r) => r.slug !== region.slug).map((r) => (
            <li key={r.slug}>
              <Link href={`/regions/${r.slug}`} className='text-blue-600 hover:underline'>
                {r.name} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

