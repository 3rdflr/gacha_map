import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import localFont from 'next/font/local';
import AuthProvider from '@/components/AuthProvider';
import './globals.css';
import Notice from '@/components/Notice';
import Footer from '@/components/Footer';

const API = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`;

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
  title: {
    default: '가챠 지도 | 전국 가챠·쿠지·캡슐토이 위치 찾기',
    template: '%s | 가챠 지도',
  },
  description:
    '전국 가챠·쿠지·캡슐토이 매장 위치를 지도에서 확인하세요. 신규 가챠, 신규 쿠지, 홍대 가챠, 이치방쿠지(제일복권) 정보를 한눈에!',
  keywords: [
    '가챠',
    '가챠 지도',
    '가챠지도',
    '쿠지 지도',
    '쿠지지도',
    '신규 가챠',
    '신규 쿠지',
    '신규 가차',
    '홍대 가챠',
    '홍대 쿠지',
    '가챠폰',
    '가챠샵',
    '가챠 샵',
    '가챠 파는곳',
    '가챠 위치',
    '쿠지',
    '이치방 쿠지',
    '이치방쿠지',
    '제일복권',
    '캡슐토이',
    '굿즈',
    '애니굿즈',
    '애니메이션 굿즈',
    '애니가챠',
    '서울 가챠',
    '서울 쿠지',
    '반다이',
    '귀멸의칼날 가챠',
    '드래곤볼 가챠',
  ],
  authors: [{ name: '가챠 지도' }],
  creator: '가챠 지도',
  publisher: '가챠 지도',
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
    title: '가챠 지도 | 전국 가챠·쿠지·캡슐토이 위치 찾기',
    description: '전국 가챠·쿠지·캡슐토이 매장 위치를 지도에서 확인하세요. 신규 가챠, 신규 쿠지, 홍대 가챠 정보를 한눈에!',
    url: 'https://gachamap.vercel.app/',
    siteName: '가챠 지도',
    images: [
      {
        url: 'https://gachamap.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: '전국 가챠·쿠지 위치 지도',
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
