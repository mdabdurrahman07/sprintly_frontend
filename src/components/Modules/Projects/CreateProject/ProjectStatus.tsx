import React from "react";

const statuses = [
  { label: "TODO", value: 2, percent: "16.7%", color: "bg-slate-400" },
  { label: "IN PROGRESS", value: 6, percent: "50.0%", color: "bg-blue-600" },
  { label: "IN REVIEW", value: 2, percent: "16.7%", color: "bg-amber-500" },
  { label: "DONE", value: 2, percent: "16.7%", color: "bg-emerald-500" },
];

const ProjectStatus = () => {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-border dark:bg-card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-headline text-lg font-bold text-zinc-900 dark:text-foreground">
            Projects by status
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-muted-foreground">
            Distribution across current active delivery pipelines
          </p>
        </div>
        <span className="inline-flex rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-500 dark:border-border dark:text-muted-foreground">
          12 active total
        </span>
      </div>

      <div className="my-8">
        <div className="flex h-3 w-full overflow-hidden rounded-full gap-1 bg-zinc-100 dark:bg-muted">
          <div className="h-full bg-slate-400" style={{ width: "16.7%" }} />
          <div
            className="h-full bg-blue-600 dark:bg-primary"
            style={{ width: "50%" }}
          />
          <div className="h-full bg-amber-500" style={{ width: "16.7%" }} />
          <div className="h-full bg-emerald-500" style={{ width: "16.7%" }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {statuses.map((status) => (
          <div
            key={status.label}
            className="flex flex-col justify-center rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-border/50 dark:bg-muted/20"
          >
            <div className="flex items-center gap-2">
              <div className={`size-2 rounded-full ${status.color}`} />
              <span className="text-xs font-bold tracking-wider text-zinc-700 dark:text-foreground">
                {status.label}
              </span>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <span className="font-headline text-2xl font-bold text-zinc-900 dark:text-foreground">
                {status.value}
              </span>
              <span className="text-xs text-zinc-500 dark:text-muted-foreground">
                {status.percent}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectStatus;
