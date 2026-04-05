import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface TopbarProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}

export function Topbar({ title, description, action }: TopbarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-6">
      <div className="min-w-0">
        {title && (
          <h1 className="truncate text-sm font-semibold text-foreground">
            {title}
          </h1>
        )}
        {description && (
          <p className="truncate text-xs text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {action && (
          <Button asChild size="sm" className="gap-1.5">
            <Link href={action.href}>
              <Plus className="h-3.5 w-3.5" />
              {action.label}
            </Link>
          </Button>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
