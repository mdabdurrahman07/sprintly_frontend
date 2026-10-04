import {
  CreditCardPlus,
  Kanban,
  LayoutGrid,
  Plus,
  PlusCircle,
} from "lucide-react";
import { RouteGroup } from "./sidebarRoutes";

const prefix = "/manager";

export const managerRoutes: RouteGroup[] = [
  {
    title: "GENERAL",
    items: [{ title: "Dashboard", url: "/manager", icon: LayoutGrid }],
  },
  {
    title: "PAYMENT",
    items: [
      { title: "Billing", url: `${prefix}/billing`, icon: CreditCardPlus },
    ],
  },
  {
    title: "ACTIONS",
    items: [
      {
        title: "Create Project",
        url: `${prefix}/projects`,
        icon: PlusCircle,
      },
      { title: "Kanban", url: `${prefix}/kanban`, icon: Kanban },
    ],
  },
];
