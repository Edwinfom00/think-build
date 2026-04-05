"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { signIn } from "@/lib/auth-client";

interface FormState {
  email: string;
  password: string;
  error: string;
}

export function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    error: "",
  });

  function update(field: keyof Pick<FormState, "email" | "password">, value: string) {
    setForm((prev) => ({ ...prev, [field]: value, error: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setForm((prev) => ({ ...prev, error: "Please fill in all fields." }));
      return;
    }

    setLoading(true);
    const result = await signIn.email({
      email: form.email,
      password: form.password,
      callbackURL: "/dashboard",
    });

    if (result.error) {
      setForm((prev) => ({
        ...prev,
        error: result.error?.message ?? "Invalid email or password.",
      }));
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
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
        {loading ? <Spinner className="h-4 w-4" /> : "Sign In"}
      </Button>
    </form>
  );
}
