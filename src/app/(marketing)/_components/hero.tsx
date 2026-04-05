import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glow behind content */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-primary/15" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        {/* Pill badge */}
        <Badge
          variant="outline"
          className="gap-1.5 rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary"
        >
          <Sparkles className="h-3 w-3" />
          Prompt Engineering, Reimagined
        </Badge>

        {/* Headline */}
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          From idea to{" "}
          <span className="relative inline-block text-primary">
            powerful prompt
            {/* Underline accent */}
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 8"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 6C50 2 100 1 150 2C200 3 250 5 298 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-primary/50"
              />
            </svg>
          </span>{" "}
          in seconds
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
          ThinkBuild turns your raw ideas into structured, production-ready prompts
          for Claude, GPT-4, Gemini, and every major AI model. Then it guides you
          through everything that comes next.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" className="h-12 gap-2 px-6 text-base" asChild>
            <Link href="/sign-up">
              Start for free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-6 text-base"
            asChild
          >
            <Link href="#how-it-works">See how it works</Link>
          </Button>
        </div>

        {/* Social proof micro-text */}
        <p className="text-xs text-muted-foreground">
          No credit card required &middot; Works with your own API keys
        </p>
      </div>

      {/* App preview mockup */}
      <div className="relative z-10 mx-auto mt-16 w-full max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl shadow-primary/5">
          {/* Mockup top bar */}
          <div className="flex h-10 items-center gap-2 border-b border-border/60 bg-muted/30 px-4">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-destructive/60" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <span className="h-3 w-3 rounded-full bg-green-500/60" />
            </div>
            <div className="mx-auto flex h-5 w-48 items-center justify-center rounded-md bg-border/40 text-[10px] text-muted-foreground">
              thinkbuild.app/workspace
            </div>
          </div>

          {/* Mockup content */}
          <div className="grid min-h-[320px] grid-cols-[240px_1fr] divide-x divide-border/60 md:min-h-[400px]">
            {/* Sidebar mock */}
            <div className="hidden space-y-1 bg-sidebar p-3 md:block">
              <div className="mb-3 flex items-center gap-2 px-2">
                <div className="h-5 w-5 rounded bg-primary/80" />
                <div className="h-2.5 w-20 rounded bg-muted-foreground/20" />
              </div>
              {[80, 60, 70, 50, 65].map((w, i) => (
                <div
                  key={i}
                  className="flex h-7 items-center gap-2 rounded-md px-2"
                  style={{ opacity: i === 1 ? 1 : 0.5 }}
                >
                  <div className={`h-3.5 w-3.5 rounded ${i === 1 ? "bg-primary/60" : "bg-muted-foreground/20"}`} />
                  <div
                    className={`h-2 rounded ${i === 1 ? "bg-primary/30" : "bg-muted-foreground/15"}`}
                    style={{ width: `${w}%` }}
                  />
                </div>
              ))}
            </div>

            {/* Editor mock */}
            <div className="flex flex-col gap-3 p-4 md:p-6">
              <div className="flex items-center gap-2">
                <div className="h-5 w-24 rounded bg-muted-foreground/20" />
                <div className="h-5 w-16 rounded-full bg-primary/20 text-center text-[10px] leading-5 text-primary">
                  CO-STAR
                </div>
              </div>
              <div className="space-y-2">
                {[95, 80, 100, 70, 88, 60].map((w, i) => (
                  <div
                    key={i}
                    className="h-2 rounded-full bg-muted-foreground/15"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
                <div className="mb-2 h-2 w-16 rounded bg-primary/40" />
                {[100, 85, 90].map((w, i) => (
                  <div
                    key={i}
                    className="mt-1.5 h-2 rounded-full bg-primary/20"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reflection fade */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
