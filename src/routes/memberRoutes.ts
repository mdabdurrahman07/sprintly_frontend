import { Kanban, LayoutGrid, UserRound } from "lucide-react";
import { RouteGroup } from "./sidebarRoutes";

const prefix = "/member";

export const memberRoutes: RouteGroup[] = [
  {
    title: "GENERAL",
    items: [
      { title: "Dashboard", url: "/member", icon: LayoutGrid },
      {
        title: "Member Profile",
        url: `${prefix}/member-profile`,
        icon: UserRound,
      },
    ],
  },
  {
    title: "WORKSPACE",
    items: [{ title: "Kanban", url: `${prefix}/kanban`, icon: Kanban }],
  },
];
