"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NavAuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/sign-up">Get Started</Link>
      </Button>
    </div>
  );
}
