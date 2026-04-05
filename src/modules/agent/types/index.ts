export type { AgentConversation, AgentMessage, MessageRole } from "@/generated/prisma/client";

export interface AgentContext {
  workspaceId?: string;
  projectId?: string;
  promptId?: string;
  currentPromptContent?: string;
}

export interface SendMessageInput {
  conversationId?: string;
  content: string;
  context?: AgentContext;
}
