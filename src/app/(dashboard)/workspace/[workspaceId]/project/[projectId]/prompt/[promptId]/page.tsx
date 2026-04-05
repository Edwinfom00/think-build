import type { Metadata } from "next";
import { Topbar } from "@/modules/dashboard/components/topbar";

export const metadata: Metadata = { title: "Prompt Builder — ThinkBuild" };

export default async function PromptPage({
  params,
}: {
  params: Promise<{ workspaceId: string; projectId: string; promptId: string }>;
}) {
  await params;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Topbar title="Prompt Builder" />
      <main className="flex flex-1 items-center justify-center text-muted-foreground text-sm">
        Prompt builder — coming in next phase
      </main>
    </div>
  );
}
