import ManagerDashboard from "@/components/Modules/Manager/ManagerDashboard";
import React from "react";

const managerDashboardHomePage = () => {
  return (
    <div>
      <h1 className="font-headline text-2xl font-bold tracking-tight text-zinc-900 dark:text-foreground">
        Manager Dashboard
      </h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-muted-foreground">
        Here all the managing things
      </p>

      <div className="my-5">
        <ManagerDashboard />
      </div>
    </div>
  );
};

export default managerDashboardHomePage;
