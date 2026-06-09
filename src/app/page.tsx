import Link from 'next/link';
import HomeContent from '@/components/HomeContent';
import { getVerifiedShops } from '@/lib/supabase';

export const revalidate = 3600;

export default async function Home() {
  const shops = await getVerifiedShops();

  return (
    <>
      <HomeContent shops={shops} />

      <section className='mx-auto max-w-[800px] px-4 py-12 text-gray-800'>
        <h2 className='mb-4 text-2xl font-bold'>가챠 지도 — 전국 캡슐토이·쿠지 매장 안내</h2>
        <p className='mb-6 leading-relaxed'>
          가챠 지도는 대한민국 전역의 <strong>캡슐토이(가챠폰)</strong>,{' '}
          <strong>이치방쿠지(제일복권)</strong>, <strong>랜덤 박스</strong> 전문 매장 위치를 한눈에
          확인할 수 있는 서비스입니다. 지도를 드래그하거나 지역을 검색해 가장 가까운 매장을 찾고,
          영업시간·취급 브랜드·주차 여부를 미리 확인해 보세요.
        </p>

        <div className='mb-10'>
          <h3 className='mb-3 text-xl font-semibold'>지역별 매장 찾기</h3>
          <p className='mb-4 leading-relaxed'>
            서울·수도권부터 부산·대구·광주·대전까지 전국 주요 도시의 가챠 매장 정보를 지역
            페이지에서 상세히 확인하실 수 있습니다. 각 지역 페이지에는 매장 목록, 찾아가는 방법,
            주변 명소까지 함께 안내합니다.
          </p>
          <div className='flex flex-wrap gap-2'>
            {[
              { label: '홍대·합정', slug: 'hongdae' },
              { label: '강남·신사', slug: 'gangnam' },
              { label: '신촌·이대', slug: 'sinchon' },
              { label: '명동·을지로', slug: 'myeongdong' },
              { label: '부산 서면·해운대', slug: 'busan' },
            ].map(({ label, slug }) => (
              <Link
                key={slug}
                href={`/regions/${slug}`}
                className='rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100'
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className='mb-10'>
          <h3 className='mb-3 text-xl font-semibold'>처음이라면? 가챠 입문 가이드</h3>
          <p className='mb-4 leading-relaxed'>
            캡슐토이를 처음 접하시는 분을 위해 기초 개념부터 매장 이용 방법, 인기 브랜드 비교까지
            정리했습니다. 아래 가이드를 읽고 매장을 방문하면 훨씬 알차게 즐길 수 있습니다.
          </p>
          <div className='grid gap-3 sm:grid-cols-3'>
            <Link
              href='/guide/gacha-beginner'
              className='rounded-lg border border-gray-200 p-4 hover:border-blue-400 hover:shadow-sm'
            >
              <p className='mb-1 font-semibold'>가챠 입문 가이드</p>
              <p className='text-sm text-gray-500'>캡슐토이 기초, 가격대, 즐기는 법</p>
            </Link>
            <Link
              href='/guide/ichiban-kuji'
              className='rounded-lg border border-gray-200 p-4 hover:border-blue-400 hover:shadow-sm'
            >
              <p className='mb-1 font-semibold'>이치방쿠지 완벽 가이드</p>
              <p className='text-sm text-gray-500'>등급 구조, 확률, 박스깡 팁</p>
            </Link>
            <Link
              href='/guide/capsule-toy-brands'
              className='rounded-lg border border-gray-200 p-4 hover:border-blue-400 hover:shadow-sm'
            >
              <p className='mb-1 font-semibold'>브랜드 비교</p>
              <p className='text-sm text-gray-500'>반다이·굿스마일·타카라토미 등</p>
            </Link>
          </div>
        </div>

        <div className='mb-10'>
          <h3 className='mb-3 text-xl font-semibold'>가챠 지도를 이용하는 법</h3>
          <p className='mb-3 leading-relaxed'>
            지도 상단 검색창에 동네 이름(예: &ldquo;홍대&rdquo;, &ldquo;강남역&rdquo;)을 입력하면
            해당 지역의 가챠 매장 핀이 표시됩니다. 핀을 탭하면 매장명, 주소, 영업시간, 취급
            카테고리(캡슐토이 / 쿠지 / 랜덤 박스)를 확인할 수 있습니다.
          </p>
          <p className='mb-3 leading-relaxed'>
            카테고리 필터를 활용하면 <strong>쿠지 전문 매장</strong>이나{' '}
            <strong>캡슐토이 전문 매장</strong>만 따로 볼 수 있어 원하는 상품을 취급하는 매장을
            빠르게 찾을 수 있습니다.
          </p>
          <p className='leading-relaxed'>
            매장 정보는{' '}
            <Link href='/gacha-board' className='text-blue-600 hover:underline'>
              가챠 게시판
            </Link>
            을 통해 커뮤니티가 함께 업데이트합니다. 새로운 매장을 발견했거나 정보가 바뀌었다면
            게시판에 제보해 주세요.
          </p>
        </div>

        <div className='rounded-lg border border-gray-100 bg-gray-50 p-6'>
          <h3 className='mb-4 text-lg font-semibold'>자주 묻는 질문</h3>
          <dl className='space-y-4'>
            <div>
              <dt className='font-medium'>
                가챠폰(캡슐토이)과 이치방쿠지(쿠지)는 어떻게 다른가요?
              </dt>
              <dd className='mt-1 text-sm leading-relaxed text-gray-600'>
                가챠폰은 동전을 넣고 캡슐을 뽑는 자동판매기 방식이고, 이치방쿠지는 매장 직원이 있는
                복권 방식입니다. 가격대와 퀄리티가 크게 다릅니다.{' '}
                <Link href='/guide/gacha-beginner' className='text-blue-600 hover:underline'>
                  입문 가이드
                </Link>
                에서 자세히 확인하세요.
              </dd>
            </div>
            <div>
              <dt className='font-medium'>전국 어디에서 가챠 매장을 찾을 수 있나요?</dt>
              <dd className='mt-1 text-sm leading-relaxed text-gray-600'>
                서울 홍대·강남·신촌, 부산 서면·해운대 등 대도시 번화가에 집중되어 있습니다. 지도를
                이용해 현재 위치 주변 매장을 검색해 보세요.
              </dd>
            </div>
            <div>
              <dt className='font-medium'>매장 정보가 틀렸어요. 어떻게 수정하나요?</dt>
              <dd className='mt-1 text-sm leading-relaxed text-gray-600'>
                <Link href='/gacha-board' className='text-blue-600 hover:underline'>
                  가챠 게시판
                </Link>
                에 제보 글을 남겨 주시면 확인 후 반영합니다.
              </dd>
            </div>
          </dl>
          <Link
            href='/faq'
            className='mt-4 inline-block text-sm font-medium text-blue-600 hover:underline'
          >
            FAQ 더 보기 →
          </Link>
        </div>
      </section>
    </>
  );
}
