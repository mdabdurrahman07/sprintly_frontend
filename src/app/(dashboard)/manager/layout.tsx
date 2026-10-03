import { RoleGuard } from "@/components/Auth/RoleGuard";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import { ReactNode } from "react";

export default function managerLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["MANAGER"]}>
      <DashboardShell role="MANAGER">{children}</DashboardShell>
    </RoleGuard>
  );
}
