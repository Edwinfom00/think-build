"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type { CreateWorkspaceInput } from "../types";

export async function getUserWorkspaces() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const memberships = await prisma.workspaceMember.findMany({
    where: { userId: session.user.id },
    include: {
      workspace: {
        include: {
          _count: { select: { members: true, projects: true } },
        },
      },
    },
    orderBy: { joinedAt: "asc" },
  });

  return memberships.map((m) => ({
    id: m.workspace.id,
    name: m.workspace.name,
    slug: m.workspace.slug,
    icon: m.workspace.icon,
    description: m.workspace.description,
    ownerId: m.workspace.ownerId,
    role: m.role,
    memberCount: m.workspace._count.members,
    projectCount: m.workspace._count.projects,
    createdAt: m.workspace.createdAt,
    updatedAt: m.workspace.updatedAt,
  }));
}

export async function createWorkspace(input: CreateWorkspaceInput) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const slug = input.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48)
    .concat(`-${session.user.id.slice(0, 6)}`);

  const workspace = await prisma.workspace.create({
    data: {
      name: input.name,
      slug,
      icon: input.icon,
      description: input.description,
      ownerId: session.user.id,
      members: {
        create: { userId: session.user.id, role: "OWNER" },
      },
    },
  });

  return workspace;
}
