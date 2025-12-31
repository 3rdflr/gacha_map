# Gacha Map (가챠 맵)

## 📖 프로젝트 설명 (Project Description)

**Gacha Map**은 Next.js 14와 Kakao Maps API를 기반으로 한 위치 기반 서비스 애플리케이션입니다.

사용자는 지도 상에서 특정 위치를 탐색하거나 상호작용할 수 있으며, Supabase를 백엔드 서비스로 사용하여 실시간 데이터 동기화 및 인증 기능을 제공합니다.

---

## 🛠 기술 스택 (Tech Stack)

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Maps**: React Kakao Maps SDK
- **Icons**: Lucide React

### Backend & Database
- **BaaS**: Supabase (Auth, Database, Storage)
- **Image Optimization**: Sharp

### Tools
- **Linting**: ESLint, Prettier
- **Package Manager**: npm / yarn

---

## ✨ 주요 기능 (Key Features)

1. **지도 통합 (Map Integration)**
   - Kakao Maps SDK를 활용한 지도 시각화
   - 위치 기반 마커 및 오버레이 렌더링
   - 가게 위치 표시 및 클릭 이벤트 처리

2. **사용자 인증 (Authentication)**
   - Supabase Auth를 이용한 로그인/회원가입
   - 소셜 로그인 지원 (Kakao 등)
   - 사용자 프로필 관리 (닉네임, 아바타)

3. **가게 관리 (Shop Management)**
   - 가게 정보 조회 및 검색
   - 사용자 가게 제안 시스템
   - 가게 이미지 및 상품 정보 등록

4. **리뷰 시스템 (Review System)**
   - 가게별 리뷰 작성 (별점 1-5점)
   - 사용자당 가게당 1개의 리뷰 제한
   - 리뷰 수정 및 삭제 기능

5. **이미지 처리 (Image Handling)**
   - Next.js Image 컴포넌트를 활용한 최적화
   - 외부 이미지 도메인 지원 (Naver, Kakao, Supabase Storage)
   - Sharp를 이용한 이미지 리사이징

6. **상태 관리 (State Management)**
   - Zustand를 이용한 가볍고 효율적인 전역 상태 관리
   - 지도 상태, 사용자 정보 관리

---

## 📂 프로젝트 구조 (Project Structure)

```
gacha_map/
├── public/                  # 정적 파일 (이미지, 아이콘 등)
├── src/
│   ├── app/                 # Next.js App Router 페이지 및 레이아웃
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   │   ├── ui/              # 버튼, 입력창 등 기본 UI
│   │   └── map/             # 지도 관련 컴포넌트
│   ├── lib/                 # 유틸리티 함수 및 설정 (Supabase 클라이언트 등)
│   ├── store/               # Zustand 스토어 (전역 상태)
│   ├── types/               # TypeScript 타입 정의
│   └── styles/              # 전역 스타일 (Tailwind 설정 등)
├── next.config.mjs          # Next.js 설정 (이미지 도메인 등)
├── package.json             # 의존성 및 스크립트
├── tailwind.config.ts       # Tailwind CSS 설정
└── tsconfig.json            # TypeScript 설정
├── .env.local                       # 환경 변수
├── .eslintrc.json                   # ESLint 설정
├── .prettierrc                      # Prettier 설정
├── next.config.mjs                  # Next.js 설정
├── package.json                     # 의존성 및 스크립트
├── tailwind.config.ts               # Tailwind CSS 설정
├── tsconfig.json                    # TypeScript 설정
└── README.md                        # 프로젝트 문서
```

---

## 🏗 프로젝트 아키텍처 (Architecture)

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Next.js 14 (App Router)                   │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │   Pages      │  │  Components  │  │   Stores    │ │ │
│  │  │  - Map       │  │  - UI        │  │  (Zustand)  │ │ │
│  │  │  - Profile   │  │  - Map       │  │  - mapStore │ │ │
│  │  │  - Shop      │  │  - Auth      │  │  - userStore│ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Kakao Maps API                             │
│  - Map Rendering                                             │
│  - Geocoding                                                 │
│  - Location Services                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Supabase (BaaS)                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Auth       │  │  PostgreSQL  │  │     Storage      │  │
│  │  - Users     │  │  - profiles  │  │  - Images        │  │
│  │  - Sessions  │  │  - shops     │  │  - Avatars       │  │
│  │             │  │  - reviews   │  │                  │  │
│  │              │  │  - suggestions│ │                  │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 데이터 흐름 (Data Flow)

```
User Action
    │
    ▼
React Component
    │
    ▼
Zustand Store (State Management)
    │
    ├─────────────────┬─────────────────┐
    ▼                 ▼                 ▼
Kakao Maps API   Supabase Client   Next.js API Route
    │                 │                 │
    │                 ▼                 ▼
    │          PostgreSQL DB      Supabase Storage
    │                 │                 │
    └─────────────────┴─────────────────┘
                      │
                      ▼
              Update UI (Re-render)
```

---

## 💾 데이터베이스 구조 (Database Structure)

### ERD (Entity Relationship Diagram)

