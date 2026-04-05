const PROVIDERS = [
  { name: "Claude", color: "#D97706" },
  { name: "GPT-4o", color: "#10B981" },
  { name: "Gemini", color: "#3B82F6" },
  { name: "DeepSeek", color: "#8B5CF6" },
  { name: "Mistral", color: "#F59E0B" },
  { name: "Cursor", color: "#6366F1" },
];

export function LLMStrip() {
  return (
    <section className="border-y border-border/50 bg-muted/20 py-12 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-8 text-sm text-muted-foreground">
          Works with every major AI model
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {PROVIDERS.map((provider) => (
            <div
              key={provider.name}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: provider.color }}
              />
              {provider.name}
            </div>
          ))}
          <div className="flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-sm text-muted-foreground">
            + more coming
          </div>
        </div>
      </div>
    </section>
  );
}
