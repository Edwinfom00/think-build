export type { Project, ProjectStatus } from "@/generated/prisma/client";

export interface CreateProjectInput {
  workspaceId: string;
  name: string;
  description?: string;
  initialIdea?: string;
}

export interface ProjectWithCounts {
  id: string;
  name: string;
  description: string | null;
  initialIdea: string | null;
  status: import("@/generated/prisma/client").ProjectStatus;
  workspaceId: string;
  _count: {
    prompts: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
