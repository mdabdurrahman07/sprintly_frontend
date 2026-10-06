import { TASK_STATUSES, type Task, type TaskStatus } from "@/types/task.types";

const statusStyles: Record<
  TaskStatus,
  { label: string; color: string; barColor: string }
> = {
  TODO: {
    label: "TODO",
    color: "bg-slate-400",
    barColor: "bg-slate-400",
  },
  IN_PROGRESS: {
    label: "IN PROGRESS",
    color: "bg-blue-600",
    barColor: "bg-blue-600 dark:bg-primary",
  },
  IN_REVIEW: {
    label: "IN REVIEW",
    color: "bg-amber-500",
    barColor: "bg-amber-500",
  },
  DONE: {
    label: "DONE",
    color: "bg-emerald-500",
    barColor: "bg-emerald-500",
  },
};

interface ProjectStatusProps {
  tasks: Task[];
  isPending: boolean;
  isError: boolean;
}

const ProjectStatus = ({ tasks, isPending, isError }: ProjectStatusProps) => {
  const liveTasks = tasks.filter((task) => !task.isDeleted);
  const statuses = TASK_STATUSES.map((status) => {
    const value = liveTasks.filter((task) => task.status === status).length;
    return {
      ...statusStyles[status],
      value,
      percent:
        liveTasks.length === 0
          ? "0%"
          : `${((value / liveTasks.length) * 100).toFixed(1)}%`,
    };
  });

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-border dark:bg-card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-headline text-lg font-bold text-zinc-900 dark:text-foreground">
            Your tasks by status
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-muted-foreground">
            Status of tasks assigned to you
          </p>
        </div>
        <span className="inline-flex rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-500 dark:border-border dark:text-muted-foreground">
          {isPending
            ? "Loading…"
            : isError
              ? "Unavailable"
              : `${liveTasks.length} total`}
        </span>
      </div>

      {isError && (
        <p role="alert" className="mt-5 text-sm text-destructive">
          Assigned tasks could not be loaded. Please try again later.
        </p>
      )}

      <div className="my-8">
        <div className="flex h-3 w-full overflow-hidden rounded-full gap-1 bg-zinc-100 dark:bg-muted">
          {statuses.map((status) => (
            <div
              key={status.label}
              className={`h-full ${status.barColor}`}
              style={{ width: status.percent }}
            />
          ))}
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
                {isPending ? "…" : isError ? "—" : status.value}
              </span>
              <span className="text-xs text-zinc-500 dark:text-muted-foreground">
                {isPending || isError ? "—" : status.percent}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectStatus;
