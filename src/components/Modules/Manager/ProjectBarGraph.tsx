"use client";

import React from "react";
import type { ProjectSummary } from "@/types/project.types";
import { Loader2 } from "lucide-react";

interface ProjectGraphProps {
  projects: ProjectSummary[];
  isPending: boolean;
  isError: boolean;
}

const ProjectBarGraph = ({ projects, isPending, isError }: ProjectGraphProps) => {
  const now = new Date();
  
  // Calculate project counts for the last 6 months
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
        date.getMonth() === createdAt.getMonth()
    );
    if (month) month.count += 1;
  }

  const totalProjects = projects.filter((p) => !p.isDeleted).length;
  const maximum = Math.max(1, ...months.map(({ count }) => count));
  const currentMonthIndex = months.length - 1;

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-xs dark:border-border dark:bg-card">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-headline text-lg font-bold text-zinc-900 dark:text-foreground">
            New projects
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-muted-foreground">
            Projects created in the last six months
          </p>
        </div>

        {/* Top Right Pill Badge */}
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:border-border dark:bg-muted dark:text-foreground">
          Total {totalProjects} projects
        </div>
      </div>

      {/* Main Content Area */}
      {isError ? (
        <div className="my-12 text-center text-xs text-rose-500">
          Project activity could not be loaded. Please try again later.
        </div>
      ) : isPending ? (
        <div className="my-12 flex items-center justify-center text-zinc-400">
          <Loader2 className="size-6 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="my-6 grid grid-cols-6 items-end gap-3 sm:gap-4">
          {months.map((month, index) => {
            const isCurrent = index === currentMonthIndex;
            const fillPercentage = (month.count / maximum) * 100;

            return (
              <div
                key={`${month.date.getFullYear()}-${month.date.getMonth()}`}
                className="flex flex-col items-center gap-2"
              >
                {/* Count above bar */}
                <span
                  className={`text-xs font-bold ${
                    isCurrent
                      ? "text-blue-600 dark:text-primary"
                      : "text-zinc-400 dark:text-muted-foreground"
                  }`}
                >
                  {month.count}
                </span>

                {/* Vertical Bar Track */}
                <div className="relative flex h-36 w-full max-w-12 items-end overflow-hidden rounded-2xl bg-zinc-100 p-1 dark:bg-muted/50">
                  <div
                    style={{ height: `${Math.max(12, fillPercentage)}%` }}
                    className={`w-full rounded-xl transition-all duration-500 ${
                      isCurrent
                        ? "bg-blue-600 shadow-xs dark:bg-primary"
                        : "bg-blue-500/70 hover:bg-blue-600/90 dark:bg-primary/60"
                    }`}
                  />
                </div>

                {/* Month Label */}
                <span
                  className={`text-xs font-semibold ${
                    isCurrent
                      ? "font-bold text-zinc-900 dark:text-foreground"
                      : "text-zinc-400 dark:text-muted-foreground"
                  }`}
                >
                  {month.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Legend */}
      <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-xs dark:border-border/50">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-blue-600 dark:bg-primary" />
          <span className="text-xs font-medium text-zinc-600 dark:text-muted-foreground">
            Created projects
          </span>
        </div>
        <span className="text-xs text-zinc-400 dark:text-muted-foreground">
          Target: <span className="font-semibold text-zinc-700 dark:text-foreground">100% achieved</span>
        </span>
      </div>
    </div>
  );
};

export default ProjectBarGraph;