import type { ProjectSummary } from "@/types/project.types";

interface ProjectGraphProps {
  projects: ProjectSummary[];
  isPending: boolean;
  isError: boolean;
}

const ProjectGraph = ({ projects, isPending, isError }: ProjectGraphProps) => {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, index) => {
    const month = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
    return {
      date: month,
      label: new Intl.DateTimeFormat("en", { month: "short" }).format(month),
      count: 0,
    };
  });

  for (const project of projects) {
    if (project.isDeleted) continue;
    const createdAt = new Date(project.createdAt);
    if (Number.isNaN(createdAt.getTime())) continue;
    const month = months.find(
      ({ date }) =>
        date.getFullYear() === createdAt.getFullYear() &&
        date.getMonth() === createdAt.getMonth(),
    );
    if (month) month.count += 1;
  }

  const maximum = Math.max(1, ...months.map(({ count }) => count));
  const points = months.map(({ count }, index) => ({
    x: (index / (months.length - 1)) * 300,
    y: 85 - (count / maximum) * 75,
  }));
  const linePath = `M${points
    .map(({ x, y }) => `${x},${y}`)
    .join(" L")}`;
  const areaPath = `${linePath} L300,100 L0,100 Z`;
  const previousPeriodTotal = months
    .slice(0, 3)
    .reduce((total, month) => total + month.count, 0);
  const currentPeriodTotal = months
    .slice(3)
    .reduce((total, month) => total + month.count, 0);
  const periodChange =
    previousPeriodTotal === 0
      ? currentPeriodTotal === 0
        ? "0%"
        : "New"
      : `${currentPeriodTotal >= previousPeriodTotal ? "+" : ""}${Math.round(
          ((currentPeriodTotal - previousPeriodTotal) / previousPeriodTotal) *
            100,
        )}%`;
  const currentMonthCount = months[months.length - 1].count;

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-border dark:bg-card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-headline text-lg font-bold text-zinc-900 dark:text-foreground">
            New projects
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-muted-foreground">
            Projects created in the last six months
          </p>
        </div>
        {/* <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-primary/10 dark:text-primary">
          {isPending ? "…" : isError ? "Unavailable" : periodChange}
          <br />
          vs prior 3 months
        </span> */}
      </div>

      {isError && (
        <p role="alert" className="mt-5 text-sm text-destructive">
          Project activity could not be loaded. Please try again later.
        </p>
      )}

      <div className="relative mt-8 h-[140px] w-full">
        <svg
          className="absolute inset-0 size-full overflow-visible"
          viewBox="0 0 300 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor="currentColor"
                stopOpacity="0.2"
                className="text-blue-500"
              />
              <stop
                offset="100%"
                stopColor="currentColor"
                stopOpacity="0"
                className="text-blue-500"
              />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1="50"
            x2="300"
            y2="50"
            stroke="currentColor"
            strokeDasharray="3 3"
            strokeWidth="1"
            className="text-zinc-200 dark:text-border"
          />
          <line
            x1="0"
            y1="100"
            x2="300"
            y2="100"
            stroke="currentColor"
            strokeDasharray="3 3"
            strokeWidth="1"
            className="text-zinc-200 dark:text-border"
          />
          <path d={areaPath} fill="url(#blueGradient)" />
          <path
            d={linePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-blue-600 dark:text-primary"
          />
          {points.map(({ x, y }, index) => (
            <circle
              key={`${months[index].date.getFullYear()}-${months[index].date.getMonth()}`}
              cx={x}
              cy={y}
              r="3.5"
              fill="white"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blue-600 dark:text-primary"
            />
          ))}
        </svg>

        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[11px] font-medium text-zinc-400">
          {months.map((month, index) => (
            <span
              key={`${month.date.getFullYear()}-${month.date.getMonth()}`}
              className={
                index === months.length - 1
                  ? "font-bold text-blue-600 dark:text-primary"
                  : undefined
              }
            >
              {month.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-zinc-100 pt-4 text-xs text-zinc-500 dark:border-border/50 dark:text-muted-foreground">
        {isPending ? (
          "Loading activity…"
        ) : isError ? (
          "Monthly activity unavailable"
        ) : (
          <>
            New projects this month{" "}
            <span className="font-semibold text-zinc-900 dark:text-foreground">
              {currentMonthCount}{" "}
              {currentMonthCount === 1 ? "project" : "projects"}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectGraph;
