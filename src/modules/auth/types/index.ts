export type { User, Session } from "@/generated/prisma/client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export interface SessionData {
  user: AuthUser;
  session: {
    id: string;
    expiresAt: Date;
  };
}
