"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { sidebarRoutes } from "@/routes/sidebarRoutes";
import { userRole } from "@/types/user.types";
import Link from "next/link";
import Logo from "../shared/Logo";
import { useGetMe, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const DashboardSidebar = ({ role }: { role: userRole }) => {
  const router = useRouter()
  const pathname = usePathname();
  const routes = sidebarRoutes[role] || [];
  const { data } = useGetMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const queryClient = useQueryClient();
  const user = data?.data;
  const displayRole = (user?.role ?? role).toLowerCase();
  const initials =
    user?.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "?";

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Good Bye", {
          description: "Logged out successfully",
        });
        queryClient.removeQueries({ queryKey: ["users"] });
        router.push("/")
      },
      onError: () => {
        toast.error("Logout failed", {
          description: "Something Went Wrong",
        });
      },
    });
  };

  return (
    <Sidebar className="w-65 border-r border-zinc-200 bg-white dark:bg-background dark:border-border select-none">
      <SidebarHeader className="px-4 pt-4 pb-2 space-y-4">
        {/* Logo Row */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Workspace Switcher */}
        <div className="mt-3 flex cursor-pointer items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-800 transition-colors duration-150 hover:bg-zinc-50 dark:border-border dark:bg-card dark:text-card-foreground dark:hover:bg-accent">
          <div className="flex items-center gap-2 truncate">
            <div className="h-2 w-2 rounded-full bg-blue-600"></div>
            <span className="truncate">Workspace</span>
          </div>
          <ChevronsUpDown className="size-4 text-zinc-400" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="mt-2 px-0">
            <SidebarGroupLabel className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.url;

                  // Sub-action style (Create Task)
                  if (item.variant === "sub-action") {
                    return (
                      <SidebarMenuItem key={item.title}>
                        <button
                          type="button"
                          className="my-1.5 ml-6 inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors duration-150 hover:bg-zinc-200 dark:bg-muted dark:text-muted-foreground dark:hover:bg-accent dark:hover:text-accent-foreground"
                        >
                          <item.icon className="size-3" />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuItem>
                    );
                  }

                  // Default Nav Item
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        render={<Link href={item.url} />}
                        isActive={isActive}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-semibold dark:bg-primary/10 dark:text-primary"
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-muted-foreground dark:hover:bg-accent dark:hover:text-accent-foreground"
                        }`}
                      >
                        <item.icon
                          className={`size-4.75 ${
                            isActive
                              ? "fill-current text-blue-600 dark:text-primary"
                              : "text-zinc-500 dark:text-muted-foreground"
                          }`}
                        />
                        <div>{item.title}</div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-zinc-200 pt-4 pb-4 px-3 dark:border-border">
        <div className="flex items-center justify-between px-1">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 font-headline text-xs font-semibold text-white dark:bg-foreground dark:text-background">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold leading-snug text-zinc-900 dark:text-foreground">
                {user?.name ?? "Loading..."}
              </p>
              <p className="truncate text-[11px] leading-tight text-zinc-500 dark:text-muted-foreground">
                {displayRole.charAt(0).toUpperCase() + displayRole.slice(1)}
              </p>
            </div>
          </div>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={isLoggingOut}
            onClick={handleLogout}
            className="ml-2 shrink-0 gap-1.5 px-2.5 text-red-600 hover:text-red-700"
          >
            <LogOut className="size-3.5" />
            Logout
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
