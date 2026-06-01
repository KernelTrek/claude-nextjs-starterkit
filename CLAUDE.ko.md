# CLAUDE.md (한글 가이드)

이 파일은 이 저장소에서 코드 작업 시 Claude Code(claude.ai/code)를 위한 안내를 제공합니다.

## 빠른 시작 명령어

```bash
npm run dev      # 개발 서버 시작 (localhost:3000, Turbopack 사용)
npm run build    # 프로덕션 빌드
npm start        # 프로덕션 서버 실행
npm run lint     # ESLint 실행 (엄격 모드)
```

## 프로젝트 개요

**Claude Next Starter Kit**은 현대적이고 프로덕션 준비가 완료된 Next.js 웹 애플리케이션입니다:
- Next.js 15 with App Router
- React 19
- TypeScript (엄격 모드)
- TailwindCSS v4 (CSS-first, 설정 파일 없음)
- shadcn/ui 컴포넌트 (9개 핵심 컴포넌트)
- Supabase 인증 & 데이터베이스
- next-themes로 다크모드
- lucide-react 아이콘

## 아키텍처

### App Router 구조

```
app/
├── layout.tsx              # Root 레이아웃 (ThemeProvider, Header, Footer)
├── globals.css             # TailwindCSS v4 + shadcn/ui CSS 변수
├── page.tsx                # 랜딩 페이지 (Hero + Features + CTA)
├── (auth)/                 # 인증 페이지 라우트 그룹 (레이아웃 래퍼 없음)
│   ├── login/page.tsx      # 로그인 폼
│   └── signup/page.tsx     # 회원가입 폼
└── dashboard/              # 보호된 대시보드 영역
    ├── layout.tsx          # 대시보드 레이아웃 (사이드바 포함)
    └── page.tsx            # 대시보드 홈 (통계 카드)
```

**라우트 그룹 설명:**
- `(auth)` — 레이아웃을 추가하지 않는 그룹화된 라우트
- `dashboard` — 자체 레이아웃을 가지며 대시보드 페이지를 감쌈

### 핵심 아키텍처 결정사항

**TailwindCSS v4 - CSS-First 설정:**
- `tailwind.config.js` 파일이 없고 필요 없음
- 모든 테마 설정은 `app/globals.css`의 `@theme inline`에 위치
- CSS 변수(--color-primary, --color-background 등)는 CSS에서 정의되고 Tailwind 유틸리티로 매핑됨
- `@import "tailwindcss";` 한 줄로 전체 프레임워크 로드
- globals.css에서 라이트/다크 모드 색상 정의 확인

**Supabase 미들웨어:**
- `middleware.ts`는 모든 요청에서 실행되어 인증 토큰 갱신
- 세션 지속성을 위한 쿠키 관리
- `@supabase/ssr` 패키지 사용 (App Router 필수)
- Matcher 패턴은 정적 자산, 이미지, Next.js 내부 경로 제외

**테마 시스템 (next-themes):**
- Root 레이아웃에서 ThemeProvider로 감싸짐
- 헤더의 다크모드 토글 (Sun/Moon 아이콘 버튼)
- `<html>` 요소에 `dark` 클래스 토글
- 기본적으로 시스템 설정 존중 (`defaultTheme="system"`)

**shadcn/ui 컴포넌트:**
- 9개 UI 컴포넌트가 `components/ui/`에 수동으로 작성됨
- CLI에서 생성되지 않음 (초기화 중에 추가됨)
- Radix UI 기본 요소 + CVA(class-variance-authority) 사용
- `lib/utils.ts`의 `cn()` 유틸리티는 clsx + tailwind-merge 결합
- `components.json` 설정은 빈 tailwind 설정(v4 형식)을 가리킴

### 컴포넌트 구조

```
components/
├── ui/                     # shadcn/ui 컴포넌트
│   ├── button.tsx          # 기본 버튼 (variant 포함)
│   ├── card.tsx            # 카드 컨테이너 + 서브 컴포넌트
│   ├── input.tsx
│   ├── label.tsx
│   ├── badge.tsx
│   ├── avatar.tsx          # 폴백 포함
│   ├── separator.tsx
│   ├── dialog.tsx          # 모달
│   └── dropdown-menu.tsx
└── layout/                 # 커스텀 레이아웃 컴포넌트
    ├── header.tsx          # 상단 네비게이션
    ├── footer.tsx          # 푸터
    └── sidebar.tsx         # 대시보드 사이드바
```

### 유틸리티 & 타입

- `lib/utils.ts` — `cn()` 함수 (clsx + tailwind-merge 결합)
- `utils/supabase/client.ts` — "use client" 컴포넌트용 브라우저 클라이언트
- `utils/supabase/server.ts` — 서버 컴포넌트 + 라우트 핸들러용 서버 클라이언트 (async)
- `hooks/use-mobile.ts` — 반응형 훅 (window.innerWidth < 768 확인)
- `types/index.ts` — 공유 TypeScript 타입 (User, AuthSession, ApiResponse)

## 환경 변수

`.env.local.example`에서 `.env.local`을 생성하세요:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**`NEXT_PUBLIC_` 접두사** = 브라우저에 노출됨. 여기에 절대 시크릿을 넣지 마세요.

미들웨어는 이들이 없으면 500 에러를 던집니다. 테스트할 때는 모든 플레이스홀더 값이 충분합니다.

## 개발 패턴

### 새로운 페이지 추가하기

