import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Wand2, GitBranch, FlaskConical, Bot } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Wand2,
    title: "From idea to structured prompt",
    description: "CO-STAR, RISEN, CRISPE — frameworks applied automatically.",
  },
  {
    icon: GitBranch,
    title: "Version every iteration",
    description: "Git-style history for every prompt you build.",
  },
  {
    icon: FlaskConical,
    title: "Test across all LLMs",
    description: "Claude, GPT-4o, Gemini — parallel in one click.",
  },
  {
    icon: Bot,
    title: "AI Companion included",
    description: "Context-aware agent that knows your project.",
  },
];

function AuthPanel() {
  return (
    <div className="auth-panel-bg relative hidden h-full flex-col justify-between overflow-hidden lg:flex">
      {/* Mesh gradient */}
      <div className="auth-panel-mesh absolute inset-0" />

      {/* Dot grid */}
      <div className="auth-panel-dots absolute inset-0 opacity-[0.12]" />

      {/* Corner glows */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-12 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

      {/* Horizontal accent line */}
      <div className="auth-panel-line absolute left-0 right-0 top-1/3 h-px" />

      {/* Bottom vignette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-10">
        {/* Logo */}
        <Link href="/">
          <Logo size="md" />
        </Link>

        {/* Value prop */}
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">
            Prompt Engineering Platform
          </p>
          <h2 className="mb-8 text-3xl font-bold leading-snug tracking-tight text-white">
            Stop guessing.
            <br />
            Start engineering
            <br />
            your prompts.
          </h2>

          <ul className="space-y-5">
            {HIGHLIGHTS.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-white/50">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <div className="auth-panel-card rounded-xl p-4">
          <div className="mb-3 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="h-3.5 w-3.5 fill-primary" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-sm italic text-white/70">
            &ldquo;ThinkBuild cut our prompt iteration time in half. The versioning alone
            is worth it.&rdquo;
          </p>
          <div className="mt-3 flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/25 text-xs font-semibold text-primary ring-1 ring-primary/40">
              A
            </div>
            <div>
              <p className="text-xs font-medium text-white">Alex R.</p>
              <p className="text-xs text-white/50">Senior Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthPanel />

      {/* Right — form panel */}
      <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-12">
        {/* Logo — mobile only */}
        <div className="mb-8 lg:hidden">
          <Link href="/">
            <Logo size="md" />
          </Link>
        </div>

        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
