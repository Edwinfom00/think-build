@AGENTS.md

---

# ThinkBuild — Project Bible

## What Is This App

**ThinkBuild** is a **Prompt Engineering Platform** — its kernel is prompt generation and engineering. The mission: take a user from a raw idea to a powerful, structured, ready-to-use prompt for any major LLM (Claude, GPT-4o, Gemini, Cursor, etc.), then accompany them through every subsequent step of their build journey.

This is NOT just a prompt editor. It is a full productivity platform for AI-assisted development and ideation — as polished for non-technical users as for senior engineers.

---

## Non-Negotiable Rules

1. **Never write business logic in `src/app/`** — app/ only imports views and components from `src/modules/`. Zero logic.
2. **No client components in app/ routes** — only Server Components and module imports.
3. **Read `node_modules/next/dist/docs/` before writing any Next.js code.** This is Next.js 16 with breaking changes.
4. **shadcn/ui components only** — use `src/components/ui/` exclusively. Only add external libraries with explicit justification.
5. **All shared custom components go in `src/components/shared/`** — never in modules or app.
6. **Every module is self-contained**: `components/`, `views/`, `hooks/`, `server/`, `types/` — no cross-module imports except through defined type contracts.
7. **Define the Prisma schema fully before writing module code** — never add models ad hoc.
8. **TypeScript strict mode** — no `any`, no implicit types on function signatures.
9. **Design tokens first** — never hardcode colors, spacing, or font sizes outside CSS variables or Tailwind theme tokens.
10. **All LLM calls are server-side only** — never expose API keys to the client under any circumstances.
11. **All API keys stored encrypted** — use `encrypt()` / `decrypt()` from `src/lib/crypto.ts` before any DB write/read.

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16.2.2 | App Router only. Read docs before coding. |
| Runtime | React 19.2.4 | Server Components by default |
| Language | TypeScript strict | No `any` |
| Database | PostgreSQL on Neon | Connection string in `DATABASE_URL` env var |
| ORM | Prisma v7 | Schema at `prisma/schema.prisma`, output `src/generated/prisma` |
| Auth | better-auth v1.5.6 | Email+Password + Google + GitHub OAuth |
| UI Components | shadcn/ui (radix-nova) | Source of truth for all UI |
| Styling | Tailwind CSS v4 | CSS variables for all tokens |
| Icons | Lucide React | Only icon library |
| Themes | next-themes | Dark-first, light mode toggle |
| Toasts | Sonner | Already configured |
| Font | Geist + Geist Mono | Already configured |
| Animations | tw-animate-css | Already imported |
| Deployment | Vercel | Node.js runtime (not Edge) for crypto + Prisma |

---

## Folder Architecture

