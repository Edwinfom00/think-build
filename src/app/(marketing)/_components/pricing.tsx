import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring prompt engineering.",
    cta: "Get started",
    ctaHref: "/sign-up",
    featured: false,
    features: [
      "3 workspaces",
      "10 projects",
      "Unlimited prompts",
      "Version history (last 10)",
      "Template library",
      "1 LLM connection (BYOK)",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For builders who ship with AI every day.",
    cta: "Start free trial",
    ctaHref: "/sign-up?plan=pro",
    featured: true,
    badge: "Most popular",
    features: [
      "Unlimited workspaces",
      "Unlimited projects",
      "Unlimited prompts",
      "Full version history",
      "A/B testing",
      "Multi-LLM parallel testing",
      "All LLM connections (BYOK)",
      "AI Companion agent",
      "Export (JSON, Markdown)",
    ],
  },
  {
    name: "Team",
    price: "$49",
    period: "per month",
    description: "Collaborate and build prompts as a team.",
    cta: "Contact us",
    ctaHref: "/sign-up?plan=team",
    featured: false,
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Role-based access control",
      "Shared template library",
      "Chain builder (visual editor)",
      "Priority support",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium text-primary">Pricing</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Bring your own API keys. We never mark up LLM costs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                plan.featured
                  ? "border-primary/60 bg-primary/5 shadow-lg shadow-primary/10 dark:bg-primary/8"
                  : "border-border bg-card"
              }`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  {plan.badge}
                </Badge>
              )}

              <div className="mb-6">
                <p className="text-sm font-medium text-muted-foreground">
                  {plan.name}
                </p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    /{plan.period}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.featured ? "default" : "outline"}
                asChild
              >
                <Link href={plan.ctaHref}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
