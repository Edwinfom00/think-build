import type { Metadata } from "next";
import { OnboardingView } from "@/modules/onboarding/views/onboarding-view";

export const metadata: Metadata = { title: "Getting Started" };

export default function OnboardingPage() {
  return <OnboardingView />;
}
