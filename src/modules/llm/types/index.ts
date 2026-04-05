export type { LLMProvider, LLMConfig } from "@/generated/prisma/client";

export interface LLMExecuteInput {
  provider: import("@/generated/prisma/client").LLMProvider;
  model: string;
  systemPrompt?: string;
  userPrompt: string;
  variables?: Record<string, string>;
  stream?: boolean;
  temperature?: number;
  maxTokens?: number;
}

export interface LLMResponse {
  content: string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
  model: string;
  provider: import("@/generated/prisma/client").LLMProvider;
}

export const LLM_MODELS: Record<
  import("@/generated/prisma/client").LLMProvider,
  { label: string; models: Array<{ id: string; label: string }> }
> = {
  CLAUDE: {
    label: "Claude",
    models: [
      { id: "claude-opus-4-6", label: "Claude Opus 4.6" },
      { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6" },
      { id: "claude-haiku-4-5-20251001", label: "Claude Haiku 4.5" },
    ],
  },
  OPENAI: {
    label: "OpenAI",
    models: [
      { id: "gpt-4o", label: "GPT-4o" },
      { id: "gpt-4o-mini", label: "GPT-4o Mini" },
      { id: "o1", label: "o1" },
    ],
  },
  GEMINI: {
    label: "Gemini",
    models: [
      { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
      { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
    ],
  },
  DEEPSEEK: {
    label: "DeepSeek",
    models: [
      { id: "deepseek-chat", label: "DeepSeek Chat" },
      { id: "deepseek-reasoner", label: "DeepSeek Reasoner" },
    ],
  },
  MISTRAL: {
    label: "Mistral",
    models: [
      { id: "mistral-large-latest", label: "Mistral Large" },
      { id: "mistral-small-latest", label: "Mistral Small" },
    ],
  },
};
