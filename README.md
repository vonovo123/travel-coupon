# 코드세이아 (Code-yssey)

여행 후기 + 플랫폼 할인코드 모음 사이트.  
**SEO(SSR·메타·본문 키워드)를 기준으로** Next.js 14 App Router + TypeScript + Tailwind + Lucide로 구성.

브랜드: **코드세이아** — Odyssey 세계관(항로·항해일지)을 UI에 일부 유지하되, 사용 안내 문구는 일반어로 정리.

```bash
npm install
npm run dev    # http://localhost:3000 (점유 시 다른 포트)
npm run build && npm start
```

---

## 2026-09-09 진행 상태

라이브: https://travel-coupon.vercel.app  
Studio: https://codeyssey.sanity.studio/  
Sanity 프로젝트 ID: `4gajz7je` / dataset `production`

### 완료

**브랜딩 / 레이아웃**
- 헤더+히어로를 `BrandChrome`으로 통합
- 데스크톱: 스크롤 시 종착지 문구 유지, H1·설명 축소, 하단 뱃지는 아래 줄
- 모바일: 히어로 카피/배 이미지 없음, 상단 **메뉴**로 플랫폼 목록 드롭다운
- 데스크톱 사이드바는 sticky 없음(본문과 함께 스크롤)
- 디자인 토큰: `deep-navy` / `starlight-gold` / `light-sand` / `parchment`
- 파비콘·Apple 아이콘: 헤더와 같은 나침반 (`app/icon.tsx`, `app/apple-icon.tsx`)

**홈 = 여행 후기**
- 네이버 블로그 RSS (`lib/reviews/naverBlogRss.ts`, 기본 ID `dlthdus12345`)
- 무한 스크롤(10개씩, 약간의 로딩 지연 + 스켈레톤)
- 카드에 제목 기반 키워드 칩
- 하단 SEO는 접힌 `<details>` (제목 모음·가이드·FAQ) — 숨김 클로킹 아님
- `ReviewFeedProgress`로 「N개 후기 중 n개 표시」뱃지 연동

**플랫폼 할인코드**
- `/hotelscom` `/tripcom` `/myrealtrip` `/agoda` `/klook` `/nol`
- `/expedia` `/booking` `/yeogi` `/airbnb` (가이드·결제팁·FAQ mock 포함, `listed: true`). `/yanolja`는 `/nol`로 보냄
- 쿠폰 가로바(복사 / 복사 & 적용), 플랫폼별 가이드·결제팁·FAQ
- 플랫폼·할인코드는 Sanity (`lib/content/catalog.ts`). 가이드·FAQ·후기 폴백은 `data/mockData.ts`
- `코드 복사 & 적용하기`: 이 페이지에서 먼저 복사. 실패하면 클립보드 권한 안내 얼럿 후 적용 페이지로 이동

**Sanity / 배포**
- Studio 메뉴: `여행 → 플랫폼` / `여행 → 메뉴` / `여행 → 코드 → 26년 9월`. 상품 메뉴 시드 `npm run sanity:seed-menus` (이미 있는 문서는 덮지 않음). 쿠폰 시드 `npm run sanity:seed` (재실행 시 Studio에서 고친 코드가 mock으로 덮임)
- 사이트는 공개된 문서를 CDN으로 읽음(토큰 없음). 배포 환경 1시간 ISR, 로컬은 fetch 캐시 끔
- Vercel env: `NEXT_PUBLIC_SANITY_PROJECT_ID` / `DATASET` / `API_VERSION` (Production·Preview·Development)
- 사이트는 서버에서 Sanity를 읽으므로 CORS에 Vercel URL이 없어도 됨. CORS origin은 로컬 Studio `http://localhost:3333`
- 클라우드 Studio 호스트: `codeyssey` (`sanity.cli.ts`)

**성능 / UX**
- RSS `cache()`로 메타+페이지 요청 중복 완화
- 홈·플랫폼 `loading.tsx` + 스켈레톤
- 리뷰 썸네일 priority/lazy·sizes 조정
- 히어로 PNG는 원본 유지(`unoptimized`)

**SEO**
- 페이지별 메타, sitemap, robots, JSON-LD
- 홈 메타는 RSS 제목 키워드 반영 (`buildHomeMetadataFromReviews`)
- OG 이미지(홈/플랫폼 1200×630)
- `/privacy` 제휴 고지·개인정보, 커스텀 404/에러, 후기 썸네일 `alt`

### 다음에 할 일

