import { LucideIcon } from "lucide-react";
import { managerRoutes } from "./managerRoutes";

export type RouteItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  variant?: "default" | "sub-action";
};

export type RouteGroup = {
  title: string;
  items: RouteItem[];
};

export const sidebarRoutes: Partial<Record<string, RouteGroup[]>> = {
//   ADMIN: managerRoutes,
//   MEMBER: managerRoutes,
  MANAGER: managerRoutes,
};