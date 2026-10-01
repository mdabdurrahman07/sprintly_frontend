import { RoleGuard } from "@/components/Auth/RoleGuard";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["ADMIN"]}>
      <DashboardShell role="ADMIN">{children}</DashboardShell>
    </RoleGuard>
  );
}
