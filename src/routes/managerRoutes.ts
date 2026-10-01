import { Kanban, LayoutGrid, Plus, PlusCircle } from "lucide-react";
import { RouteGroup } from "./sidebarRoutes";

export const managerRoutes: RouteGroup[] = [
  {
    title: "GENERAL",
    items: [{ title: "Dashboard", url: "/dashboard", icon: LayoutGrid }],
  },
  {
    title: "ACTIONS",
    items: [
      { title: "Create Project", url: "/projects/new", icon: PlusCircle },
      {
        title: "Create Task",
        url: "/tasks/new",
        icon: Plus,
        variant: "sub-action",
      },
      { title: "Kanban", url: "/kanban", icon: Kanban },
    ],
  },
];
