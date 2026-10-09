import { memberRoutes } from './memberRoutes';
import { LucideIcon } from "lucide-react";
import { managerRoutes } from "./managerRoutes";
import { adminRoutes } from "./adminRoutes";

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
  ADMIN: adminRoutes,
  MEMBER: memberRoutes,
  MANAGER: managerRoutes,
};