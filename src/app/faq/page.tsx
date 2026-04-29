import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '자주 묻는 질문 (FAQ)',
  description:
    '가챠 지도 이용 방법, 매장 정보 정확성, 가챠·쿠지·캡슐토이에 관한 자주 묻는 질문들을 모았습니다.',
  alternates: { canonical: 'https://gachamap.vercel.app/faq' },
};

const FAQS = [
  {
    q: '가챠 지도는 어떤 서비스인가요?',
    a: '전국의 가챠폰·캡슐토이·이치방쿠지(제일복권) 매장 위치를 지도와 리스트로 제공하는 무료 정보 서비스입니다. 매장 운영사·브랜드사와 직접적인 관련은 없으며, 운영자가 공개된 데이터를 수집해 검증한 정보만 노출합니다.',
  },
  {
    q: '매장 정보는 얼마나 자주 업데이트되나요?',
    a: '운영자가 신규 정보·제보를 확인하는 즉시 반영하고 있으며, 매장당 마지막 갱신 일자를 매장 상세 페이지에서 확인할 수 있습니다. 다만 폐업·이전 등의 변경 사항이 즉시 반영되지 않을 수 있으니, 방문 전 매장에 직접 영업 여부를 확인하시는 것을 권장합니다.',
  },
  {
    q: '신규 매장을 추가 요청할 수 있나요?',
    a: '지도 우측 하단의 매장 제보 버튼으로 신규 매장 정보를 알려 주시면 운영자 확인 후 가능한 빨리 반영하고 있습니다. 정확한 매장명·주소·취급 카테고리(가챠/쿠지/굿즈)를 함께 보내 주시면 검증이 빠릅니다.',
  },
  {
    q: '모바일에서도 사용할 수 있나요?',
    a: '네, 모바일 브라우저에서 최적화된 화면으로 이용할 수 있습니다. 별도 앱 설치 없이 웹 브라우저로 접속하면 위치 권한 허용 후 현재 위치 주변 매장을 바로 확인할 수 있습니다.',
  },
  {
    q: '로그인이 필요한가요?',
    a: '지도 조회·매장 상세 확인은 로그인 없이 가능합니다. 가챠 보드 게시글 작성·수정 등 일부 커뮤니티 기능만 카카오 계정 로그인이 필요합니다.',
  },
  {
    q: '가챠와 쿠지(이치방쿠지)는 어떻게 다른가요?',
    a: '가챠(가챠폰)는 동전을 넣고 손잡이를 돌려 무작위 캡슐을 뽑는 자판기 방식이고, 이치방쿠지는 등급별로 정해진 상품을 한 장씩 티켓으로 뽑는 복권 방식입니다. 가챠는 같은 상품이 중복으로 나올 수 있지만, 이치방쿠지는 박스를 다 사면 모든 등급이 한 번씩 나옵니다.',
  },
  {
    q: '한국 매장에서 일본 정식 라이선스 상품을 살 수 있나요?',
    a: '정식 수입 매장은 반다이/반프레스토 등의 라이선스 표기가 매장 내·자판기 상단에 부착되어 있습니다. 가챠 지도에 등록된 매장은 라이선스 정식 수입품을 취급하는 매장 위주로 검증해 등록하고 있습니다.',
  },
  {
    q: '편의점·다이소에 있는 가챠도 등록되나요?',
    a: '대형 가챠 전문 매장 위주로 등록하고 있어 편의점·다이소 등 일반 소매점의 소형 가챠폰은 별도 등록하지 않습니다. 가챠 라인업이 정기적으로 교체되는 전문 매장에 우선순위를 두고 있습니다.',
  },
  {
    q: '매장 정보가 잘못된 것 같아요. 어떻게 알리나요?',
    a: '매장 상세 화면 하단의 신고/수정 요청 버튼으로 알려 주시거나, 푸터의 문의 채널을 통해 연락해 주시면 빠르게 확인 후 수정합니다.',
  },
  {
    q: '광고가 표시되나요?',
    a: '서비스 운영비 충당을 위해 일부 영역에 광고가 표시될 수 있습니다. 광고는 콘텐츠 영역과 명확히 구분되도록 배치하며, 사용자 경험을 해치지 않도록 노력하고 있습니다.',
  },
];

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className='mx-auto max-w-[720px] px-4 py-10 text-gray-800'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className='mb-4 text-sm text-gray-500'>
        <Link href='/' className='hover:underline'>홈</Link> /{' '}
        <span className='text-gray-700'>자주 묻는 질문</span>
      </nav>

      <h1 className='mb-6 text-2xl font-bold'>자주 묻는 질문 (FAQ)</h1>

      <p className='mb-8 leading-relaxed'>
        가챠 지도 이용 중 자주 들어오는 질문들을 정리했습니다. 여기서 답을 찾지 못한 경우 푸터의 문의
        채널로 알려 주시면 답변과 함께 본 페이지에도 추가하도록 하겠습니다.
      </p>

      <div className='space-y-6'>
        {FAQS.map((f, i) => (
          <div key={i} className='border-b border-gray-200 pb-6'>
            <h2 className='mb-2 text-lg font-semibold'>Q. {f.q}</h2>
            <p className='leading-relaxed text-gray-700'>A. {f.a}</p>
          </div>
        ))}
      </div>

      <div className='mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4'>
        <p className='mb-2 font-semibold'>관련 페이지</p>
        <ul className='space-y-1'>
          <li><Link href='/about' className='text-blue-600 hover:underline'>서비스 소개 →</Link></li>
          <li><Link href='/guide/gacha-beginner' className='text-blue-600 hover:underline'>가챠 입문 가이드 →</Link></li>
          <li><Link href='/' className='text-blue-600 hover:underline'>지도에서 매장 찾기 →</Link></li>
        </ul>
      </div>
    </main>
  );
}
