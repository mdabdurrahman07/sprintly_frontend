"use client";
import { useGetProjects } from "@/hooks/project.hooks";
import React from "react";
import ProjectHeader from "../Projects/CreateProject/ProjectHeader";
import ProjectBarGraph from "./ProjectBarGraph";
import ProjectCalendar from "./ProjectCalendar";

const ManagerDashboard = () => {
  const projectsQuery = useGetProjects({ limit: 100 });
  const projects = projectsQuery.data?.data ?? [];
  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Project Graph (2 Columns) */}
        <div className="lg:col-span-2">
          <ProjectBarGraph
            projects={projects}
            isPending={projectsQuery.isPending}
            isError={projectsQuery.isError}
          />
        </div>

        <div className="lg:col-span-1">
          <ProjectCalendar />
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;
