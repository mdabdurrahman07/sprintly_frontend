import { LayoutGrid, Logs, UserCog } from "lucide-react";
import { RouteGroup } from "./sidebarRoutes";

const prefix = "/admin";

export const adminRoutes: RouteGroup[] = [
  {
    title: "GENERAL",
    items: [{ title: "Dashboard", url: "/admin", icon: LayoutGrid }],
  },
  {
    title: "MANAGEMENT",
    items: [
      { title: "Users", url: `${prefix}/users`, icon: UserCog },
      { title: "Audit Logs", url: `${prefix}/audit-logs`, icon: Logs },
    ],
  },
];
