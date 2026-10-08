"use client";

import React from "react";
import { ClipboardList, CheckCircle2, MessageSquare, LaptopMinimalCheck } from "lucide-react";
import { useGetMyAssignedTask } from "@/hooks/task.hooks";
import { Task } from "@/types/task.types";
import { StatCard } from "./StatCard";
import { TaskCard } from "./TaskCard";
import { MemberDashboardCalendar } from "./MemberDashboardCalendar";

export default function MemberDashboard() {
  const { data: response, isLoading } = useGetMyAssignedTask();
  const tasks: Task[] = response?.data || [];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "DONE").length;
  const totalComments = tasks.reduce(
    (acc, task) => acc + (task.comments?.length || 0),
    0,
  );

  const deadlines = tasks
    .filter((t) => t.status !== "DONE")
    .map((t) => new Date(t.updatedAt || t.createdAt));

  if (isLoading) {
    return (
      <div className="p-8 text-muted-foreground animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-4 md:p-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={ClipboardList}
          iconBg="bg-primary-subtle"
          iconColor="text-primary"
          pillText="Tasks"
          pillColor="bg-primary-subtle text-primary"
          value={totalTasks || 9}
          label="Assigned Tasks"
        >
          <svg
            className="w-16 h-8 stroke-primary stroke-2 fill-none"
            viewBox="0 0 50 20"
          >
            <polyline points="0,15 10,10 20,12 30,5 40,8 50,0" />
          </svg>
        </StatCard>

        <StatCard
          icon={CheckCircle2}
          iconBg="bg-success-subtle"
          iconColor="text-success"
          pillText="Completed Tasks"
          pillColor="bg-success-subtle text-success-foreground"
          value={completedTasks || 0}
          label="Completed This Week"
        >
          <LaptopMinimalCheck className="bg-success-subtle text-success-foreground text-success"/>
        </StatCard>

        <StatCard
          icon={MessageSquare}
          iconBg="bg-muted"
          iconColor="text-muted-foreground"
          pillText="Messages"
          pillColor="border border-border text-foreground"
          value={totalComments || 0}
          label="Comments"
        ></StatCard>
      </div>

      {/* Main Content Grid: items-stretch keeps heights equalized */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 h-full">
          <TaskCard tasks={tasks} />
        </div>
        <div className="lg:col-span-4 h-full">
          <MemberDashboardCalendar deadlineDates={deadlines} />
        </div>
      </div>
    </div>
  );
}
