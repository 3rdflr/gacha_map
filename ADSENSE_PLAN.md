# 가챠 지도 — AdSense "Low value content" 통과 플랜

> 거부 사유: **AdSense Program Policies — Low value content (Minimum content requirements 미충족)**
> 도메인: `https://gachamap.vercel.app`
> 작성일: 2026-04-30

---

## 1. 진단: 왜 거부됐는가

### 1-1. 현재 사이트 구조

| 라우트 | SSR 텍스트량 | 비고 |
| --- | --- | --- |
| `/` | **거의 0자** | 카카오맵 + Header만. 매장 데이터는 클라이언트 컴포넌트 안에서만 렌더 → 크롤러가 못 봄 |
| `/about` | 약 1,800자 | 양호 |
| `/privacy` | 약 2,000자 | 양호 |
| `/terms` | 약 1,500자 | 양호 |
| `/gacha-board` | 가변 (게시글 의존) | 사용자 게시글 없으면 빈 페이지 |
| `/gacha-board/[id]` | 게시글 본문 | 게시글 수가 적으면 thin |

### 1-2. AdSense 심사관(및 크롤러) 시점에서의 문제

1. **메인 페이지가 사실상 빈 페이지로 보임.** 카카오맵 SDK가 `beforeInteractive`로 로드되긴 하지만, 매장 정보(`shops`)는 SSR로 받아오면서도 화면에는 `<KakaoMap />` 클라이언트 컴포넌트 안에서만 렌더링됨. 정적 HTML에는 매장명/주소가 한 글자도 노출되지 않음.
2. **사이트 = 단일 기능(지도 조회).** 지도 외 콘텐츠가 about/policy 류뿐. 사용자에게 "독립적으로 가치 있는 콘텐츠"가 부족하다는 게 AdSense의 thin content 판단 트리거.
3. **AdSense 스크립트가 빈 페이지에서 이미 로드됨** (`layout.tsx`). 정책 위반 상태에서 광고 코드가 노출되면 추가 페널티 가능성.
4. **인덱싱 페이지 수 부족.** sitemap에 정적 5페이지 + 게시글뿐 → 게시글이 적으면 사이트 규모 자체가 작아 보임.

### 1-3. 핵심 결론

**"지도 위젯 = 콘텐츠"가 아닙니다.** 크롤러가 읽을 수 있는 **오리지널 텍스트 콘텐츠**(가이드, 지역 소개, 매장 상세 SSR, FAQ)를 추가해서 "지도 위젯 + 텍스트 매거진" 형태로 바꿔야 통과합니다. 같은 도메인에서 가챠/쿠지에 관한 정보를 충분히 다루는 페이지가 20~30개 정도 인덱싱 가능해야 안전합니다.

---

## 2. 콘텐츠 추가 로드맵

### Phase 1 — 통과 직전 필수 (이번 작업으로 처리)

| # | 페이지 | 목적 | 글자 수 목표 |
| --- | --- | --- | --- |
| 1 | `/` 하단 콘텐츠 섹션 | 메인이 빈 페이지로 보이는 문제 해결 | 1,500+ |
| 2 | `/guide/gacha-beginner` | 가챠 입문 가이드 | 2,000+ |
| 3 | `/guide/ichiban-kuji` | 이치방쿠지 구매 방법 | 2,000+ |
| 4 | `/guide/capsule-toy-brands` | 주요 브랜드 비교 | 2,000+ |
| 5 | `/regions/[slug]` (홍대·강남·신촌·명동·부산) | 지역별 매장 + 지역 소개 | 1,200+ |
| 6 | `/shops/[id]` | 매장당 SSR 상세 페이지 | 가변 (매장 정보 + 주변 매장 + 지역 설명) |
| 7 | `/faq` | 분리·확장된 FAQ | 1,500+ |

### Phase 2 — 재심사 직후 또는 통과 후 (선택)