```
src/
  app/                          ← ROUTES ONLY — no logic
    (marketing)/                ← Landing page, pricing, about
      page.tsx                  ← Landing page (critical — see Landing Page section)
      layout.tsx
    (auth)/                     ← Auth pages
      sign-in/page.tsx
      sign-up/page.tsx
      layout.tsx
    (onboarding)/               ← Onboarding flow
      onboarding/page.tsx
      layout.tsx
    (dashboard)/                ← Main app shell
      layout.tsx                ← Sidebar + topbar
      dashboard/page.tsx
      workspace/
        [workspaceId]/
          page.tsx
          project/
            [projectId]/
              page.tsx
              prompt/
                [promptId]/page.tsx
    api/
      auth/[...all]/route.ts    ← better-auth handler (done)
      invitations/route.ts      ← Workspace invitation validation

  modules/                      ← ALL BUSINESS LOGIC
    auth/
      components/               ← SignInForm, SignUpForm, OAuthButtons
      views/                    ← SignInView, SignUpView
      hooks/                    ← useSession, useAuth
      server/                   ← session helpers, auth actions
      types/                    ← User, Session, Role types
    onboarding/
      components/               ← OnboardingStep, ProgressBar, QuestionCard
      views/                    ← OnboardingView
      hooks/                    ← useOnboarding
      server/                   ← saveOnboardingData server action
      types/                    ← OnboardingData
    workspace/
      components/               ← WorkspaceCard, CreateWorkspaceDialog, MemberList
                                   InviteDialog, RoleSelect, InvitationBanner
      views/                    ← WorkspaceListView, WorkspaceView, WorkspaceSettings
      hooks/                    ← useWorkspace, useMembers
      server/                   ← workspace CRUD, invite link generation, OTP
      types/                    ← Workspace, WorkspaceMember, WorkspaceRole, Invitation
    project/
      components/               ← ProjectCard, CreateProjectDialog
      views/                    ← ProjectView, ProjectListView
      hooks/                    ← useProject
      server/                   ← project CRUD server actions
      types/                    ← Project, ProjectStatus
    prompt/                     ← THE KERNEL — most important module
      components/               ← PromptEditor, VariableInput, FrameworkSelector
                                   PromptOutput, TokenCounter, CopyButton
                                   VersionHistory, PromptDiffView, TechniqueGuide
      views/                    ← PromptBuilderView, PromptLibraryView
      hooks/                    ← usePromptBuilder, usePromptVersion
      server/                   ← prompt CRUD, LLM execution, auto-correction
      types/                    ← Prompt, PromptVersion, PromptVariable, Framework
      agent/                    ← AI-powered prompt improvement logic
    template/
      components/               ← TemplateCard, TemplatePreview, TemplateFilter
      views/                    ← TemplateLibraryView
      hooks/                    ← useTemplate
      server/                   ← template CRUD
      types/                    ← Template, TemplateCategory
    role/
      components/               ← RoleCard, RoleSelector
      views/                    ← RoleLibraryView
      server/                   ← role CRUD
      types/                    ← Role (Expert Persona with system prompt)
    ab-testing/
      components/               ← ABTestPanel, VariantComparison, MetricsChart
      views/                    ← ABTestView
      hooks/                    ← useABTest
      server/                   ← ab test CRUD and results
      types/                    ← ABTest, ABVariant, ABResult
    chain/                      ← Prompt Chaining (visual editor)
      components/               ← ChainNode, ChainCanvas, ChainEdge
      views/                    ← ChainBuilderView
      hooks/                    ← useChain
      server/                   ← chain CRUD and execution
      types/                    ← PromptChain, ChainNode, ChainEdge
    llm/                        ← LLM integrations + key management
      components/               ← ApiKeyManager, KeyGuide, ProviderCard
      views/                    ← ApiKeySettingsView
      server/
        providers/
          claude.ts             ← Anthropic SDK, streaming + extended thinking
          openai.ts             ← OpenAI SDK, structured outputs
          gemini.ts             ← Google Generative AI SDK
        index.ts                ← Unified LLMProvider interface
        execute.ts              ← Server action: decrypt key → call LLM → log
      types/                    ← LLMProvider, LLMConfig, LLMResponse, LLMExecution
    agent/                      ← Companion AI assistant
      components/               ← AgentChat, AgentMessage, AgentInput, AgentPanel
      views/                    ← AgentView (persistent in dashboard sidebar)
      hooks/                    ← useAgent
      server/                   ← agent conversation server actions
      types/                    ← AgentMessage, AgentConversation

  components/
    ui/                         ← shadcn/ui components (DO NOT EDIT manually)
    shared/                     ← Custom shared components used across modules
                                   AppShell, PageHeader, EmptyState, LoadingState
                                   ThemeToggle, Logo, UserMenu, BreadcrumbNav

  lib/
    auth.ts                     ← better-auth config
    prisma.ts                   ← Prisma singleton
    utils.ts                    ← cn() and other pure utilities
    crypto.ts                   ← encrypt() / decrypt() for API key storage

  hooks/
    use-mobile.ts               ← global hooks (non-module-specific)

  generated/
    prisma/                     ← auto-generated, never edit manually
```

---

## Database Schema (Prisma)

All models must be defined before writing modules. Complete reference:

