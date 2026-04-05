"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { signUp } from "@/lib/auth-client";

interface FormState {
  name: string;
  email: string;
  password: string;
  error: string;
}

export function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    error: "",
  });

  function update(
    field: keyof Pick<FormState, "name" | "email" | "password">,
    value: string
  ) {
    setForm((prev) => ({ ...prev, [field]: value, error: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setForm((prev) => ({ ...prev, error: "Please fill in all fields." }));
      return;
    }
    if (form.password.length < 8) {
      setForm((prev) => ({
        ...prev,
        error: "Password must be at least 8 characters.",
      }));
      return;
    }

    setLoading(true);
    const result = await signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      callbackURL: "/onboarding",
    });

    if (result.error) {
      setForm((prev) => ({
        ...prev,
        error: result.error?.message ?? "Something went wrong. Please try again.",
      }));
      setLoading(false);
      return;
    }

    router.push("/onboarding");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Alex Johnson"
          autoComplete="name"
          className="h-11 text-base"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          className="h-11 text-base"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          className="h-11 text-base"
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
          disabled={loading}
        />
      </div>

      {form.error && (
        <p className="text-sm text-destructive">{form.error}</p>
      )}

      <Button type="submit" className="h-11 w-full text-base" disabled={loading}>
        {loading ? <Spinner className="h-4 w-4" /> : "Create account"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By signing up you agree to our{" "}
        <a href="#" className="underline hover:text-foreground">
          Terms
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-foreground">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
