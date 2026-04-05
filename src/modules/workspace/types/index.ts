export type { Workspace, WorkspaceMember, Invitation, MemberRole } from "@/generated/prisma/client";

export interface WorkspaceWithMembers {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  ownerId: string;
  members: Array<{
    id: string;
    userId: string;
    role: import("@/generated/prisma/client").MemberRole;
    joinedAt: Date;
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
    };
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkspaceInput {
  name: string;
  description?: string;
  icon?: string;
}

export interface CreateInvitationInput {
  workspaceId: string;
  role: import("@/generated/prisma/client").MemberRole;
}
