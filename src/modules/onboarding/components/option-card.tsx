import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface OptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
}

export function OptionCard({ label, selected, onClick, multi = false }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all",
        "hover:border-primary/50 hover:bg-accent/50",
        selected
          ? "border-primary bg-primary/8 text-foreground"
          : "border-border bg-card text-foreground"
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          multi ? "rounded-md" : "rounded-full",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border"
        )}
      >
        {selected && <Check className="h-3 w-3" />}
      </span>
    </button>
  );
}