- `/brands/[slug]` (반다이, 굿스마일, 코토부키야, 메가하우스 등 브랜드별 페이지)
- `/news` 또는 `/blog` — 신규 가챠/쿠지 출시 소식 정기 포스팅
- `/guide/etiquette` — 가챠샵 매너 가이드
- `/guide/budget` — 가챠 예산 관리 팁
- `/regions` 인덱스 페이지

---

## 3. 페이지별 작성 가이드라인

### 공통 원칙

- **오리지널 글이어야 함.** 위키/타 사이트 복붙 금지.
- **본문 첫 1~2 문단에 키워드 자연스럽게 노출** (가챠, 쿠지, 캡슐토이, 지역명).
- **이미지는 alt 텍스트 필수.**
- **내부 링크 풍부하게.** 가이드 → 지역 → 매장 → 다른 가이드로 순환.
- **Last updated 표기.**

### 가이드 페이지 구조 템플릿

H1 → 도입 문단 → H2 개념 정의 → H2 종류/분류 → H2 가격대 → H2 구매 방법 → H2 FAQ → 관련 링크 박스

### 지역 페이지 구조 템플릿

H1 → 지역 소개 → H2 주요 매장 (SSR 카드 리스트) → H2 가는 방법 → H2 주변 명소 → H2 FAQ → 다른 지역 링크

---

## 4. 기술 변경 체크리스트

- [x] 진단 및 플랜 작성
- [ ] `src/app/page.tsx`: SSR 콘텐츠 섹션 추가
- [ ] `src/app/guide/gacha-beginner/page.tsx`
- [ ] `src/app/guide/ichiban-kuji/page.tsx`
- [ ] `src/app/guide/capsule-toy-brands/page.tsx`
- [ ] `src/app/regions/[slug]/page.tsx` + `generateStaticParams`
- [ ] `src/app/shops/[id]/page.tsx` + `generateStaticParams`
- [ ] `src/app/faq/page.tsx`
- [ ] `src/app/sitemap.ts` 업데이트
- [ ] `src/app/layout.tsx`: AdSense 스크립트 env flag 토글
- [ ] 신규 페이지 `generateMetadata` 설정
- [ ] 매장 상세 `LocalBusiness` JSON-LD, 가이드 `Article` JSON-LD
- [ ] `npm run build` 에러 0

---

## 5. AdSense 재심사 절차

1. 모든 신규 페이지 배포 후 **24~72시간** 색인 시간 확보. Search Console에서 핵심 URL 수동 색인 요청.
2. Search Console "URL 검사"에서 5개 이상 "URL is on Google" 확인.
3. AdSense 콘솔 → 사이트 → 정책 위반 알림 영역의 "검토 요청" 버튼.
4. 변경 사항 요약을 영문으로 1~2문단 첨부.
5. 재심사는 일반적으로 **최대 14일** 소요.

### 통과 후

- `layout.tsx`의 AdSense 스크립트 다시 활성화.
- 광고 슬롯은 메인 콘텐츠 섹션 사이, 가이드 페이지 본문 중간/하단에 배치 (지도 위 X).
- 광고 단위는 **콘텐츠당 최대 3개** 이하.

---

## 6. 자주 빠지는 함정

- **AI로 가이드 생성 후 그대로 업로드** → 본인 톤으로 다듬고 개인 경험·관점 추가 필수.
- **매장 정보를 표로만 나열** → 표는 콘텐츠로 카운트되지 않음. 매장마다 설명 문단 추가.
- **사이트맵에는 있는데 noindex된 페이지** → 메타에 `robots: noindex` 주의.
- **로그인 게이트 너머의 콘텐츠** → 가챠 보드 작성/수정 페이지는 noindex.

---

## 7. 작업 순서 요약

1. 플랜 확정 (이 문서)
2. 홈페이지 SSR 콘텐츠 섹션 추가
3. 가이드 3종 작성
4. 지역/매장 상세 페이지 라우트 추가
5. FAQ 분리
6. sitemap 업데이트
7. AdSense 스크립트 env flag 비활성
8. 빌드 검증 → 배포 → Search Console 색인 요청 → 1주일 대기
9. AdSense 재심사 신청
10. 통과 후 광고 재활성화
