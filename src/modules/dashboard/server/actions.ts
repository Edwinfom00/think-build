"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getDashboardData() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const memberships = await prisma.workspaceMember.findMany({
    where: { userId: session.user.id },
    select: { workspaceId: true },
  });
  const workspaceIds = memberships.map((m) => m.workspaceId);

  const [recentProjects, totalPrompts, totalProjects] = await Promise.all([
    prisma.project.findMany({
      where: { workspaceId: { in: workspaceIds }, status: "ACTIVE" },
      include: {
        workspace: { select: { id: true, name: true, slug: true } },
        _count: { select: { prompts: true } },
      },
      orderBy: { updatedAt: "desc" },
      take: 6,
    }),
    prisma.prompt.count({
      where: { project: { workspaceId: { in: workspaceIds } } },
    }),
    prisma.project.count({
      where: { workspaceId: { in: workspaceIds }, status: "ACTIVE" },
    }),
  ]);

  return {
    recentProjects,
    stats: {
      totalPrompts,
      totalProjects,
      workspaceCount: workspaceIds.length,
    },
    user: session.user,
  };
}
