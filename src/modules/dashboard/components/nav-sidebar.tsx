"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Zap,
  Library,
  Bot,
  Settings,
  ChevronsUpDown,
  Check,
  Plus,
  LogOut,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

interface Workspace {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  role: string;
  projectCount: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface NavSidebarProps {
  workspaces: Workspace[];
  user: User;
}

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Prompts", href: "/prompts", icon: Zap },
  { label: "Templates", href: "/templates", icon: Library },
  { label: "Agent", href: "/agent", icon: Bot },
];

const BOTTOM_ITEMS = [
  { label: "Settings", href: "/settings", icon: Settings },
];

function WorkspaceIcon({ name, icon }: { name: string; icon: string | null }) {
  if (icon) {
    return <span className="text-base leading-none">{icon}</span>;
  }
  return (
    <span className="text-xs font-bold text-white uppercase leading-none">
      {name.slice(0, 2)}
    </span>
  );
}

function UserAvatar({ user }: { user: User }) {
  if (user.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={user.image}
        alt={user.name}
        className="h-7 w-7 rounded-full object-cover"
      />
    );
  }
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold uppercase text-primary-foreground">
      {user.name.slice(0, 2)}
    </span>
  );
}

export function NavSidebar({ workspaces, user }: NavSidebarProps) {
  const pathname = usePathname();
  const params = useParams();
  const [switcherOpen, setSwitcherOpen] = useState(false);

  const currentWorkspaceId =
    typeof params?.workspaceId === "string" ? params.workspaceId : null;
  const currentWorkspace =
    workspaces.find((w) => w.id === currentWorkspaceId) ?? workspaces[0];

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  async function handleSignOut() {
    await signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/sign-in"; } } });
  }

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-border px-4">
        <Logo size="sm" />
      </div>

      {/* Workspace switcher */}
      <div className="relative px-3 pt-3">
        <button
          type="button"
          onClick={() => setSwitcherOpen((v) => !v)}
          className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-accent/60"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <WorkspaceIcon
              name={currentWorkspace?.name ?? "W"}
              icon={currentWorkspace?.icon ?? null}
            />
          </span>
          <span className="flex-1 truncate text-sm font-medium text-foreground">
            {currentWorkspace?.name ?? "Select workspace"}
          </span>
          <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </button>

        {switcherOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setSwitcherOpen(false)}
            />
            <div className="absolute left-3 right-3 top-full z-20 mt-1 overflow-hidden rounded-xl border border-border bg-popover shadow-lg shadow-black/30">
              <div className="p-1">
                <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Workspaces
                </p>
                {workspaces.map((ws) => (
                  <Link
                    key={ws.id}
                    href={`/workspace/${ws.id}`}
                    onClick={() => setSwitcherOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-accent/60"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
                      <WorkspaceIcon name={ws.name} icon={ws.icon} />
                    </span>
                    <span className="flex-1 truncate text-foreground">
                      {ws.name}
                    </span>
                    {ws.id === currentWorkspace?.id && (
                      <Check className="h-3.5 w-3.5 text-primary" />
                    )}
                  </Link>
                ))}
              </div>
              <div className="border-t border-border p-1">
                <Link
                  href="/workspace/new"
                  onClick={() => setSwitcherOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
                >
                  <Plus className="h-4 w-4" />
                  New workspace
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Primary nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                    active
                      ? "bg-accent text-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "")} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Settings section */}
        <div className="mt-4 border-t border-border pt-3">
          <ul className="space-y-0.5">
            {BOTTOM_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                      active
                        ? "bg-accent text-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "")} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* User menu */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
          <UserAvatar user={user} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              {user.name}
            </p>
            <p className="truncate text-[10px] text-muted-foreground">
              {user.email}
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            title="Sign out"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
