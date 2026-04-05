import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getUserWorkspaces } from "@/modules/workspace/server/actions";
import { NavSidebar } from "@/modules/dashboard/components/nav-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const workspaces = await getUserWorkspaces();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <NavSidebar
        workspaces={workspaces}
        user={{
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        }}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
