import { Lightbulb, Wand2, Rocket } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Describe your idea",
    description:
      'Type your raw idea in plain language — "Build a REST API with auth" or "Write a migration script for Postgres". No structure required.',
  },
  {
    number: "02",
    icon: Wand2,
    title: "ThinkBuild engineers your prompt",
    description:
      "Select a framework (CO-STAR, RISEN…), a technique (Chain-of-Thought, Few-Shot…), and your target model. ThinkBuild structures and optimizes your prompt automatically.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Test, iterate, and ship",
    description:
      "Execute against your preferred LLM, review the output, and iterate with version history and auto-correction suggestions until it's exactly right.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium text-primary">How it works</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Three steps from idea to output
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connector line */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

          {STEPS.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Number bubble */}
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary/30 bg-background">
                <step.icon className="h-7 w-7 text-primary" />
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {step.number.replace("0", "")}
                </span>
              </div>

              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
