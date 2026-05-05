/**
 * Ambient module declarations for non-code assets.
 *
 * tsconfig 의 moduleResolution: "bundler" + TS 5.x 환경에서는
 * side-effect import (예: `import './globals.css'`) 에 대해 ambient 선언이
 * 없으면 "Cannot find module or type declarations" 오류가 발생합니다.
 * Next.js 가 CSS 모듈(*.module.css) 타입은 제공하지만, 글로벌 CSS 등
 * 그 외 자산은 별도로 선언이 필요합니다.
 */

// 글로벌 CSS / SCSS — side-effect import 허용
declare module '*.css';
declare module '*.scss';
declare module '*.sass';

// 이미지 / 폰트 등 — 필요해질 때를 대비해 미리 선언
declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.gif' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}
declare module '*.woff';
declare module '*.woff2';
