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

### 완료

**브랜딩 / 레이아웃**
- 헤더+히어로를 `BrandChrome`으로 통합
- 데스크톱: 스크롤 시 종착지 문구 유지, H1·설명 축소, 하단 뱃지는 아래 줄
- 모바일: 히어로 카피/배 이미지 없음, 상단 **메뉴**로 플랫폼 목록 드롭다운
- 데스크톱 사이드바는 sticky 없음(본문과 함께 스크롤)
- 디자인 토큰: `deep-navy` / `starlight-gold` / `light-sand` / `parchment`

**홈 = 여행 후기**
- 네이버 블로그 RSS (`lib/reviews/naverBlogRss.ts`, 기본 ID `dlthdus12345`)
- 무한 스크롤(10개씩, 약간의 로딩 지연 + 스켈레톤)
- 카드에 제목 기반 키워드 칩
- 하단 SEO는 접힌 `<details>` (제목 모음·가이드·FAQ) — 숨김 클로킹 아님
- `ReviewFeedProgress`로 「N개 후기 중 n개 표시」뱃지 연동

**플랫폼 할인코드**
- `/hotelscom` `/tripcom` `/myrealtrip` `/agoda` `/klook` `/nol`
- `/expedia` `/booking` `/yanolja` `/yeogi` `/airbnb` (가이드·결제팁·FAQ mock 포함, `listed: true`)
- 쿠폰 가로바(복사 / GO), 플랫폼별 가이드·결제팁·FAQ
- 플랫폼·할인코드: Sanity (`lib/content/catalog.ts`). 가이드·FAQ는 당분간 `data/mockData.ts`

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

1. ~~Vercel 배포 + `NEXT_PUBLIC_SITE_URL`~~ → https://travel-coupon.vercel.app
2. 아래 **다음 기능 (SEO·UX)** 2순위부터 구현
3. 실제 제휴 링크·쿠폰 코드·유효기간 교체
4. ~~플랫폼·할인코드 Sanity 연동~~ → 가이드/FAQ Sanity화는 이후
5. Search Console / 네이버 서치어드바이저 등록

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

### Sanity 연결

1. [sanity.io/manage](https://www.sanity.io/manage)에서 프로젝트 생성
2. `.env.example`을 `.env.local`로 복사한 뒤 `NEXT_PUBLIC_SANITY_PROJECT_ID` 입력
3. `npx sanity login` 후 `npm run sanity:dev` → 로컬 Studio (`http://localhost:3333`)
4. Studio만 클라우드에 올릴 때 `npm run sanity:deploy`

플랫폼·할인코드 페이지는 Sanity를 읽는다(1시간 캐시). 가이드·FAQ는 당분간 mock.  
배포 시 Vercel에도 `NEXT_PUBLIC_SANITY_PROJECT_ID` / `DATASET`을 넣는다.

---

## Vercel 배포

라이브: https://travel-coupon.vercel.app  
대시보드: https://vercel.com/921014/travel-coupon  
GitHub `main` 푸시 시 자동 배포.

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
