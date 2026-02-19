/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // wsrv.nl을 통해 이미지 최적화를 처리하므로 Vercel 자동 최적화 비활성화
    unoptimized: true,
  },
};

export default nextConfig;
