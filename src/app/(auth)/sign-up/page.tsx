import type { Metadata } from "next";
import { SignUpView } from "@/modules/auth/views/sign-up-view";

export const metadata: Metadata = { title: "Sign Up" };

export default function SignUpPage() {
  return <SignUpView />;
}