```
┌─────────────────────┐
│    auth.users       │
│  (Supabase Auth)    │
├─────────────────────┤
│ id (UUID, PK)       │
│ email               │
│ created_at          │
└─────────────────────┘
         │
         │ 1:1
         ▼
┌─────────────────────┐         ┌─────────────────────┐
│     profiles        │         │       shops         │
├─────────────────────┤         ├─────────────────────┤
│ id (UUID, PK, FK)   │         │ id (bigint, PK)     │
│ nickname            │         │ name                │
│ avatar_url          │         │ address             │
│ updated_at          │         │ latitude            │
└─────────────────────┘         │ longitude           │
         │                      │ images              │
         │                      │ category            │
         │                      │ created_at          │
         │                      └─────────────────────┘
         │                               │
         │                               │
         │ 1:N                          │ 1:N
         ├───────────────────────────────┤
         │                               │
         ▼                               ▼
┌─────────────────────┐         ┌─────────────────────┐
│      reviews        │         │  shop_suggestions   │
├─────────────────────┤         ├─────────────────────┤
│ id (bigint, PK)     │         │ id (bigint, PK)     │
│ shop_id (FK)        │         │ user_id (FK)        │
│ user_id (FK)        │         │ shop_name           │
│ rating (1-5)        │         │ address             │
│ content             │         │ images              │
│ created_at          │         │ product_info        │
└─────────────────────┘         │ is_processed        │
│ UNIQUE(shop_id,     │         │ admin_note          │
│        user_id)     │         │ created_at          │
└─────────────────────┘         └─────────────────────┘
```

### 테이블 상세 (Table Details)

#### 1. profiles
사용자 프로필 정보를 저장하는 테이블

```sql
CREATE TABLE public.profiles (
  id UUID NOT NULL,
  nickname TEXT NULL,
  avatar_url TEXT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NULL,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) 
    REFERENCES auth.users (id) ON DELETE CASCADE
);
```

**컬럼 설명**:
- `id`: 사용자 고유 식별자 (auth.users의 id와 1:1 매핑)
- `nickname`: 사용자 닉네임
- `avatar_url`: 프로필 이미지 URL (Supabase Storage)
- `updated_at`: 프로필 수정 일시

#### 2. shops
가게 정보를 저장하는 테이블

```sql
CREATE TABLE public.shops (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  name TEXT NOT NULL,
  address TEXT NULL,
  latitude DECIMAL(10, 8) NULL,
  longitude DECIMAL(11, 8) NULL,
  images TEXT[] NULL,
  category TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT NOW(),
  CONSTRAINT shops_pkey PRIMARY KEY (id)
);
```

**컬럼 설명**:
- `id`: 가게 고유 식별자
- `name`: 가게 이름
- `address`: 가게 주소
- `latitude`: 위도
- `longitude`: 경도
- `images`: 가게 이미지 URL 배열
- `category`: 가게 카테고리
- `created_at`: 생성 일시

#### 3. reviews
가게 리뷰를 저장하는 테이블

```sql
CREATE TABLE public.reviews (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  shop_id BIGINT NOT NULL,
  user_id UUID NOT NULL,
  rating INTEGER NOT NULL,
  content TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT NOW(),
  CONSTRAINT reviews_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_shop_id_user_id_key UNIQUE (shop_id, user_id),
  CONSTRAINT reviews_shop_id_fkey FOREIGN KEY (shop_id) 
    REFERENCES shops (id) ON DELETE CASCADE,
  CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) 
    REFERENCES auth.users (id) ON DELETE CASCADE,
  CONSTRAINT reviews_rating_check CHECK (
    (rating >= 1) AND (rating <= 5)
  )
);
```

**컬럼 설명**:
- `id`: 리뷰 고유 식별자
- `shop_id`: 가게 ID (외래 키)
- `user_id`: 작성자 ID (외래 키)
- `rating`: 별점 (1-5점)
- `content`: 리뷰 내용
- `created_at`: 작성 일시

**제약 조건**:
- `UNIQUE(shop_id, user_id)`: 한 사용자는 한 가게에 하나의 리뷰만 작성 가능
- `CHECK(rating >= 1 AND rating <= 5)`: 별점은 1-5점 사이만 허용

#### 4. shop_suggestions
사용자가 제안한 가게 정보를 저장하는 테이블

```sql
CREATE TABLE public.shop_suggestions (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  user_id UUID NULL,
  shop_name TEXT NOT NULL,
  address TEXT NULL,
  images TEXT[] NULL,
  product_info TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT NOW(),
  is_processed BOOLEAN NULL DEFAULT FALSE,
  admin_note TEXT NULL,
  CONSTRAINT shop_suggestions_pkey PRIMARY KEY (id),
  CONSTRAINT shop_suggestions_user_id_fkey FOREIGN KEY (user_id) 
    REFERENCES auth.users (id) ON DELETE SET NULL
);
```

**컬럼 설명**:
- `id`: 제안 고유 식별자
- `user_id`: 제안자 ID (외래 키)
- `shop_name`: 제안 가게 이름
- `address`: 가게 주소
- `images`: 가게 이미지 URL 배열
- `product_info`: 상품 정보
- `created_at`: 제안 일시
- `is_processed`: 처리 여부 (기본값: false)
- `admin_note`: 관리자 메모

---


