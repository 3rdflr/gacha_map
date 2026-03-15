import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 | 가챠 지도',
  description:
    '가챠 지도 서비스 이용약관입니다. 서비스 이용 조건, 금지 행위, 책임의 한계, 약관 변경 안내를 확인하세요.',
};

export default function TermsPage() {
  return (
    <main className='mx-auto max-w-[720px] px-4 py-8 text-gray-800'>
      <h1 className='mb-2 text-2xl font-bold'>이용약관</h1>
      <p className='mb-8 text-sm text-gray-500'>최종 업데이트: 2025년 1월 1일</p>

      <p className='mb-8'>
        본 약관은 가챠 지도(이하 &quot;서비스&quot;)의 이용 조건 및 절차에 관한 사항을 규정합니다.
        서비스를 이용하시면 본 약관에 동의하신 것으로 간주합니다.
      </p>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>1. 서비스 소개</h2>
        <p className='mb-3'>
          가챠 지도는 전국 가챠폰·캡슐토이·이치방쿠지 매장 위치 및 관련 정보를 제공하는 웹 서비스입니다.
          비로그인 이용자도 지도 조회 및 매장 정보 확인이 가능하며, 일부 기능은 로그인 후 이용
          가능합니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>2. 서비스 이용</h2>
        <p className='mb-3'>
          이용자는 본 서비스를 개인적·비상업적 목적으로 자유롭게 이용할 수 있습니다. 서비스에서
          제공하는 정보는 참고용으로 제공되며, 실제 매장 운영 현황은 변동될 수 있습니다.
        </p>
        <p>
          카카오 소셜 로그인을 통해 회원가입 및 로그인이 가능하며, 로그인 이용자는 가챠 보드 게시글
          조회 등 추가 기능을 이용할 수 있습니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>3. 금지 행위</h2>
        <p className='mb-3'>이용자는 다음 행위를 해서는 안 됩니다.</p>
        <ul className='list-disc space-y-2 pl-5'>
          <li>서비스의 정상적인 운영을 방해하는 행위</li>
          <li>타인의 개인정보를 무단으로 수집·이용하는 행위</li>
          <li>서비스 내 콘텐츠를 무단으로 복제·배포하는 행위</li>
          <li>허위 정보를 작성하거나 타인을 사칭하는 행위</li>
          <li>관련 법령을 위반하는 행위</li>
          <li>기타 서비스 운영자가 부적절하다고 판단하는 행위</li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>4. 콘텐츠 및 지식재산권</h2>
        <p className='mb-3'>
          본 서비스에서 제공하는 지도, 디자인, 텍스트, 이미지 등 모든 콘텐츠의 지식재산권은 해당
          권리자에게 귀속됩니다. 이용자는 서비스 운영자의 사전 허락 없이 이를 상업적으로 이용할 수
          없습니다.
        </p>
        <p>
          이용자가 서비스 내에 게시한 콘텐츠의 저작권은 해당 이용자에게 귀속되며, 서비스 운영자는
          서비스 운영·홍보 목적으로 이를 사용할 수 있습니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>5. 책임의 한계</h2>
        <p className='mb-3'>
          본 서비스는 제공되는 정보의 정확성을 위해 노력하지만, 매장 폐업·이전·운영시간 변경 등으로
          인해 정보가 실제와 다를 수 있습니다. 이로 인한 불이익에 대해 서비스 운영자는 책임을 지지
          않습니다.
        </p>
        <p className='mb-3'>
          서비스 운영자는 천재지변, 서버 장애, 통신망 오류 등 불가항력적 사유로 인한 서비스 중단에
          대해 책임을 지지 않습니다.
        </p>
        <p>
          서비스 내 외부 링크를 통해 접근한 제3자 서비스에서 발생한 문제에 대해서는 해당 서비스의
          이용약관이 적용됩니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>6. 서비스 변경 및 중단</h2>
        <p>
          서비스 운영자는 서비스 내용의 변경, 일시적 중단, 서비스 종료를 결정할 수 있습니다. 중요한
          변경 사항은 서비스 내 공지를 통해 사전에 안내합니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>7. 약관 변경</h2>
        <p>
          본 약관은 서비스 운영 방침 변경 또는 관련 법령 개정에 따라 수정될 수 있습니다. 약관이
          변경될 경우 서비스 내 공지사항을 통해 안내합니다. 변경된 약관은 공지 후 효력이
          발생하며, 이후 서비스를 계속 이용하면 변경된 약관에 동의한 것으로 간주합니다.
        </p>
      </section>

      <section>
        <h2 className='mb-3 text-xl font-semibold'>8. 준거법 및 관할</h2>
        <p>
          본 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련된 분쟁은 대한민국 법원을 관할
          법원으로 합니다.
        </p>
      </section>
    </main>
  );
}
