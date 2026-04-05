import Link from "next/link";
import { Zap, Plus, Clock, GitBranch, ArrowRight } from "lucide-react";
import { getProject } from "../server/queries";
import { Topbar } from "@/modules/dashboard/components/topbar";

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface ProjectViewProps {
  workspaceId: string;
  projectId: string;
}

export async function ProjectView({ workspaceId, projectId }: ProjectViewProps) {
  const { project, role } = await getProject(workspaceId, projectId);
  const canEdit = role === "OWNER" || role === "ADMIN" || role === "EDITOR";

  const promptHref = (promptId: string) =>
    `/workspace/${workspaceId}/project/${projectId}/prompt/${promptId}`;

  const newPromptHref = `/workspace/${workspaceId}/project/${projectId}/prompt/new`;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Topbar
        title={project.name}
        description={project.description ?? project.initialIdea?.slice(0, 80) ?? undefined}
        action={canEdit ? { label: "New prompt", href: newPromptHref } : undefined}
      />

      <main className="flex-1 overflow-y-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link
            href={`/workspace/${workspaceId}`}
            className="hover:text-foreground transition-colors"
          >
            {project.workspace.name}
          </Link>
          <span>/</span>
          <span className="text-foreground">{project.name}</span>
        </div>

        {/* Prompts list */}
        {project.prompts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              No prompts yet
            </h3>
            <p className="mt-1 max-w-xs text-xs text-muted-foreground">
              Build your first prompt using frameworks like CO-STAR, RISEN, or
              free-form — then test it against any LLM.
            </p>
            {canEdit && (
              <Link
                href={newPromptHref}
                className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Plus className="h-3.5 w-3.5" />
                Create prompt
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {project.prompts.map((prompt) => (
              <Link
                key={prompt.id}
                href={promptHref(prompt.id)}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-4 w-4 text-primary" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {prompt.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {prompt.framework && (
                      <span className="mr-2 inline-flex items-center rounded-full border border-border px-1.5 py-0.5">
                        {prompt.framework}
                      </span>
                    )}
                    {prompt.modelTarget && (
                      <span className="text-muted-foreground">
                        {prompt.modelTarget}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <GitBranch className="h-3 w-3" />
                    v{prompt._count.versions + 1}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(prompt.updatedAt)}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