1. ~~Vercel 배포 + Sanity 연동~~ → https://travel-coupon.vercel.app
2. Studio에서 실제 제휴 링크·쿠폰 코드·유효기간 교체 (`sanity:seed` 재실행 금지)
3. 가이드/FAQ Sanity화
4. 자체 도메인(브랜드명 권장) + `NEXT_PUBLIC_SITE_URL` 갱신 + `vercel.app` 301
5. Search Console / 네이버 서치어드바이저 등록
6. 아래 **다음 기능 (SEO·UX)** 2순위부터 구현

---

## 다음 기능 (SEO·UX)

메타·사이트맵·JSON-LD·아코디언 SEO는 이미 있음.  
새 페이지를 많이 늘리기보다 **공유·신뢰·체류·얇은 콘텐츠**를 먼저 막는 방향.

### 1순위 — 배포 직후 (SEO + UX) ✅ 완료

| 항목 | 구현 |
|---|---|
| OG 이미지 (1200×630, 홈/플랫폼) | `app/opengraph-image.tsx`, `app/[platform]/opengraph-image.tsx` |
| 테스트 플랫폼 정리 | 5곳도 mock 가이드·FAQ 채운 뒤 `listed: true`로 공개. 숨기려면 `listed: false` |
| 제휴 고지 + 약관/개인정보 | 푸터 고지, `/privacy` |
| 커스텀 404 / `error.tsx` | 홈·주요 플랫폼 링크 |
| 후기 썸네일 `alt` | `{제목} 후기 썸네일` |

### 2순위 — 체감 UX

| 항목 | 왜 |
|---|---|
| 후기 키워드/목적지 필터 | 카드 칩(오사카·펜션 등)으로 걸러 무한 스크롤 부담 감소. `?q=`면 일부 SEO도 가능 |
| 쿠폰 만료·카테고리 탭 | `validUntil` 실시간 만료 표시, 숙소/항공/투어 필터 |
| 질문형 본문(접기 밖) | 할인코드 페이지만. 쿠폰 제목에서 검색형 질문 (`lib/searchQuestions.ts`). 후기는 RSS가 자주 바뀌어 제외 |
| 맨 위로 / URL 공유 | 긴 후기 목록·공유 유입 |

### 3순위 — 콘텐츠가 쌓인 뒤

| 항목 | 왜 |
|---|---|
| 목적지 허브 (`/osaka` 등) | 「오사카 숙소 후기」롱테일. 후기가 외부 블로그라 지금은 상세 URL이 없음 |
| `WebSite` / `Organization` / Breadcrumb JSON-LD | ✅ 절대 URL + `@id`로 페이지마다 출력 |
| 개별 후기 상세 페이지 | **보류.** 네이버로 나가는 구조라 중복·얇은 콘텐츠가 되기 쉬움 |

개별 후기 URL은 후기를 자체 본문으로 가져오기 전엔 만들지 않는다.

---

## 라우트

| URL | 역할 |
|---|---|
| `/` | 여행 후기(RSS) + 후기 SEO + 할인코드 내부 링크 |
| `/overseas-stay` 등 | 국내/해외 × 숙소·투어·항공·패키지 허브 |
| `/[platform]` | 플랫폼별 할인코드 + 가이드/FAQ |
| `/privacy` | 개인정보 처리방침·제휴 고지 |

`app/[platform]/page.tsx`: `generateStaticParams` + `dynamicParams = true`(Studio에 새 플랫폼을 넣으면 재빌드 없이 URL 생성).  
홈·플랫폼 `revalidate = 3600`. 로컬 개발은 Sanity fetch 캐시를 끈다.

---

## 환경 변수

`.env.example` 참고. 로컬은 `.env.local`에 복사.