1. `app/path/page.tsx`에 라우트 생성
2. 필요하면 라우트 그룹으로 감싸기: `app/(group)/path/page.tsx`
3. 기본적으로 서버 컴포넌트 사용; 상호작용이 필요할 때만 `"use client"` 추가
4. 레이아웃 컴포넌트(Header, Footer)는 root 레이아웃에서 주입됨

**예: `/docs`에 새 페이지**
```tsx
export default function DocsPage() {
  return <h1>Documentation</h1>
}
```

### 새로운 UI 컴포넌트 추가하기

1. `components/ui/new-component.tsx`에서 새 파일 생성
2. React 훅 사용 시 `"use client"`로 감싸기
3. 컴포넌트에서 내보내기; 페이지에서 임포트
4. 조건부 클래스에 `cn()` 사용

**패턴:**
```tsx
"use client"
import { cn } from "@/lib/utils"

export function MyComponent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("base-classes", className)} {...props} />
}
```

### 서버 vs 클라이언트 컴포넌트

- **기본값: 서버 컴포넌트** ("use client" 없음)
  - 서버 측에서 데이터 가져오기
  - 환경 변수 직접 접근
  - 더 작은 번들 크기
- **"use client" 사용 시기:**
  - 상태 (useState, useReducer)
  - Effects (useEffect)
  - Context 소비자
  - 이벤트 핸들러 (onClick, onChange)

### 스타일링

- Tailwind 클래스 직접 사용 (예: `className="p-4 bg-primary text-white"`)
- 조건부 스타일의 경우 `cn()` 사용: `cn("base", isDark && "dark:bg-slate-900")`
- 반응형: `sm:`, `md:`, `lg:` 접두사 (모바일 우선)
- 다크모드: `<html>`에 `.dark` 클래스 + `dark:` 접두사

**색상 토큰** (globals.css에서):
- `bg-background`, `text-foreground` (페이지 배경/텍스트)
- `bg-primary`, `text-primary-foreground` (버튼, 높은 강조)
- `bg-secondary`, `text-secondary-foreground` (낮은 강조)
- `bg-muted`, `text-muted-foreground` (미묘한 텍스트)
- `bg-accent`, `text-accent-foreground` (상호작용 상태)
- `bg-destructive`, `text-destructive-foreground` (에러)

### Supabase 통합

**서버 컴포넌트 (Server Action 또는 Route Handler):**
```tsx
import { createClient } from "@/utils/supabase/server"

export default async function MyComponent() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("table").select()
  return <div>{data?.length}</div>
}
```

**클라이언트 컴포넌트:**
```tsx
"use client"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"

export default function MyComponent() {
  const [data, setData] = useState([])
  useEffect(() => {
    const supabase = createClient()
    supabase.from("table").select().then(({ data }) => setData(data || []))
  }, [])
  return <div>{data.length}</div>
}
```

**인증:**
```tsx
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
```

## TypeScript 설정

- tsconfig.json에서 `strict: true`
- 경로 별칭: `@/*`는 프로젝트 루트에 매핑
- Next.js는 `next/types` 빌트인 타입 제공

## 중요 참고사항

1. **tailwind.config.js 없음** — 생성하면 무시됩니다. 모든 설정은 globals.css의 `@theme inline`에 있습니다.

2. **미들웨어 토큰 갱신** — 인증 토큰은 모든 요청에서 자동으로 갱신됩니다. 보호된 페이지에 대한 수동 토큰 처리 불필요.

3. **큰 컴포넌트의 동적 임포트** — Next.js 코드 분할은 자동이지만, 클라이언트 측 분할에는 `dynamic()` 사용:
   ```tsx
   import dynamic from "next/dynamic"
   const HeavyChart = dynamic(() => import("@/components/charts/heavy"), { loading: () => <p>Loading...</p> })
   ```

4. **Async 서버 함수** — `app/layout.tsx`는 정적 메타데이터를 내보냅니다. root 레이아웃에 동적 데이터를 추가하면 `export const dynamic = "force-dynamic"` 마크 필요.

5. **CSS Module vs Tailwind** — 이 프로젝트는 Tailwind만 사용합니다. CSS 모듈(`*.module.css`) 없음.

6. **새로운 shadcn/ui 컴포넌트 추가** — 실행:
   ```bash
   npx shadcn@latest add <component-name>
   ```
   또는 [ui.shadcn.com](https://ui.shadcn.com)에서 수동으로 복사

## 일반적인 작업

**단일 파일 linter 확인:**
```bash
npx eslint ./app/page.tsx
```

**타입 체크만 (emit 없음):**
```bash
npx tsc --noEmit
```

**프로덕션 빌드 및 테스트:**
```bash
npm run build && npm start
```

**미들웨어 문제 디버깅:**
- 미들웨어 로그는 dev 서버 콘솔에 나타남
- `.env.local`에 유효한 Supabase 키 확인
- 잘못된 env 변수는 페이지 도달 전에 500 에러 발생

## Git & 배포

- 저장소: https://github.com/KernelTrek/claude-nextjs-starterkit
- 브랜치: `main`
- `.env.local`은 `.gitignore`에 있음 — 절대 시크릿 커밋 금지
- Vercel, Netlify, 또는 셀프호스팅 준비 완료 (Node.js 20+)

## 추가 리소스

- [README.md](./README.md) — 프로젝트 개요 및 시작 가이드
- [Next.js 문서](https://nextjs.org/docs)
- [shadcn/ui 문서](https://ui.shadcn.com/)
- [TailwindCSS 문서](https://tailwindcss.com/)
- [Supabase 문서](https://supabase.com/docs)
