"use client";

import { useState, useTransition } from "react";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Logo } from "@/components/shared/logo";
import { ProgressBar } from "../components/progress-bar";
import { OptionCard } from "../components/option-card";
import { saveOnboarding } from "../server/actions";
import {
  PROFESSIONS,
  LLM_OPTIONS,
  INTEREST_OPTIONS,
  REFERRAL_OPTIONS,
} from "../types";
import type { OnboardingData, TechLevel } from "../types";

const TOTAL_STEPS = 7;

const TECH_LEVELS: { value: TechLevel; label: string; description: string }[] = [
  { value: "NON_TECHNICAL", label: "Non-technical", description: "I don't write code" },
  { value: "BEGINNER", label: "Beginner", description: "Learning the basics" },
  { value: "INTERMEDIATE", label: "Intermediate", description: "Comfortable with code" },
  { value: "EXPERT", label: "Expert", description: "Senior / professional dev" },
];

const EMPTY: OnboardingData = {
  profession: "",
  techLevel: "BEGINNER",
  mainUseCase: "",
  llmsUsed: [],
  interests: [],
  bigChallenge: "",
  referralSource: "",
};

export function OnboardingView() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(EMPTY);
  const [isPending, startTransition] = useTransition();

  function canAdvance(): boolean {
    switch (step) {
      case 1: return !!data.profession;
      case 2: return !!data.techLevel;
      case 3: return data.mainUseCase.trim().length >= 3;
      case 4: return data.llmsUsed.length > 0;
      case 5: return data.interests.length > 0;
      case 6: return data.bigChallenge.trim().length >= 3;
      case 7: return !!data.referralSource;
      default: return false;
    }
  }

  function next() {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    } else {
      startTransition(() => saveOnboarding(data));
    }
  }

  function back() {
    if (step > 1) setStep((s) => s - 1);
  }

  function toggle(field: "llmsUsed" | "interests", value: string) {
    setData((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="flex h-14 items-center justify-between border-b border-border px-6">
        <Logo size="sm" />
        <button
          type="button"
          onClick={() => startTransition(() => saveOnboarding({ ...EMPTY, completedAt: undefined } as OnboardingData))}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Skip for now
        </button>
      </header>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="mb-10">
            <ProgressBar current={step} total={TOTAL_STEPS} />
          </div>

          {/* Step content */}
          <div className="min-h-[320px]">
            {step === 1 && (
              <Step
                icon={<Sparkles className="h-5 w-5 text-primary" />}
                title="What's your profession?"
                description="This helps us tailor your experience."
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {PROFESSIONS.map((p) => (
                    <OptionCard
                      key={p}
                      label={p}
                      selected={data.profession === p}
                      onClick={() => setData((d) => ({ ...d, profession: p }))}
                    />
                  ))}
                </div>
              </Step>
            )}

            {step === 2 && (
              <Step
                title="What's your technical level?"
                description="There's no wrong answer — we adapt the experience to you."
              >
                <div className="grid gap-2">
                  {TECH_LEVELS.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setData((d) => ({ ...d, techLevel: t.value }))}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all hover:border-primary/50 ${
                        data.techLevel === t.value
                          ? "border-primary bg-primary/8"
                          : "border-border bg-card"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{t.label}</p>
                        <p className="text-xs text-muted-foreground">{t.description}</p>
                      </div>
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          data.techLevel === t.value
                            ? "border-primary bg-primary"
                            : "border-border"
                        }`}
                      >
                        {data.techLevel === t.value && (
                          <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </Step>
            )}

            {step === 3 && (
              <Step
                title="What do you want to build?"
                description="Describe your main project or use case — this becomes the seed of your first workspace."
              >
                <Textarea
                  placeholder="e.g. A SaaS app that helps freelancers automate invoicing with AI..."
                  className="min-h-[120px] resize-none text-base"
                  value={data.mainUseCase}
                  onChange={(e) =>
                    setData((d) => ({ ...d, mainUseCase: e.target.value }))
                  }
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  {data.mainUseCase.length} / 300
                </p>
              </Step>
            )}

            {step === 4 && (
              <Step
                title="Which AI models do you use?"
                description="Select all that apply. We'll optimize prompts for your tools."
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {LLM_OPTIONS.map((llm) => (
                    <OptionCard
                      key={llm}
                      label={llm}
                      selected={data.llmsUsed.includes(llm)}
                      onClick={() => toggle("llmsUsed", llm)}
                      multi
                    />
                  ))}
                </div>
              </Step>
            )}

            {step === 5 && (
              <Step
                title="What are your main domains?"
                description="Select all that interest you."
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {INTEREST_OPTIONS.map((interest) => (
                    <OptionCard
                      key={interest}
                      label={interest}
                      selected={data.interests.includes(interest)}
                      onClick={() => toggle("interests", interest)}
                      multi
                    />
                  ))}
                </div>
              </Step>
            )}

            {step === 6 && (
              <Step
                title="What's your biggest challenge with AI tools?"
                description="Be honest — this helps us build a better experience for you."
              >
                <Textarea
                  placeholder="e.g. I never know if my prompt is well-structured, outputs are inconsistent..."
                  className="min-h-[120px] resize-none text-base"
                  value={data.bigChallenge}
                  onChange={(e) =>
                    setData((d) => ({ ...d, bigChallenge: e.target.value }))
                  }
                />
              </Step>
            )}

            {step === 7 && (
              <Step
                title="How did you hear about ThinkBuild?"
                description="Last question, we promise."
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {REFERRAL_OPTIONS.map((r) => (
                    <OptionCard
                      key={r}
                      label={r}
                      selected={data.referralSource === r}
                      onClick={() => setData((d) => ({ ...d, referralSource: r }))}
                    />
                  ))}
                </div>
              </Step>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={back}
              disabled={step === 1 || isPending}
              className="gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Button
              onClick={next}
              disabled={!canAdvance() || isPending}
              className="h-11 gap-2 px-6"
            >
              {isPending
                ? "Setting up…"
                : step === TOTAL_STEPS
                  ? "Let's go"
                  : "Continue"}
              {!isPending && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({
  icon,
  title,
  description,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {icon && <div className="mb-4">{icon}</div>}
      <h1 className="mb-1.5 text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}