```prisma
// === BETTER-AUTH MANAGED (auto-generated via `npx better-auth generate`) ===
model User {
  id            String    @id
  name          String
  email         String    @unique
  emailVerified Boolean
  image         String?
  createdAt     DateTime
  updatedAt     DateTime
  // Relations
  profile       UserProfile?
  workspaceMembers WorkspaceMember[]
  ownedWorkspaces  Workspace[]
  llmConfigs    LLMConfig[]
  agentConversations AgentConversation[]
  executionLogs ExecutionLog[]
}

model Session { ... }   // managed by better-auth
model Account { ... }   // managed by better-auth (OAuth)
model Verification { ... }

// === APPLICATION MODELS ===

model UserProfile {
  id            String   @id @default(cuid())
  userId        String   @unique
  user          User     @relation(...)
  profession    String?
  techLevel     TechLevel
  mainUseCase   String?
  llmsUsed      String[]
  interests     String[]
  bigChallenge  String?
  referralSource String?
  completedAt   DateTime?
  createdAt     DateTime @default(now())
}

enum TechLevel { NON_TECHNICAL BEGINNER INTERMEDIATE EXPERT }

model Workspace {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  icon        String?
  description String?
  ownerId     String
  owner       User     @relation(...)
  members     WorkspaceMember[]
  projects    Project[]
  invitations Invitation[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model WorkspaceMember {
  id          String        @id @default(cuid())
  workspaceId String
  workspace   Workspace     @relation(...)
  userId      String
  user        User          @relation(...)
  role        MemberRole    @default(VIEWER)
  joinedAt    DateTime      @default(now())
  @@unique([workspaceId, userId])
}

enum MemberRole { OWNER ADMIN EDITOR VIEWER }

model Invitation {
  id          String    @id @default(cuid())
  workspaceId String
  workspace   Workspace @relation(...)
  code        String    @unique  // 6-digit OTP
  link        String    @unique  // shareable token
  role        MemberRole @default(VIEWER)
  usedBy      String?
  expiresAt   DateTime
  createdAt   DateTime  @default(now())
}

model Project {
  id           String    @id @default(cuid())
  workspaceId  String
  workspace    Workspace @relation(...)
  name         String
  description  String?
  initialIdea  String?   // from onboarding or user input
  status       ProjectStatus @default(ACTIVE)
  prompts      Prompt[]
  abTests      ABTest[]
  chains       PromptChain[]
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

enum ProjectStatus { ACTIVE ARCHIVED }

model Prompt {
  id          String    @id @default(cuid())
  projectId   String
  project     Project   @relation(...)
  title       String
  content     String    @db.Text
  framework   String?   // CO-STAR, RISEN, CRISPE, etc.
  technique   String?   // CoT, Few-Shot, ReAct, etc.
  variables   Json      // array of {name, type, defaultValue}
  modelTarget String?   // claude, openai, gemini, universal
  versions    PromptVersion[]
  executions  ExecutionLog[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model PromptVersion {
  id          String   @id @default(cuid())
  promptId    String
  prompt      Prompt   @relation(...)
  content     String   @db.Text
  variables   Json
  commitMsg   String   // required, like a git commit message
  versionNum  Int
  createdAt   DateTime @default(now())
}

model Template {
  id          String   @id @default(cuid())
  title       String
  description String?
  content     String   @db.Text
  framework   String?
  technique   String?
  category    String
  isPublic    Boolean  @default(true)
  createdById String?
  usageCount  Int      @default(0)
  createdAt   DateTime @default(now())
}

model Role {
  id           String   @id @default(cuid())
  name         String   // "Cloud Architect", "Security Expert"
  description  String?
  systemPrompt String   @db.Text
  category     String   // "Engineering", "Design", "Business"
  isPublic     Boolean  @default(true)
  createdById  String?
  createdAt    DateTime @default(now())
}

model ABTest {
  id          String      @id @default(cuid())
  projectId   String
  project     Project     @relation(...)
  title       String
  variantA    ABVariant   @relation("VariantA", ...)
  variantB    ABVariant   @relation("VariantB", ...)
  status      ABTestStatus @default(RUNNING)
  createdAt   DateTime    @default(now())
}

model ABVariant {
  id          String   @id @default(cuid())
  label       String   // "A" or "B"
  promptContent String @db.Text
  results     ABResult[]
}

model ABResult {
  id          String   @id @default(cuid())
  variantId   String
  variant     ABVariant @relation(...)
  output      String   @db.Text
  latencyMs   Int
  tokenCount  Int
  score       Float?   // optional quality score
  createdAt   DateTime @default(now())
}

model PromptChain {
  id          String      @id @default(cuid())
  projectId   String
  project     Project     @relation(...)
  name        String
  nodes       ChainNode[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model ChainNode {
  id          String      @id @default(cuid())
  chainId     String
  chain       PromptChain @relation(...)
  order       Int
  title       String
  promptContent String   @db.Text
  outputVar   String?    // variable name to store output for next node
  createdAt   DateTime   @default(now())
}

model LLMConfig {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(...)
  provider     LLMProvider
  encryptedKey String   // AES-256-GCM encrypted, via lib/crypto.ts
  isDefault    Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  @@unique([userId, provider])
}

enum LLMProvider { CLAUDE OPENAI GEMINI DEEPSEEK MISTRAL }

model AgentConversation {
  id          String         @id @default(cuid())
  userId      String
  user        User           @relation(...)
  workspaceId String?
  projectId   String?
  title       String?
  messages    AgentMessage[]
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
}

model AgentMessage {
  id             String            @id @default(cuid())
  conversationId String
  conversation   AgentConversation @relation(...)
  role           MessageRole       // USER | ASSISTANT
  content        String            @db.Text
  createdAt      DateTime          @default(now())
}

enum MessageRole { USER ASSISTANT }

model ExecutionLog {
  id          String      @id @default(cuid())
  userId      String
  user        User        @relation(...)
  promptId    String?
  provider    LLMProvider
  model       String
  inputTokens Int
  outputTokens Int
  latencyMs   Int
  costUsd     Float?
  status      String      // success | error
  errorMsg    String?
  createdAt   DateTime    @default(now())
}
```

