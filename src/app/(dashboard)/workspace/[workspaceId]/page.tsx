import type { Metadata } from "next";
import { WorkspaceView } from "@/modules/workspace/views/workspace-view";

export const metadata: Metadata = { title: "Workspace — ThinkBuild" };

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  return <WorkspaceView workspaceId={workspaceId} />;
}
