import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getShopById, getNearbyShops, supabase } from '@/lib/supabase';
import ShopImageGallery from '@/components/ShopImageGallery';
import ShopStaticMap from '@/components/ShopStaticMap';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const { data } = await supabase
    .from('shops')
    .select('id')
    .eq('is_verified', true)
    .limit(50);
  return (data ?? []).map((s: { id: number }) => ({ id: String(s.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const shop = await getShopById(Number(params.id));
  if (!shop) return {};
  const ogImage = shop.images && shop.images.length > 0 ? shop.images[0] : undefined;
  return {
    title: `${shop.name} — 가챠·쿠지 매장 정보`,
    description: `${shop.name} 매장 위치(${shop.address_full}), 취급 카테고리, 영업 정보를 확인하세요. ${
      shop.description ? shop.description.slice(0, 80) : ''
    }`,
    alternates: { canonical: `https://gachamap.vercel.app/shops/${shop.id}` },
    openGraph: ogImage
      ? {
          images: [{ url: ogImage }],
        }
      : undefined,
  };
}

export default async function ShopDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return notFound();

  const shop = await getShopById(id);
  if (!shop) return notFound();

  const nearby = await getNearbyShops(shop.latitude, shop.longitude, shop.id, 6);
  const hasImages = shop.images && Array.isArray(shop.images) && shop.images.length > 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: shop.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: shop.address_full,
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: shop.latitude,
      longitude: shop.longitude,
    },
    telephone: shop.phone ?? undefined,
    image: hasImages ? shop.images : undefined,
    url: `https://gachamap.vercel.app/shops/${shop.id}`,
  };

  return (
    <main className='mx-auto max-w-[820px] px-4 py-10 text-gray-800'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className='mb-4 text-sm text-gray-500'>
        <Link href='/' className='hover:underline'>
          홈
        </Link>{' '}
        / <span className='text-gray-700'>{shop.name}</span>
      </nav>

      {/* 매장 이미지 갤러리 */}
      {hasImages && <ShopImageGallery images={shop.images!} shopName={shop.name} />}

      <h1 className='mb-2 text-2xl font-bold'>{shop.name}</h1>
      <p className='mb-1 text-gray-600'>{shop.address_full}</p>
      {shop.address_detail && (
        <p className='mb-1 text-sm text-gray-500'>{shop.address_detail}</p>
      )}

      {shop.categories && shop.categories.length > 0 && (
        <div className='mb-6 mt-3 flex flex-wrap gap-2'>
          {shop.categories.map((c) => (
            <span
              key={c}
              className='rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700'
            >
              {c}
            </span>
          ))}
        </div>
      )}

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>매장 소개</h2>
        <p className='leading-relaxed'>
          {shop.description?.trim() ||
            `${shop.name}은(는) ${shop.address_full}에 위치한 가챠·쿠지·캡슐토이 매장입니다. 가챠 지도에 등록·검증된 매장으로, 취급 카테고리는 ${
              shop.categories?.join(' · ') ?? '가챠/쿠지/굿즈'
            }입니다. 방문 전 영업시간을 확인하시는 것을 권장합니다.`}
        </p>
      </section>

      {/* 매장 위치 지도 */}
      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>매장 위치</h2>
        <ShopStaticMap
          latitude={shop.latitude}
          longitude={shop.longitude}
          name={shop.name}
          address={shop.address_full}
        />
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>매장 정보</h2>
        <dl className='grid grid-cols-[140px_1fr] gap-y-2 text-sm'>
          <dt className='text-gray-500'>주소</dt>
          <dd>{shop.address_full}</dd>
          {shop.business_hours && (
            <>
              <dt className='text-gray-500'>영업시간</dt>
              <dd>{shop.business_hours}</dd>
            </>
          )}
          {shop.phone && (
            <>
              <dt className='text-gray-500'>전화</dt>
              <dd>{shop.phone}</dd>
            </>
          )}
          {shop.homepage && shop.homepage.length > 0 && (
            <>
              <dt className='text-gray-500'>홈페이지</dt>
              <dd>
                {shop.homepage.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='mr-2 break-all text-blue-600 hover:underline'
                  >
                    {url}
                  </a>
                ))}
              </dd>
            </>
          )}
          <dt className='text-gray-500'>최종 갱신</dt>
          <dd>{new Date(shop.last_updated).toLocaleDateString('ko-KR')}</dd>
        </dl>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>방문 전 체크리스트</h2>
        <ul className='list-disc space-y-2 pl-5 leading-relaxed'>
          <li>가챠폰은 대부분 동전 투입식이라 100원·500원 동전을 미리 준비하세요.</li>
          <li>이치방쿠지 신규 회차는 매장 SNS에서 잔여 등급을 미리 확인할 수 있습니다.</li>
          <li>
            매장 정보는 변동될 수 있어, 방문 전 영업 여부를 다시 한 번 확인하시는 것을 권장합니다.
          </li>
        </ul>
      </section>

      {nearby.length > 0 && (
        <section className='mb-8'>
          <h2 className='mb-3 text-xl font-semibold'>주변 매장</h2>
          <ul className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            {nearby.map((s) => (
              <li
                key={s.id}
                className='rounded-lg border border-gray-200 p-4 hover:bg-gray-50'
              >
                <Link href={`/shops/${s.id}`} className='block'>
                  <div className='mb-1 font-semibold'>{s.name}</div>
                  <p className='text-sm text-gray-600'>{s.address_full}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
        <p className='mb-2 font-semibold'>가챠·쿠지 가이드</p>
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
          <li>
            <Link href='/' className='text-blue-600 hover:underline'>
              지도에서 다른 매장 보기 →
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}

