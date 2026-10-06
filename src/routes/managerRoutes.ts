import {
  CreditCardPlus,
  Kanban,
  LayoutGrid,
  PlusCircle,
  UserRound,
} from "lucide-react";
import { RouteGroup } from "./sidebarRoutes";

const prefix = "/manager";

export const managerRoutes: RouteGroup[] = [
  {
    title: "GENERAL",
    items: [
      { title: "Dashboard", url: "/manager", icon: LayoutGrid },
      { title: "Manager Profile", url: `${prefix}/manager-profile`, icon: UserRound },
    ],
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
