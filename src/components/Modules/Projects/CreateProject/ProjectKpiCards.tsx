import { FolderOpen, Clock, Users, CreditCard } from "lucide-react";

const kpiData = [
  {
    id: 1,
    title: "Active Projects",
    value: "6",
    icon: FolderOpen,
    iconColor:
      "text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400",
    topBorder: "bg-blue-600",
    badgeText: "↗ +2 this month",
    badgeStyle:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400",
    visual: (
      <svg
        className="h-8 w-16 text-blue-600 dark:text-primary"
        fill="none"
        viewBox="0 0 64 32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 24l12-8 12 4L44 8l16-4" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Tasks In Progress",
    value: "24",
    icon: Clock,
    iconColor:
      "text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400",
    topBorder: "bg-indigo-500",
    badgeText: "8 due this week",
    badgeStyle:
      "bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-muted dark:text-muted-foreground",
    visual: (
      <div className="relative flex size-10 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-500/10">
        <svg
          className="absolute inset-0 size-full -rotate-90 text-indigo-600 dark:text-indigo-400"
          viewBox="0 0 36 36"
        >
          <path
            className="text-zinc-200 dark:text-muted"
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-current"
            strokeWidth="3"
            strokeDasharray="75, 100"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
          75%
        </span>
      </div>
    ),
  },
  {
    id: 3,
    title: "Team Members",
    value: "12",
    icon: Users,
    iconColor:
      "text-cyan-600 bg-cyan-50 dark:bg-cyan-500/10 dark:text-cyan-400",
    topBorder: "bg-cyan-400",
    badgeText: "Across 3 squads",
    badgeStyle:
      "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-primary/10 dark:text-primary",
    visual: (
      <div className="flex -space-x-2">
        {["MK", "TL", "SK"].map((initial, i) => (
          <div
            key={initial}
            className={`flex size-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white dark:border-card ${i === 0 ? "bg-blue-600" : i === 1 ? "bg-indigo-500" : "bg-zinc-800"}`}
          >
            {initial}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 4,
    title: "Pro Plan",
    value: "Renews Oct 24 · bKash",
    valueIsSubtitle: true,
    icon: CreditCard,
    iconColor:
      "text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400",
    topBorder: "bg-emerald-500",
    badgeText: "Active",
    badgeHasDot: true,
    badgeStyle:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400",
    visual: (
      <div className="flex size-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20">
        <div className="size-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/30" />
      </div>
    ),
  },
];

const ProjectKpiCards = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => (
        <div
          key={kpi.id}
          className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-border dark:bg-card"
        >
          <div
            className={`absolute left-0 top-0 h-1 w-full ${kpi.topBorder}`}
          />

          <div className="flex items-start justify-between">
            <div
              className={`flex size-10 items-center justify-center rounded-xl ${kpi.iconColor}`}
            >
              <kpi.icon className="size-5" />
            </div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${kpi.badgeStyle}`}
            >
              {kpi.badgeHasDot && (
                <div className="size-1.5 rounded-full bg-emerald-500" />
              )}
              {kpi.badgeText}
            </span>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              {kpi.valueIsSubtitle ? (
                <>
                  <h3 className="font-headline text-2xl font-bold text-zinc-900 dark:text-foreground">
                    {kpi.title}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-muted-foreground">
                    {kpi.value}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-headline text-3xl font-bold tracking-tight text-zinc-900 dark:text-foreground">
                    {kpi.value}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-muted-foreground">
                    {kpi.title}
                  </p>
                </>
              )}
            </div>
            <div className="pb-1">{kpi.visual}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectKpiCards;
