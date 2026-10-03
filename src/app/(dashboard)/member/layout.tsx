import { RoleGuard } from "@/components/Auth/RoleGuard";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import { ReactNode } from "react";

export default function memberLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["MEMBER"]}>
      <DashboardShell role="MEMBER">{children}</DashboardShell>
    </RoleGuard>
  );
}
