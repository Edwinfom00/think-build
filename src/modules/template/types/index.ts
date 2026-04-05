export type { Template } from "@/generated/prisma/client";

export interface CreateTemplateInput {
  title: string;
  description?: string;
  content: string;
  framework?: string;
  technique?: string;
  category: string;
  isPublic?: boolean;
}
