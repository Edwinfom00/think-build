import Link from "next/link";
import { Zap, FolderKanban, Building2, ArrowRight, Clock } from "lucide-react";
import { getDashboardData } from "../server/actions";
import { Topbar } from "../components/topbar";

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1.5 text-2xl font-bold tabular-nums text-foreground">
            {value}
          </p>
        </div>
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-4.5 w-4.5" />
        </span>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
}: {
  project: {
    id: string;
    name: string;
    description: string | null;
    updatedAt: Date;
    workspace: { id: string; name: string };
    _count: { prompts: number };
  };
}) {
  const href = `/workspace/${project.workspace.id}/project/${project.id}`;
  const timeAgo = formatTimeAgo(project.updatedAt);

  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="line-clamp-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
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
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {timeAgo}
        </span>
        <span className="ml-auto truncate rounded-full border border-border px-2 py-0.5">
          {project.workspace.name}
        </span>
      </div>
    </Link>
  );
}

function EmptyProjects() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
        <FolderKanban className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">No projects yet</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Create your first project to start building prompts.
      </p>
      <Link
        href="/projects/new"
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Create project
      </Link>
    </div>
  );
}

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

export async function DashboardView() {
  const { recentProjects, stats, user } = await getDashboardData();

  const greeting = getGreeting();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Topbar
        title="Dashboard"
        action={{ label: "New project", href: "/projects/new" }}
      />

      <main className="flex-1 overflow-y-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {greeting},{" "}
            <span className="text-primary">{user.name.split(" ")[0]}</span>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening across your workspaces.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={Building2}
            label="Workspaces"
            value={stats.workspaceCount}
            color="bg-blue-500/10 text-blue-400"
          />
          <StatCard
            icon={FolderKanban}
            label="Active projects"
            value={stats.totalProjects}
            color="bg-violet-500/10 text-violet-400"
          />
          <StatCard
            icon={Zap}
            label="Total prompts"
            value={stats.totalPrompts}
            color="bg-amber-500/10 text-amber-400"
          />
        </div>

        {/* Recent projects */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Recent projects
            </h3>
            <Link
              href="/projects"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentProjects.length === 0 ? (
              <EmptyProjects />
            ) : (
              recentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
