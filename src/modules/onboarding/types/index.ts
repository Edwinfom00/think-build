export type { TechLevel } from "@/generated/prisma/client";

export interface OnboardingData {
  profession: string;
  techLevel: import("@/generated/prisma/client").TechLevel;
  mainUseCase: string;
  llmsUsed: string[];
  interests: string[];
  bigChallenge: string;
  referralSource: string;
}

export const PROFESSIONS = [
  "Developer",
  "Designer",
  "Product Manager",
  "Entrepreneur",
  "Student",
  "Other",
] as const;

export const LLM_OPTIONS = [
  "Claude",
  "GPT-4",
  "Gemini",
  "Cursor",
  "DeepSeek",
  "Other",
] as const;

export const INTEREST_OPTIONS = [
  "Web Development",
  "Mobile",
  "Data & AI",
  "Security",
  "Design",
  "Marketing",
  "Finance",
  "Other",
] as const;

export const REFERRAL_OPTIONS = [
  "Product Hunt",
  "Twitter / X",
  "Word of mouth",
  "Google / Search",
  "GitHub",
  "Other",
] as const;
