"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getWorkspace(workspaceId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: { workspaceId, userId: session.user.id },
    },
  });
  if (!membership) redirect("/dashboard");

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      projects: {
        where: { status: "ACTIVE" },
        include: { _count: { select: { prompts: true } } },
        orderBy: { updatedAt: "desc" },
      },
      _count: { select: { members: true } },
    },
  });

  if (!workspace) redirect("/dashboard");
  return { workspace, role: membership.role };
}
