import type { Metadata } from "next";
import { Navbar } from "./_components/navbar";
import { Hero } from "./_components/hero";
import { LLMStrip } from "./_components/llm-strip";
import { Features } from "./_components/features";
import { HowItWorks } from "./_components/how-it-works";
import { Pricing } from "./_components/pricing";
import { Footer } from "./_components/footer";

export const metadata: Metadata = {
  title: "ThinkBuild — From idea to powerful prompt",
  description:
    "ThinkBuild turns your raw ideas into structured, production-ready prompts for Claude, GPT-4, Gemini, and every major AI model.",
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <LLMStrip />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />
    </>
  );
}
