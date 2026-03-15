import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '서비스 소개 | 가챠 지도',
  description:
    '가챠 지도는 전국 가챠폰·캡슐토이·이치방쿠지 매장을 한눈에 찾을 수 있는 지도 기반 서비스입니다. 서비스 소개, 사용 방법, 자주 묻는 질문을 확인하세요.',
};

export default function AboutPage() {
  return (
    <main className='mx-auto max-w-[720px] px-4 py-8 text-gray-800'>
      <h1 className='mb-6 text-2xl font-bold'>가챠 지도 서비스 소개</h1>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>서비스란?</h2>
        <p className='mb-3'>
          가챠 지도는 국내 가챠폰(캡슐 자판기), 캡슐토이, 이치방쿠지(이치방쿠지·제일복권) 매장을
          지도에서 한눈에 확인할 수 있도록 돕는 정보 서비스입니다.
        </p>
        <p className='mb-3'>
          애니메이션 굿즈, 미니어처 피규어, 캐릭터 캡슐토이에 관심 있는 분들이 근처 매장을 쉽게
          찾을 수 있도록 제작되었습니다. 홍대, 신촌, 강남, 명동 등 주요 상권부터 전국 각지의 매장
          정보를 제공합니다.
        </p>
        <p>
          매장 위치, 운영 여부, 취급 브랜드 등 실용적인 정보를 지속적으로 업데이트하고 있습니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>가챠·쿠지란?</h2>
        <p className='mb-3'>
          <strong>가챠폰(ガチャポン)</strong>은 동전을 넣고 손잡이를 돌리면 캡슐이 나오는 자판기로,
          캡슐 안에 피규어·키링·뱃지 등 다양한 미니어처 상품이 들어 있습니다. 랜덤으로 상품이
          결정되는 것이 특징이며, 희귀 아이템을 모으는 수집 문화로 인기를 끌고 있습니다.
        </p>
        <p className='mb-3'>
          <strong>이치방쿠지(一番くじ)</strong>는 반프레스토에서 운영하는 복권식 굿즈 판매 방식으로,
          각 티켓마다 상품이 정해져 있어 중복 없이 경품을 받을 수 있습니다. 드래곤볼, 원피스,
          주술회전 등 인기 애니메이션 IP 상품이 주로 출시됩니다.
        </p>
        <p>
          <strong>캡슐토이</strong>는 가챠폰과 유사하나 더 큰 캡슐에 정교한 피규어·인형 등이
          들어있는 형태로, 최근 성인 수집가들 사이에서 큰 인기를 얻고 있습니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>주요 기능</h2>
        <ul className='list-disc space-y-2 pl-5'>
          <li>
            <strong>지도 검색</strong>: 현재 위치 또는 원하는 지역을 검색해 주변 매장을 지도에서
            확인
          </li>
          <li>
            <strong>매장 정보</strong>: 매장 위치, 취급 브랜드, 운영 정보 확인
          </li>
          <li>
            <strong>가챠 보드</strong>: 신규 가챠·이치방쿠지 출시 소식, 이벤트 정보 게시판
          </li>
          <li>
            <strong>태그 필터</strong>: 관심 브랜드(반다이, 굿스마일, 코토부키야 등)별 필터링
          </li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>사용 방법</h2>
        <ol className='list-decimal space-y-2 pl-5'>
          <li>메인 화면의 지도에서 원하는 지역으로 이동합니다.</li>
          <li>지도 위 핀(마커)을 클릭하면 매장 상세 정보를 확인할 수 있습니다.</li>
          <li>검색창에 지역명(예: 홍대, 강남, 부산)을 입력해 빠르게 이동할 수 있습니다.</li>
          <li>
            상단 메뉴의 <strong>가챠 보드</strong>에서 최신 신규 가챠 출시 정보를 확인하세요.
          </li>
          <li>카카오 계정으로 로그인하면 추가 기능을 이용할 수 있습니다.</li>
        </ol>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>자주 묻는 질문 (FAQ)</h2>

        <div className='mb-4'>
          <h3 className='mb-1 font-semibold'>Q. 매장 정보는 얼마나 자주 업데이트되나요?</h3>
          <p>
            공개된 정보를 기반으로 지속적으로 업데이트하고 있습니다. 폐업·이전 등 변경 사항이
            있으면 반영이 늦을 수 있으니 방문 전 확인을 권장합니다.
          </p>
        </div>

        <div className='mb-4'>
          <h3 className='mb-1 font-semibold'>Q. 신규 매장을 추가 요청할 수 있나요?</h3>
          <p>현재 관리자가 직접 매장 정보를 관리하고 있으며, 추후 제보 기능 추가를 검토 중입니다.</p>
        </div>

        <div className='mb-4'>
          <h3 className='mb-1 font-semibold'>Q. 모바일에서도 사용할 수 있나요?</h3>
          <p>
            네, 모바일 브라우저에서도 최적화된 화면으로 이용할 수 있습니다. 별도 앱 설치 없이 웹
            브라우저로 접속하세요.
          </p>
        </div>

        <div className='mb-4'>
          <h3 className='mb-1 font-semibold'>Q. 로그인이 필요한가요?</h3>
          <p>
            지도 조회와 매장 정보 확인은 로그인 없이 가능합니다. 가챠 보드 게시글 작성 등 일부
            기능은 로그인이 필요합니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className='mb-3 text-xl font-semibold'>데이터 출처 및 면책 고지</h2>
        <p className='mb-3'>
          본 서비스에 제공되는 매장 정보는 공개된 데이터를 기반으로 하며, 실제 운영 현황과 다를 수
          있습니다. 매장 방문 전 공식 채널을 통해 영업 여부를 확인하시기 바랍니다.
        </p>
        <p>
          서비스 이용 중 불편한 점이나 정보 오류를 발견하시면 언제든지 알려주세요. 더 정확하고
          유용한 서비스가 될 수 있도록 노력하겠습니다.
        </p>
      </section>
    </main>
  );
}