---

## Authentication

**better-auth v1.5.6** with three providers:

```typescript
// src/lib/auth.ts
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: { clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! },
    github: { clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! },
  },
})
```

Also export a `authClient` for use in hooks/client components.

### Workspace Invitation System
- Admin generates an invitation: unique `link` token + 6-digit `code` OTP
- Share method: copy both together (link + code shown in a single copyable block)
- Invited user: clicks link → lands on `/join/[token]` → enters 6-digit code → account created or linked → added to workspace with assigned role
- OTP expires in 72 hours
- Admin can set role (VIEWER / EDITOR / ADMIN) before generating invite
- Admin can revoke any invitation or change any member's role at any time

---

## API Key Encryption System

File: `src/lib/crypto.ts`

### Algorithm
**AES-256-GCM** — authenticated encryption with:
- 256-bit key derived from `ENCRYPTION_KEY` env var (must be 32 bytes)
- Random 12-byte IV per encryption
- 16-byte auth tag for integrity

```typescript
// Interface exposed:
export function encrypt(plaintext: string): string
// Returns: base64( iv[12] + tag[16] + ciphertext ) — single storable string

export function decrypt(stored: string): string
// Splits the stored string, verifies auth tag, returns plaintext

// Decision tree for key retrieval:
// 1. User has LLMConfig for provider? → decrypt and use
// 2. No key for provider? → prompt ApiKeyManager UI + link to guide
// 3. Guide shows: step-by-step per provider how to get an API key
```

### API Key Guide (in-app)
A modal/page accessible from settings when a user has no key for a provider:
- Tree of choice: "Which provider do you want to use?"
- Per provider: numbered steps to get an API key (link to provider dashboard)
- Emphasize: the key is stored encrypted, never readable by ThinkBuild

### `.env` Variables Required
```
DATABASE_URL=           # Neon PostgreSQL connection string
BETTER_AUTH_SECRET=     # Random 32+ char string
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
ENCRYPTION_KEY=         # Exactly 32 bytes, hex encoded (64 hex chars)
NEXT_PUBLIC_APP_URL=    # https://thinkbuild.app (or localhost)
```

