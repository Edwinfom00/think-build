export type { Prompt, PromptVersion } from "@/generated/prisma/client";

export type PromptFramework =
  | "CO-STAR"
  | "RISEN"
  | "CRISPE"
  | "TRACE"
  | "TAG"
  | "ICIO"
  | "custom";

export type PromptTechnique =
  | "zero-shot"
  | "few-shot"
  | "chain-of-thought"
  | "tree-of-thoughts"
  | "react"
  | "self-consistency"
  | "step-back"
  | "least-to-most"
  | "program-of-thought"
  | "none";

export type VariableType = "text" | "file" | "code_snippet" | "url" | "number";

export interface PromptVariable {
  name: string;
  type: VariableType;
  description?: string;
  defaultValue?: string;
  required: boolean;
}

export interface CreatePromptInput {
  projectId: string;
  title: string;
  content: string;
  framework?: PromptFramework;
  technique?: PromptTechnique;
  variables?: PromptVariable[];
  modelTarget?: string;
}

export interface PromptWithVersions {
  id: string;
  title: string;
  content: string;
  framework: string | null;
  technique: string | null;
  variables: PromptVariable[];
  modelTarget: string | null;
  versions: Array<{
    id: string;
    versionNum: number;
    commitMsg: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export const FRAMEWORKS: Record<
  Exclude<PromptFramework, "custom">,
  { label: string; description: string; fields: string[] }
> = {
  "CO-STAR": {
    label: "CO-STAR",
    description: "Context, Objective, Style, Tone, Audience, Response",
    fields: ["Context", "Objective", "Style", "Tone", "Audience", "Response"],
  },
  RISEN: {
    label: "RISEN",
    description: "Role, Instructions, Steps, End Goal, Narrowing",
    fields: ["Role", "Instructions", "Steps", "End Goal", "Narrowing"],
  },
  CRISPE: {
    label: "CRISPE",
    description: "Capacity/Role, Request, Insight, Statement, Personality, Experiment",
    fields: ["Capacity & Role", "Request", "Insight", "Statement", "Personality", "Experiment"],
  },
  TRACE: {
    label: "TRACE",
    description: "Task, Requirements, Action, Context, Examples",
    fields: ["Task", "Requirements", "Action", "Context", "Examples"],
  },
  TAG: {
    label: "TAG",
    description: "Task, Action, Goal",
    fields: ["Task", "Action", "Goal"],
  },
  ICIO: {
    label: "ICIO",
    description: "Instruction, Context, Input, Output",
    fields: ["Instruction", "Context", "Input", "Output"],
  },
};

export const TECHNIQUES: Record<
  Exclude<PromptTechnique, "none">,
  { label: string; description: string; suffix?: string }
> = {
  "zero-shot": {
    label: "Zero-Shot",
    description: "Direct instruction, no examples",
  },
  "few-shot": {
    label: "Few-Shot",
    description: "2-10 examples embedded in prompt",
  },
  "chain-of-thought": {
    label: "Chain of Thought",
    description: "Step-by-step reasoning",
    suffix: "Let's think step by step.",
  },
  "tree-of-thoughts": {
    label: "Tree of Thoughts",
    description: "Explore multiple reasoning branches",
  },
  react: {
    label: "ReAct",
    description: "Reason then Act — for agent workflows",
  },
  "self-consistency": {
    label: "Self-Consistency",
    description: "Multiple outputs, majority vote",
  },
  "step-back": {
    label: "Step-Back",
    description: "Abstract principle before specific answer",
  },
  "least-to-most": {
    label: "Least-to-Most",
    description: "Sub-problems in increasing difficulty",
  },
  "program-of-thought": {
    label: "Program of Thought",
    description: "Output code instead of prose",
  },
};
