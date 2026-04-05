import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SignInForm } from "../components/sign-in-form";
import { OAuthButtons } from "../components/oauth-buttons";

export function SignInView() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Sign in to continue building
        </p>
      </div>

      <OAuthButtons />

      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or continue with email</span>
        <Separator className="flex-1" />
      </div>

      <SignInForm />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        No account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-primary hover:underline"
        >
          Create one free
        </Link>
      </p>
    </div>
  );
}
