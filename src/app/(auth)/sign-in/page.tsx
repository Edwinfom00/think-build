import type { Metadata } from "next";
import { SignInView } from "@/modules/auth/views/sign-in-view";

export const metadata: Metadata = { title: "Sign In" };

export default function SignInPage() {
  return <SignInView />;
}
