"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getProject(workspaceId: string, projectId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  // Verify membership
  const membership = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: { workspaceId, userId: session.user.id },
    },
  });
  if (!membership) redirect("/dashboard");

  const project = await prisma.project.findUnique({
    where: { id: projectId, workspaceId },
    include: {
      workspace: { select: { id: true, name: true } },
      prompts: {
        orderBy: { updatedAt: "desc" },
        include: { _count: { select: { versions: true } } },
      },
    },
  });

  if (!project) redirect(`/workspace/${workspaceId}`);
  return { project, role: membership.role };
}
