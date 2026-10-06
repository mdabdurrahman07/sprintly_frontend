import { CreditCard, FolderOpen, Users, Workflow } from "lucide-react";
import type { myPaymentResponse } from "@/types/payment.types";
import type { ProjectSummary } from "@/types/project.types";
import type { Task } from "@/types/task.types";

interface ProjectKpiCardsProps {
  projects: ProjectSummary[];
  tasks: Task[];
  payments: myPaymentResponse[];
  projectsPending: boolean;
  tasksPending: boolean;
  paymentsPending: boolean;
  projectsError: boolean;
  tasksError: boolean;
  paymentsError: boolean;
}

const getMemberCount = (projects: ProjectSummary[]) => {
  const memberIds = new Set<string>();
  let unidentifiedMemberships = 0;

  for (const project of projects) {
    for (const member of project.members) {
      if (member && typeof member === "object") {
        const record = member as Record<string, unknown>;
        const nestedMember =
          record.member && typeof record.member === "object"
            ? (record.member as Record<string, unknown>)
            : undefined;
        const id =
          record.id ?? record.memberId ?? nestedMember?.id ?? nestedMember?.memberId;
        if (typeof id === "string") {
          memberIds.add(id);
          continue;
        }
      }
      unidentifiedMemberships += 1;
    }
  }

  return memberIds.size + unidentifiedMemberships;
};

const formatDate = (dateValue: string) => {
  const date = new Date(dateValue);
  return Number.isNaN(date.getTime())
    ? null
    : new Intl.DateTimeFormat("en-BD", { dateStyle: "medium" }).format(date);
};

const ProjectKpiCards = ({
  projects,
  tasks,
  payments,
  projectsPending,
  tasksPending,
  paymentsPending,
  projectsError,
  tasksError,
  paymentsError,
}: ProjectKpiCardsProps) => {
  const liveProjects = projects.filter((project) => !project.isDeleted);
  const liveTasks = tasks.filter((task) => !task.isDeleted);
  const inProgressTasks = liveTasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;
  const activePayment = payments.find(
    (payment) => payment.subscription?.status?.toLowerCase() === "active",
  );
  const formattedEndDate = activePayment
    ? formatDate(activePayment.subscription.endDate)
    : null;

  const kpiData = [
    {
      title: "Projects",
      value: projectsPending
        ? "…"
        : projectsError
          ? "Unavailable"
          : liveProjects.length,
      description: "Managed projects",
      icon: FolderOpen,
      iconColor:
        "text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400",
      topBorder: "bg-blue-600",
      badgeText: projectsError
        ? "Could not load"
        : projectsPending
          ? "Loading"
          : "Current total",
      badgeStyle:
        "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-primary/10 dark:text-primary",
    },
    {
      title: "Tasks In Progress",
      value: tasksPending
        ? "…"
        : tasksError
          ? "Unavailable"
          : inProgressTasks,
      description:
        tasksPending || tasksError
          ? "Assigned to you"
          : `of ${liveTasks.length} assigned`,
      icon: Workflow,
      iconColor:
        "text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400",
      topBorder: "bg-indigo-500",
      badgeText: tasksError
        ? "Could not load"
        : tasksPending
          ? "Loading"
          : "Assigned tasks",
      badgeStyle:
        "bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-muted dark:text-muted-foreground",
    },
    {
      title: "Team Members",
      value: projectsPending
        ? "…"
        : projectsError
          ? "Unavailable"
          : getMemberCount(liveProjects),
      description: "Across your projects",
      icon: Users,
      iconColor:
        "text-cyan-600 bg-cyan-50 dark:bg-cyan-500/10 dark:text-cyan-400",
      topBorder: "bg-cyan-400",
      badgeText: projectsError
        ? "Could not load"
        : projectsPending
          ? "Loading"
          : `${liveProjects.length} projects`,
      badgeStyle:
        "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-primary/10 dark:text-primary",
    },
    {
      title: activePayment ? "Active Subscription" : "Subscription",
      value: paymentsPending
        ? "Loading…"
        : paymentsError
          ? "Unavailable"
          : activePayment
            ? formattedEndDate
              ? `Renews ${formattedEndDate}`
              : activePayment.provider || "Active plan"
            : "No active plan",
      description: activePayment?.provider || "Billing",
      icon: CreditCard,
      iconColor:
        "text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400",
      topBorder: activePayment ? "bg-emerald-500" : "bg-amber-500",
      badgeText: paymentsError
        ? "Could not load"
        : paymentsPending
          ? "Loading"
          : activePayment
            ? "Active"
            : "No active plan",
      badgeStyle: activePayment
        ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400"
        : "bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-muted dark:text-muted-foreground",
      badgeHasDot: Boolean(activePayment),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => (
        <div
          key={kpi.title}
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
              {"badgeHasDot" in kpi && kpi.badgeHasDot && (
                <div className="size-1.5 rounded-full bg-emerald-500" />
              )}
              {kpi.badgeText}
            </span>
          </div>

          <div className="mt-6">
            <h3 className="font-headline text-2xl font-bold tracking-tight text-zinc-900 dark:text-foreground">
              {kpi.value}
            </h3>
            <p className="mt-1 text-sm font-semibold text-zinc-700 dark:text-foreground">
              {kpi.title}
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-muted-foreground">
              {kpi.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectKpiCards;
