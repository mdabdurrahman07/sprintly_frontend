import AdminDashboard from "@/components/Modules/Admin/Dashboard/AdminDashboard";
import React from "react";

const adminDashBoardHomePage = () => {
  return (
    <div>
      <div>
        <h1 className="font-headline text-2xl font-bold tracking-tight text-zinc-900 dark:text-foreground">
          Admin
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-muted-foreground">
          Platform-wide overview of users, revenue and projects
        </p>
      </div>
      <AdminDashboard />
    </div>
  );
};

export default adminDashBoardHomePage;
