import AdminUsersTable from "@/components/Modules/Admin/Users/AdminUsersTable";
import React from "react";

const adminUsersPage = () => {
  return (
    <div>
      <div className="mb-5">
        <h1 className="font-headline text-2xl font-bold tracking-tight text-zinc-900 dark:text-foreground">
          Users
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-muted-foreground">
          Manage every account on the platform and control their access
        </p>
      </div>
      <AdminUsersTable />
    </div>
  );
};

export default adminUsersPage;
