import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 | 가챠 지도',
  description:
    '가챠 지도 서비스의 개인정보처리방침입니다. 수집하는 정보, 이용 목적, 보유 기간, 쿠키 및 광고 정책을 확인하세요.',
};

export default function PrivacyPage() {
  return (
    <main className='mx-auto max-w-[720px] px-4 py-8 text-gray-800'>
      <h1 className='mb-2 text-2xl font-bold'>개인정보처리방침</h1>
      <p className='mb-8 text-sm text-gray-500'>최종 업데이트: 2025년 1월 1일</p>

      <p className='mb-8'>
        가챠 지도(이하 &quot;본 서비스&quot;)는 이용자의 개인정보를 중요하게 생각하며, 「개인정보
        보호법」 및 관련 법령을 준수합니다. 본 방침은 본 서비스가 어떤 정보를 수집하고, 어떻게
        이용하며, 어떻게 보호하는지 설명합니다.
      </p>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>1. 수집하는 개인정보 항목</h2>
        <p className='mb-3'>본 서비스는 다음과 같은 최소한의 정보를 수집합니다.</p>
        <ul className='list-disc space-y-2 pl-5'>
          <li>
            <strong>소셜 로그인(카카오)</strong>: 카카오 계정 이메일, 닉네임, 프로필 이미지(선택)
          </li>
          <li>
            <strong>서비스 이용 기록</strong>: 접속 일시, 이용한 서비스, 서비스 내 활동 기록
          </li>
          <li>
            <strong>자동 수집 정보</strong>: IP 주소, 브라우저 종류, 운영체제, 쿠키
          </li>
        </ul>
        <p className='mt-3'>
          비로그인 이용자는 지도 조회 및 매장 정보 확인 시 별도의 개인정보를 제공하지 않아도
          됩니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>2. 개인정보 수집 및 이용 목적</h2>
        <ul className='list-disc space-y-2 pl-5'>
          <li>회원 식별 및 로그인 서비스 제공</li>
          <li>게시글 작성, 수정, 삭제 등 서비스 기능 제공</li>
          <li>서비스 품질 개선 및 통계 분석</li>
          <li>부정 이용 방지 및 서비스 보안 유지</li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>3. 개인정보 보유 및 이용 기간</h2>
        <p className='mb-3'>
          이용자의 개인정보는 서비스 이용 기간 동안 보유하며, 회원 탈퇴 시 지체 없이 파기합니다.
          단, 관련 법령에 따라 일정 기간 보존이 필요한 경우에는 해당 기간 동안 보관 후 파기합니다.
        </p>
        <ul className='list-disc space-y-2 pl-5'>
          <li>전자상거래 관련 기록: 5년 (전자상거래 등에서의 소비자 보호에 관한 법률)</li>
          <li>접속 로그 기록: 3개월 (통신비밀보호법)</li>
        </ul>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>4. 개인정보의 제3자 제공</h2>
        <p>
          본 서비스는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 이용자가 사전에
          동의한 경우 또는 법령의 규정에 의한 경우는 예외로 합니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>5. 쿠키(Cookie) 및 광고</h2>
        <p className='mb-3'>
          본 서비스는 이용자 경험 개선 및 서비스 운영을 위해 쿠키를 사용합니다. 쿠키는 브라우저에
          저장되는 소량의 데이터로, 이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.
          단, 쿠키 거부 시 일부 서비스 이용이 제한될 수 있습니다.
        </p>
        <p className='mb-3'>
          본 서비스는 <strong>Google AdSense</strong>를 통해 광고를 게재합니다. Google은 쿠키를
          사용하여 이용자의 관심사에 맞는 맞춤형 광고를 제공할 수 있습니다. Google의 광고 및
          개인정보 처리 방식은{' '}
          <a
            href='https://policies.google.com/privacy'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 underline'
          >
            Google 개인정보처리방침
          </a>
          에서 확인할 수 있습니다.
        </p>
        <p>
          이용자는{' '}
          <a
            href='https://adssettings.google.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 underline'
          >
            Google 광고 설정
          </a>
          에서 맞춤형 광고를 거부할 수 있습니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>6. 카카오 소셜 로그인</h2>
        <p className='mb-3'>
          본 서비스는 카카오 OAuth 2.0을 통한 소셜 로그인을 제공합니다. 카카오 로그인 시 카카오의
          개인정보처리방침이 적용되며, 본 서비스는 카카오로부터 이메일, 닉네임 등 최소한의 정보만을
          제공받습니다.
        </p>
        <p>
          카카오의 개인정보 처리 방식은{' '}
          <a
            href='https://www.kakao.com/policy/privacy'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 underline'
          >
            카카오 개인정보처리방침
          </a>
          에서 확인할 수 있습니다.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='mb-3 text-xl font-semibold'>7. 이용자의 권리</h2>
        <p className='mb-3'>이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다.</p>
        <ul className='list-disc space-y-2 pl-5'>
          <li>개인정보 열람 요청</li>
          <li>개인정보 정정·삭제 요청</li>
          <li>개인정보 처리 정지 요청</li>
          <li>회원 탈퇴를 통한 개인정보 삭제</li>
        </ul>
        <p className='mt-3'>
          서비스 내 &quot;회원 탈퇴&quot; 기능을 이용하거나, 아래 문의처로 요청하시면 처리해
          드립니다.
        </p>
      </section>

      <section>
        <h2 className='mb-3 text-xl font-semibold'>8. 문의</h2>
        <p>
          개인정보 관련 문의 및 권리 행사 요청은 서비스 내 문의 수단을 통해 가능합니다. 접수된 요청은
          최대한 신속하게 처리하겠습니다.
        </p>
      </section>
    </main>
  );
}
