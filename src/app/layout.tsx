import type { Metadata } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';
import AuthProvider from '@/components/AuthProvider';

import './globals.css';
import Notice from '@/components/Notice';

const API = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`;

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: '국내 가챠 지도',
  description:
    '가챠, 가챠폰, 캡슐토이, 이치방쿠지(제일복권) 지도 서비스! 인기 애니메이션 굿즈를 만나보세요.',
  keywords: [
    '가챠',
    '가챠폰',
    '캡슐토이',
    '쿠지',
    '이치방 쿠지',
    '제일복권',
    '굿즈',
    '애니',
    '애니메이션',
    '애니굿즈',
    '애니메이션굿즈',
    '애니가챠',
    '애니메이션가챠',
    '반다이',
    '귀멸의칼날',
    '귀칼',
    '은혼',
    '드래곤볼',
  ],
  authors: [{ name: '국내 가챠 지도' }],
  creator: '국내 가챠 지도',
  publisher: '국내 가챠 지도',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // 파비콘
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  // 오픈 그래프
  openGraph: {
    title: '국내 가챠 지도',
    description: '가챠, 캡슐토이, 제일복권 전문! 다양한 애니 굿즈 정보를 확인하세요.',
    url: 'https://gachamap.vercel.app/',
    siteName: '사이트 이름',
    images: [
      {
        url: 'logo.png',
        width: 1024,
        height: 1024,
        alt: '가챠 굿즈 사이트 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  verification: {
    google: 'google-site-verification=DBe2J_NaFFvwZzy3S0SOdQPurcIw3tnTe1M9NnsAtEA',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script src={API} strategy='beforeInteractive' />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin='anonymous'
          strategy='lazyOnload'
        />
        <AuthProvider>
          <Notice />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
