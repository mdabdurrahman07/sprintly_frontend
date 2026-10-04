import ProjectGraph from "@/components/Modules/Projects/CreateProject/ProjectGraph";
import ProjectHeader from "@/components/Modules/Projects/CreateProject/ProjectHeader";
import ProjectKpiCards from "@/components/Modules/Projects/CreateProject/ProjectKpiCards";
import ProjectStatus from "@/components/Modules/Projects/CreateProject/ProjectStatus";
import React from "react";

const managerProjectsPage = () => {
  return (
    <div className="space-y-6">
      <ProjectHeader />

      <ProjectKpiCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProjectStatus />
        </div>
        <div className="lg:col-span-1">
          <ProjectGraph />
        </div>
      </div>
    </div>
  );
};

export default managerProjectsPage;
