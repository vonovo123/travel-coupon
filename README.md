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

## 2026-09-08 진행 상태

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
- 테스트용 추가: `/expedia` `/booking` `/yanolja` `/yeogi` `/airbnb`
- 쿠폰 가로바(복사 / GO), 플랫폼별 가이드·결제팁·FAQ
- 데이터: `data/mockData.ts` (이후 DB 교체 예정)

**성능 / UX**
- RSS `cache()`로 메타+페이지 요청 중복 완화
- 홈·플랫폼 `loading.tsx` + 스켈레톤
- 리뷰 썸네일 priority/lazy·sizes 조정
- 히어로 PNG는 원본 유지(`unoptimized`)

**SEO**
- 페이지별 메타, sitemap, robots, JSON-LD
- 홈 메타는 RSS 제목 키워드 반영 (`buildHomeMetadataFromReviews`)

### 다음에 할 일

1. Vercel 프로덕션 URL을 `NEXT_PUBLIC_SITE_URL`에 넣고 배포
2. 실제 제휴 링크·쿠폰 코드·유효기간 교체
3. DB 연동 (`getCouponsByPlatform` 등 getter만 교체)
4. OG 이미지
5. 테스트용으로 넣은 플랫폼(익스피디아 등) 정리 여부 결정
6. Search Console / 네이버 서치어드바이저 등록

---

## 라우트

| URL | 역할 |
|---|---|
| `/` | 여행 후기(RSS) + 후기 SEO |
| `/[platform]` | 플랫폼별 할인코드 + 가이드/FAQ |

`app/[platform]/page.tsx`: `generateStaticParams` + `dynamicParams = false`  
홈 `revalidate = 3600`(RSS), 플랫폼 `revalidate = 86400`.

---

## 환경 변수

`.env.example` 참고. 로컬은 `.env.local`에 복사.

| 변수 | 설명 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical/OG 기준 URL (배포 시 **필수**, 예: `https://xxx.vercel.app`) |
| `NAVER_BLOG_ID` | 네이버 블로그 ID (기본 `dlthdus12345`) |

---

## Vercel 배포

Next.js 기본 설정으로 배포 가능 (`vercel.json`에 framework 지정).

### 1) Git 연동 (권장)

1. GitHub/GitLab에 푸시
2. [vercel.com](https://vercel.com) → Add New Project → 저장소 Import
3. Framework Preset: **Next.js** (자동 감지)
4. Environment Variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://<프로젝트>.vercel.app` (커스텀 도메인 쓰면 그 URL)
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
app/                         라우트 (홈·플랫폼·sitemap/robots)
components/
  layout/                    헤더/크롬·사이드바·로딩 셸
  reviews/                   후기 카드·무한스크롤·후기 SEO
  coupons/                   할인코드 카드·목록
  seo-ui/                     JsonLd·공통 아코디언 SEO
  pages/SitePage.tsx         홈/플랫폼 페이지 조립
data/
  mockData.ts                플랫폼·쿠폰·가이드·FAQ
  reviews/reviewSeoContent.ts
lib/
  seo.ts
  reviews/                   RSS·키워드·홈 후기 fetch
types/coupon.ts
```

---

## SEO 콘텐츠 규칙

| 영역 | `/` | `/[platform]` |
|---|---|---|
| 본문 허브 | 후기 + 후기용 가이드/FAQ | 해당 플랫폼 가이드·결제·FAQ만 |
| 키워드 | 카드 칩 + 메타 | 플랫폼명 중심 메타 |
| JSON-LD | 후기/FAQ | 쿠폰/FAQ |

완전 비가시 텍스트로 키워드만 숨기지 않는다. 접힌 아코디언은 HTML에 내용이 있어 색인 가능.
