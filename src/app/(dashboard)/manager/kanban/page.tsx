import { KanbanView } from "@/components/Modules/Kanban/KanbanView";
import React from "react";

const managerKanbanPage = () => {
  return <KanbanView createProjectHref="/manager/projects"></KanbanView>;
};

export default managerKanbanPage;
