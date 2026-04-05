import {
  Wand2,
  FlaskConical,
  GitBranch,
  Library,
  Bot,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Wand2,
    title: "Prompt Builder",
    description:
      "Transform a raw idea into a structured, optimized prompt using proven frameworks like CO-STAR, RISEN, and CRISPE. Variables, techniques, model-specific tuning — all in one editor.",
    accent: true,
  },
  {
    icon: FlaskConical,
    title: "Multi-LLM Testing",
    description:
      "Run your prompt against Claude, GPT-4o, Gemini, and more simultaneously. Compare outputs side by side and pick the best model for your use case.",
    accent: false,
  },
  {
    icon: GitBranch,
    title: "Prompt Versioning",
    description:
      "Every iteration is saved with a commit message — like Git for prompts. Roll back to any version, diff two variants, and always know what changed.",
    accent: false,
  },
  {
    icon: Library,
    title: "Template Library",
    description:
      "Start fast with built-in templates for every framework and technique. Chain-of-Thought, Few-Shot, Tree of Thoughts — structured and ready to adapt.",
    accent: false,
  },
  {
    icon: Bot,
    title: "AI Companion",
    description:
      "A context-aware agent that lives in your dashboard. It knows your project, your history, and your next steps. Ask it anything, anytime.",
    accent: false,
  },
  {
    icon: Zap,
    title: "A/B Testing",
    description:
      "Compare two prompt variants head-to-head with real metrics — latency, token count, and output quality. Stop guessing, start optimizing.",
    accent: false,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium text-primary">Features</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to prompt better
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            From first draft to production-ready prompt — ThinkBuild covers the full
            engineering cycle.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className={`group relative rounded-2xl border p-6 transition-colors ${
                feature.accent
                  ? "border-primary/40 bg-primary/5 dark:bg-primary/8"
                  : "border-border bg-card hover:border-primary/30 hover:bg-card/80"
              }`}
            >
              <div
                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                  feature.accent
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                } transition-colors`}
              >
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
