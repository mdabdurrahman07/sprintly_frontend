"use client";

import { useGetMyPayments } from "@/hooks/payment.hooks";
import { useGetProjects } from "@/hooks/project.hooks";
import { useGetMyAssignedTask } from "@/hooks/task.hooks";
import ProjectGraph from "./ProjectGraph";
import ProjectHeader from "./ProjectHeader";
import ProjectKpiCards from "./ProjectKpiCards";
import ProjectStatus from "./ProjectStatus";
import ProjectTable from "../ProjectTable/ProjectTable";

const CreateProjectPage = () => {
  const projectsQuery = useGetProjects({ limit: 100 });
  const tasksQuery = useGetMyAssignedTask();
  const paymentsQuery = useGetMyPayments();
  const projects = projectsQuery.data?.data ?? [];
  const tasks = tasksQuery.data?.data ?? [];
  const payments = paymentsQuery.data?.data ?? [];

  return (
    <>
      <ProjectHeader />
      <ProjectKpiCards
        projects={projects}
        tasks={tasks}
        payments={payments}
        projectsPending={projectsQuery.isPending}
        tasksPending={tasksQuery.isPending}
        paymentsPending={paymentsQuery.isPending}
        projectsError={projectsQuery.isError}
        tasksError={tasksQuery.isError}
        paymentsError={paymentsQuery.isError}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProjectStatus
            tasks={tasks}
            isPending={tasksQuery.isPending}
            isError={tasksQuery.isError}
          />
        </div>
        <div className="lg:col-span-1">
          <ProjectGraph
            projects={projects}
            isPending={projectsQuery.isPending}
            isError={projectsQuery.isError}
          />
        </div>
      </div>
      <ProjectTable />
    </>
  );
};

export default CreateProjectPage;
