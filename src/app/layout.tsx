import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import localFont from 'next/font/local';
import AuthProvider from '@/components/AuthProvider';
import './globals.css';
import Notice from '@/components/Notice';
import Footer from '@/components/Footer';

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
    '가챠샵',
    '가챠 샵',
    '홍대 가챠샵',
    '홍대 가챠',
    '가챠 파는곳',
    '가챠샵 위치',
    '가챠 위치',
    '신상 가챠',
    '신상 가챠샵',
    '가챠지도',
    '가챠 지도',
    '가챠 지도 서비스',
    '서울 가챠',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: '국내 가챠 지도',
    description: '가챠, 캡슐토이, 제일복권 전문! 다양한 애니 굿즈 정보를 확인하세요.',
    url: 'https://gachamap.vercel.app/',
    siteName: '사이트 이름',
    images: [
      {
        url: 'og-image.png',
        width: 1200,
        height: 630,
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
    google: 'DyfCGBN6qFzr0KwA2ZAJlmYv0X0j3k20OwbSTMfTkF0',
    other: {
      'naver-site-verification': 'aee1fbe4c7241ef08c45edc653bde79833584b0b',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        {/* 카카오맵 스크립트를 head에 배치 */}
        <Script src={API} strategy='beforeInteractive' />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: '국내 가챠 지도',
              url: 'https://gachamap.vercel.app/',
              description: '전국 가챠, 캡슐토이, 제일복권 매장 위치 정보 서비스',
              applicationCategory: 'Maps',
              genre: 'Animation Goods',
              browserRequirements: 'requires HTML5 support',
            }),
          }}
        />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          strategy='afterInteractive'
          crossOrigin='anonymous'
        />
        <Analytics />
        <SpeedInsights />
        <AuthProvider>
          <Notice />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
