export type { Role } from "@/generated/prisma/client";

export interface CreateRoleInput {
  name: string;
  description?: string;
  systemPrompt: string;
  category: string;
  isPublic?: boolean;
}

export const ROLE_CATEGORIES = [
  "Engineering",
  "Architecture",
  "Security",
  "Design",
  "Data & AI",
  "Business",
  "Content",
  "Other",
] as const;
