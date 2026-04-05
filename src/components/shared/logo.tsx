import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { icon: 20, text: "text-sm" },
  md: { icon: 24, text: "text-base" },
  lg: { icon: 32, text: "text-xl" },
};

export function Logo({ className, showWordmark = true, size = "md" }: LogoProps) {
  const { icon, text } = sizes[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Icon mark */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {/* Outer hexagon shape */}
        <path
          d="M12 2L21.196 7V17L12 22L2.804 17V7L12 2Z"
          className="fill-primary"
        />
        {/* Inner spark / prompt arrow */}
        <path
          d="M10 8L14 12L10 16"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 12H8"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {showWordmark && (
        <span
          className={cn(
            "font-semibold tracking-tight text-foreground",
            text
          )}
        >
          Think<span className="text-primary">Build</span>
        </span>
      )}
    </div>
  );
}
