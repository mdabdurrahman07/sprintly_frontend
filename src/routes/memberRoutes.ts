import { Kanban, LayoutGrid } from "lucide-react";
import { RouteGroup } from "./sidebarRoutes";

export const memberRoutes: RouteGroup[] = [
  {
    title: "GENERAL",
    items: [{ title: "Dashboard", url: "/member", icon: LayoutGrid }],
  },
  {
    title: "WORKSPACE",
    items: [{ title: "Kanban", url: "/member", icon: Kanban }],
  },
];
