import React, { ReactNode } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import { userRole } from "@/types/user.types";

const DashboardShell = ({
  children,
  role,
}: {
  children: ReactNode;
  role: userRole;
}) => {
  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />
      <SidebarInset className="bg-[#F9FAFB] dark:bg-background">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 dark:bg-background dark:border-border">
          <SidebarTrigger className="-ml-1 text-zinc-500 hover:text-zinc-900 dark:text-muted-foreground dark:hover:text-foreground" />
        </header>
        <main className="flex-1 w-full max-w-295 p-8 mx-auto space-y-6 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardShell;
