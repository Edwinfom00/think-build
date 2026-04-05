import type { Metadata } from "next";
import { ProjectView } from "@/modules/project/views/project-view";

export const metadata: Metadata = { title: "Project — ThinkBuild" };

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ workspaceId: string; projectId: string }>;
}) {
  const { workspaceId, projectId } = await params;
  return <ProjectView workspaceId={workspaceId} projectId={projectId} />;
}
