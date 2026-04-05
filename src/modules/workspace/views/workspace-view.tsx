import Link from "next/link";
import { Zap, ArrowRight, Clock, Plus, Users } from "lucide-react";
import { getWorkspace } from "../server/queries";
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

interface WorkspaceViewProps {
  workspaceId: string;
}

export async function WorkspaceView({ workspaceId }: WorkspaceViewProps) {
  const { workspace, role } = await getWorkspace(workspaceId);
  const canEdit = role === "OWNER" || role === "ADMIN" || role === "EDITOR";

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Topbar
        title={workspace.name}
        description={workspace.description ?? undefined}
        action={
          canEdit
            ? {
                label: "New project",
                href: `/workspace/${workspace.id}/project/new`,
              }
            : undefined
        }
      />

      <main className="flex-1 overflow-y-auto px-6 py-8">
        {/* Header stats */}
        <div className="mb-8 flex items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {workspace._count.members}{" "}
            {workspace._count.members === 1 ? "member" : "members"}
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="h-4 w-4" />
            {workspace.projects.length}{" "}
            {workspace.projects.length === 1 ? "project" : "projects"}
          </span>
        </div>

        {/* Projects grid */}
        {workspace.projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              No projects yet
            </h3>
            <p className="mt-1 max-w-xs text-xs text-muted-foreground">
              Start by creating your first project. Each project groups related
              prompts together.
            </p>
            {canEdit && (
              <Link
                href={`/workspace/${workspace.id}/project/new`}
                className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Plus className="h-3.5 w-3.5" />
                Create project
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workspace.projects.map((project) => (
              <Link
                key={project.id}
                href={`/workspace/${workspace.id}/project/${project.id}`}
                className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {project.name}
                  </h3>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                {project.description && (
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {project.description}
                  </p>
                )}

                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {project._count.prompts}{" "}
                    {project._count.prompts === 1 ? "prompt" : "prompts"}
                  </span>
                  <span className="ml-auto flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(project.updatedAt)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