---

## Design System

### Philosophy
- **Dark-first**, clean light mode via `next-themes`
- Reference: Linear, Vercel Dashboard, Claude.ai — dense, professional, intentional
- Every pixel matters. Design = product.

### Color Palette (CSS Variables in `globals.css`)

**Primary accent: Blue `#2563EB` = `oklch(0.546 0.215 262.9)`**

```css
:root {  /* Light mode */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.546 0.215 262.9);        /* #2563EB — ThinkBuild Blue */
  --primary-foreground: oklch(1 0 0);          /* White text on blue */
  --primary-hover: oklch(0.48 0.215 262.9);   /* Slightly darker on hover */
  /* ... rest of tokens ... */
}

.dark {  /* Dark mode */
  --background: oklch(0.12 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.60 0.215 262.9);         /* Slightly lighter blue in dark */
  --primary-foreground: oklch(1 0 0);
  /* ... */
}
```

**Palette:**
- Background dark: `oklch(0.12 0 0)` — near black, not pure black
- Surface dark: `oklch(0.16 0 0)` — card/panel background
- Border dark: `oklch(1 0 0 / 8%)` — subtle borders
- Muted: `oklch(0.45 0 0)` — secondary text
- Blue primary: `oklch(0.546 0.215 262.9)` — `#2563EB`
- Destructive: keep existing red

### Typography
- Sans: Geist — UI labels, body text
- Mono: Geist Mono — **all prompt content, code, variables** — critical for the editor
- Scale: `text-xs` through `text-2xl` — use Tailwind scale, no custom sizes

### Layout Conventions
- Dashboard: fixed sidebar (240px) + topbar (56px) + scrollable main
- Prompt editor: 2-column split (editor left, output right) on desktop, stacked on mobile
- Cards: `rounded-xl` with subtle border, `shadow-none` in dark mode
- Modals/sheets: use `Sheet` for context panels, `Dialog` for confirmations

### Spacing
- Section padding: `p-6` (24px)
- Card inner: `p-4` or `p-5`
- Stack gaps: `gap-3` (12px) for form fields, `gap-6` for sections

---

## Landing Page (MANDATORY — Phase 1)

The landing page is a critical first impression. It must be exceptional.

### Sections (in order)

**1. Navigation Bar**
- Logo (ThinkBuild) left
- Links: Features, How it works, Pricing
- Right: Sign In + "Get Started" CTA button (blue primary)
- Sticky, blur backdrop in dark mode

**2. Hero Section**
- Headline: bold, large, punchy — communicate the core value in ≤10 words
- Sub-headline: 1-2 sentences expanding the promise
- Two CTAs: "Start for free" (primary blue) + "See it in action" (ghost)
- Visual: animated prompt editor mockup / screenshot of the app
- Background: subtle grid or noise texture, dark

**3. Problem → Solution Block**
- Three pain points (what prompt engineering is today: inconsistent, manual, lost context)
- Arrow / transition to ThinkBuild's solution
- Clean, icon-backed cards

**4. Features Showcase**
- 6 core features with icon + title + description:
  1. Prompt Builder (the kernel)
  2. Multi-LLM Testing
  3. A/B Prompt Testing
  4. Prompt Versioning (Git for prompts)
  5. Template Library (CO-STAR, RISEN, etc.)
  6. AI Companion Agent
- Layout: 2×3 grid on desktop, 1-col on mobile

**5. How It Works (3 Steps)**
- Step 1: Describe your idea
- Step 2: ThinkBuild builds your perfect prompt
- Step 3: Test, iterate, and ship with your LLM
- Visual flow with numbered steps + illustrative screenshots

**6. Supported LLMs Strip**
- Logos: Claude, GPT-4, Gemini, Cursor, Mistral, DeepSeek
- "Works with every major AI model"

**7. Pricing Section** [TBD: confirm tiers]
- 3 tiers: Free / Pro / Team
- Clear feature comparison
- Primary CTA on recommended tier