| 변수 | 설명 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical/OG 기준 URL (배포 시 **필수**, 예: `https://xxx.vercel.app`) |
| `NAVER_BLOG_ID` | 네이버 블로그 ID (기본 `dlthdus12345`) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity 프로젝트 ID ([manage](https://www.sanity.io/manage)). **배포 시 필수** |
| `NEXT_PUBLIC_SANITY_DATASET` | 데이터셋 (기본 `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | GROQ API 날짜 (예: `2026-09-09`) |
| `SANITY_STUDIO_PROJECT_ID` 등 | Studio(`npm run sanity:dev`)용. Vite는 `SANITY_STUDIO_`만 주입 |
| `SANITY_STUDIO_HOST` | Studio 배포 호스트 (기본 `codeyssey` → https://codeyssey.sanity.studio/) |

### Sanity 연결

이미 프로젝트·시드·Studio 배포가 되어 있다. 새로 만들지 말고 같은 프로젝트(`4gajz7je`)를 쓴다.

| 구분 | 주소 / 명령 |
|---|---|
| 클라우드 Studio (브라우저에서 수정) | https://codeyssey.sanity.studio/ |
| 로컬 Studio | `npx sanity login` 후 `npm run sanity:dev` → http://localhost:3333 |
| 사이트 읽기 | `lib/content/catalog.ts` GROQ. 공개 dataset, 읽기 토큰 없음 |
| Studio 재배포 | `npm run sanity:deploy` (호스트 `codeyssey`) |

`npm run sanity:seed`는 초기 적재용. 다시 돌리면 Studio에서 고친 코드가 mock으로 덮인다.

### 다른 컴퓨터에서 클론

`.env.local`은 gitignore라 클론에 없다.

```bash
npm install
cp .env.example .env.local
```

`.env.local`에 `NEXT_PUBLIC_SANITY_PROJECT_ID`와 `SANITY_STUDIO_PROJECT_ID`를 `4gajz7je`로 넣는다. 나머지는 예시 기본값으로 된다. `npm run dev`만으로 사이트는 Sanity를 읽는다(로그인 불필요).

콘텐츠 수정은 Studio URL에서 같은 Sanity 계정으로 로그인하면 된다. 다른 계정이면 [manage](https://www.sanity.io/manage)에서 멤버 초대. `SANITY_API_READ_TOKEN`·Vercel CLI는 로컬 실행에 필요 없다.

---

## Vercel 배포

라이브: https://travel-coupon.vercel.app  
대시보드: https://vercel.com/921014/travel-coupon  
GitHub `main` 푸시 시 자동 배포.

Vercel에는 `NEXT_PUBLIC_SITE_URL`과 Sanity `NEXT_PUBLIC_*` 세 값이 들어가 있다. 커스텀 도메인을 붙이면 `NEXT_PUBLIC_SITE_URL`을 새 주소로 바꾸고 재배포한다.

Next.js 기본 설정으로 배포 가능 (`vercel.json`에 framework 지정).

### 1) Git 연동 (권장)

1. GitHub/GitLab에 푸시
2. [vercel.com](https://vercel.com) → Add New Project → 저장소 Import
3. Framework Preset: **Next.js** (자동 감지)
4. Environment Variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://<프로젝트>.vercel.app` (커스텀 도메인 쓰면 그 URL)
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`
   - (선택) `NAVER_BLOG_ID`
5. Deploy

배포 후 도메인이 확정되면 `NEXT_PUBLIC_SITE_URL`을 맞춘 뒤 **Redeploy** 한 번 하는 것이 좋습니다.

### 2) CLI

```bash
npm i -g vercel
vercel login
vercel          # 프리뷰
vercel --prod   # 프로덕션
```

프로젝트에 `.vercel`이 생기면 gitignore됨.

### 빌드 확인 (로컬)

```bash
npm run build
npm start
```

---

## 주요 구조 (기능별)

```
app/                         라우트 (홈·플랫폼·privacy·sitemap/robots·OG)
  icon.tsx · apple-icon.tsx  나침반 파비콘
components/
  layout/                    헤더/크롬·사이드바·푸터·로딩 셸
  reviews/                   후기 카드·무한스크롤·후기 SEO
  coupons/                   할인코드 카드·목록
  seo-ui/                     JsonLd·공통 아코디언 SEO
  pages/SitePage.tsx         홈/플랫폼 페이지 조립
data/
  mockData.ts                시드 원본 + 가이드·FAQ·후기 폴백
  offerTypes.ts              상품 허브 정의
  reviews/reviewSeoContent.ts
lib/
  brand/compassMark.tsx      파비콘·Apple 아이콘용 나침반
  content/catalog.ts         Sanity 플랫폼·쿠폰 조회
  seo.ts
  og/                        OG 이미지 렌더 + Pretendard 폰트
  reviews/                   RSS·키워드·홈 후기 fetch
types/coupon.ts
sanity/
  env.ts                     프로젝트 ID·dataset
  lib/client.ts              GROQ 클라이언트
  lib/queries.ts             플랫폼·쿠폰 쿼리
  schemaTypes/               platform·coupon
scripts/seedSanity.ts        mock → Sanity 시드
sanity.config.ts
sanity.cli.ts
```

---

## SEO 콘텐츠 규칙

| 영역 | `/` | `/[platform]` |
|---|---|---|
| 본문 허브 | 후기 + 후기용 가이드/FAQ | 해당 플랫폼 가이드·결제·FAQ만 |
| 키워드 | 카드 칩 + 메타 | 플랫폼명 중심 메타 |
| JSON-LD | 후기/FAQ | 쿠폰/FAQ |

완전 비가시 텍스트로 키워드만 숨기지 않는다. 접힌 아코디언은 HTML에 내용이 있어 색인 가능.
