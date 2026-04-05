"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type { OnboardingData } from "../types";

export async function saveOnboarding(data: OnboardingData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  await prisma.userProfile.upsert({
    where: { userId: session.user.id },
    create: {
      userId: session.user.id,
      profession: data.profession,
      techLevel: data.techLevel,
      mainUseCase: data.mainUseCase,
      llmsUsed: data.llmsUsed,
      interests: data.interests,
      bigChallenge: data.bigChallenge,
      referralSource: data.referralSource,
      completedAt: new Date(),
    },
    update: {
      profession: data.profession,
      techLevel: data.techLevel,
      mainUseCase: data.mainUseCase,
      llmsUsed: data.llmsUsed,
      interests: data.interests,
      bigChallenge: data.bigChallenge,
      referralSource: data.referralSource,
      completedAt: new Date(),
    },
  });

  // Auto-create first workspace + project from their onboarding idea
  const existingWorkspace = await prisma.workspace.findFirst({
    where: { ownerId: session.user.id },
  });

  if (!existingWorkspace) {
    const workspace = await prisma.workspace.create({
      data: {
        name: "My Workspace",
        slug: `workspace-${session.user.id.slice(0, 8)}`,
        ownerId: session.user.id,
        members: {
          create: {
            userId: session.user.id,
            role: "OWNER",
          },
        },
      },
    });

    await prisma.project.create({
      data: {
        workspaceId: workspace.id,
        name: data.mainUseCase
          ? data.mainUseCase.slice(0, 60)
          : "My First Project",
        initialIdea: data.mainUseCase,
      },
    });
  }

  redirect("/dashboard");
}