**8. Footer**
- Logo + tagline
- Links: Product, Company, Legal
- Social: GitHub, Twitter/X
- Dark background

### Landing Page Technical Rules
- All Server Components — no client state on landing
- Animations: `tw-animate-css` only, no Framer Motion unless justified
- Images: Next.js `<Image>` with blur placeholder
- Performance: Core Web Vitals must be green

---

## Prompt Engineering Kernel — Core Knowledge

### Techniques to Support
1. **Zero-Shot** — Direct instruction, no examples
2. **Few-Shot** — 2-10 examples embedded
3. **Chain-of-Thought (CoT)** — Step-by-step: "Let's think step by step"
4. **Tree of Thoughts (ToT)** — Multiple branches, evaluate and backtrack
5. **ReAct** — Reason + Act loops (foundation for agent workflows)
6. **Self-Consistency** — Multiple outputs, majority vote
7. **Step-Back Prompting** — Abstraction before specific answer
8. **Least-to-Most** — Sub-problems in increasing difficulty
9. **APE** — LLM generates + selects optimal prompts
10. **Program of Thought** — Output code instead of reasoning prose

### Frameworks as Templates
- **CO-STAR**: Context, Objective, Style, Tone, Audience, Response
- **RISEN**: Role, Instructions, Steps, End Goal, Narrowing
- **CRISPE**: Capacity/Role, Request, Insight, Statement, Personality, Experiment
- **TRACE**: Task, Requirements, Action, Context, Examples
- **TAG**: Task, Action, Goal
- **ICIO**: Instruction, Context, Input, Output

### Model-Specific Best Practices

**Claude:** XML tags (`<instructions>`, `<context>`, `<example>`), extended thinking for complex tasks, positive > negative instructions, system prompt = high authority.

**GPT-4o:** `# Section Headers` in system prompts, structured outputs API for JSON, concise > over-specified, temperature 0 for deterministic.

**Gemini:** 1M context window for large documents, numbered instruction lists, strong step-by-step decomposition.

**Universal:** Role assignment always improves output. Specify format explicitly. Put most important instruction last. Use delimiters. Decompose complex tasks.

### Variable System
Syntax: `{{variable_name}}`
Types: `text`, `file` (JSON/SQL/logs), `code_snippet`, `url`, `number`

### Prompt Versioning
Every save creates a `PromptVersion`. Requires a commit message. Full diff view available. Rollback to any version.

### Auto-Correction Loop
1. Execute prompt against LLM
2. Companion agent analyzes output quality
3. Identifies failure pattern
4. Proposes improved prompt version
5. User approves / modifies / rejects

---

## LLM Integration Architecture

```
src/modules/llm/server/execute.ts  ← main server action

async function executeLLM(input: {
  userId: string,
  provider: LLMProvider,
  model: string,
  systemPrompt: string,
  userPrompt: string,
  variables: Record<string, string>,
  stream: boolean,
}): Promise<LLMResponse>

Flow:
  1. Load LLMConfig for userId + provider
  2. decrypt(config.encryptedKey) → apiKey
  3. Resolve {{variables}} in prompt
  4. Call provider adapter (claude.ts / openai.ts / gemini.ts)
  5. Stream response via SSE or return full response
  6. Write ExecutionLog record
  7. Return LLMResponse
```

Multi-LLM parallel execution: Promise.allSettled() across selected providers.

---

## User Onboarding Questions

These 7 questions build the skeleton of every workspace:

1. **Profession** — Developer, Designer, Product Manager, Entrepreneur, Student, Other
2. **Technical level** — Non-technical / Beginner / Intermediate / Expert
3. **What do you want to build?** — Free text + category (Web App, Mobile, Data Pipeline, Content, Other)
4. **Which LLMs do you currently use?** — Multi-select: Claude, GPT-4, Gemini, Cursor, Other
5. **Domains of interest** — Multi-select: Web Dev, Mobile, Data, Security, Design, Marketing, Finance, Other
6. **Biggest challenge with AI tools today** — Free text (short)
7. **How did you hear about us?** — Product Hunt, Twitter/X, Word of mouth, Search, Other

