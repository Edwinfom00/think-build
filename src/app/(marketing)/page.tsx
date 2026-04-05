import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ThinkBuild — From idea to powerful prompt",
};

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <h1 className="text-4xl font-bold text-foreground">ThinkBuild</h1>
      <p className="mt-3 text-muted-foreground">Landing page — coming soon</p>
    </main>
  );
}
