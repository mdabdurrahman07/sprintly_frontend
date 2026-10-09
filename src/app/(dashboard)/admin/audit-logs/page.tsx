import AuditLogsTable from "@/components/Modules/Admin/Audit/AuditLogsTable";
import React from "react";

const adminAuditLogsPage = () => {
  return (
    <div>
      <div className="mb-5">
        <h1 className="font-headline text-2xl font-bold tracking-tight text-zinc-900 dark:text-foreground">
          Audit Logs
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-muted-foreground">
          A read-only record of every important action taken on the platform
        </p>
      </div>
      <AuditLogsTable />
    </div>
  );
};

export default adminAuditLogsPage;