After completion:
- `UserProfile` created
- First `Workspace` auto-created (name = "My Workspace")
- First `Project` auto-created using answers from questions 3-5
- Redirect to Dashboard

---

## Application Flow

```
Landing Page (marketing)
  → "Get Started" / "Sign In"
    → Sign Up: Email+Password | Google | GitHub
    → Sign In: same options
  → Onboarding (7 questions, one per screen, progress bar)
  → Dashboard
    → Sidebar: workspaces, projects, companion agent
    → Workspace view: projects grid + members
    → Project view: prompts list + quick create
    → Prompt Builder (THE KERNEL):
        1. Enter raw idea in large chat-like input
        2. Select framework (CO-STAR, RISEN, etc.)
        3. Select technique (CoT, Few-Shot, etc.)
        4. Set variables with {{syntax}}
        5. Generate optimized prompt (via companion agent)
        6. Test against selected LLM(s)
        7. View streaming output
        8. Save version with commit message
        9. Iterate (auto-correction suggestions)
    → Template Library (browse + use built-in templates)
    → A/B Test Panel (Phase 2)
    → Chain Builder (Phase 3)
  → Settings (API keys, profile, workspace members, invitations)
  → Companion Agent (persistent in sidebar, context-aware)
```

---

## Feature Phases

### Phase 1 — Foundation (build first)
- [ ] Complete Prisma schema + Neon DB connection
- [ ] better-auth: email + Google + GitHub
- [ ] Landing page (all sections)
- [ ] Onboarding flow (7 questions)
- [ ] Dashboard shell (sidebar + topbar + route groups)
- [ ] Workspace + Project CRUD
- [ ] Workspace invitation system (link + OTP)
- [ ] Prompt Builder (editor + variable system + framework selector)
- [ ] LLM execution (Claude + GPT-4o minimum, BYOK)
- [ ] API key encryption/decryption + key management UI
- [ ] Prompt versioning (save + diff + rollback)
- [ ] Template library (built-in frameworks)
- [ ] Companion agent (basic chat, context-aware)

### Phase 2 — Power Features
- [ ] A/B testing (two variants, side-by-side)
- [ ] Multi-LLM parallel testing (3+ providers)
- [ ] Role/Persona library (expert system prompts)
- [ ] Auto-correction loop
- [ ] Export (markdown, JSON, copy to clipboard)
- [ ] In-app API key guide (tree of choice per provider)
- [ ] Usage dashboard (token count, cost estimate)

### Phase 3 — Advanced
- [ ] Chain builder (visual no-code DAG editor)
- [ ] File injection variables (upload JSON, SQL schema, logs)
- [ ] DSPy-style automatic prompt optimization (APE)
- [ ] Cost dashboard (per project, per model)
- [ ] Prompt injection defense scanner
- [ ] Multi-user real-time collaboration

---

## What NOT To Do

- Never write `any` in TypeScript
- Never import from another module's internals — only its exported types
- Never add logic to `src/app/` routes
- Never hardcode API keys, colors, or strings
- Never create a wrapper component for single-use — use inline JSX
- Never edit `src/generated/prisma/` manually
- Never expose LLM API keys to the client
- Never mix server and client code without explicit `'use client'` / `'use server'`
- Never call LLMs from client components — always server actions
- Never store a plaintext API key in the DB — always encrypt first
- Never skip the landing page — it is Phase 1 mandatory

---

## Key Resources

- Anthropic Prompt Engineering: `docs.anthropic.com/en/docs/build-with-claude/prompt-engineering`
- OpenAI Prompt Engineering Guide: `platform.openai.com/docs/guides/prompt-engineering`
- PromptingGuide.ai (DAIR.AI) — comprehensive free reference
- Learnprompting.org — community reference
- better-auth docs: `better-auth.com`
- Next.js 16 docs: `node_modules/next/dist/docs/` (READ THIS FIRST)
- shadcn/ui: `ui.shadcn.com`
- Neon DB: `neon.tech/docs`
