import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import React from "react";
import CreateProjectDialog from "./CreateProjectDialog";

const ProjectHeader = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-headline text-2xl font-bold tracking-tight text-zinc-900 dark:text-foreground">
          Projects
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-muted-foreground">
          All the projects you're managing, in one place
        </p>
      </div>
      <div className="flex items-center gap-3">
        <CreateProjectDialog>
          <Button className="rounded-full bg-blue-600 px-5 font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 dark:bg-primary dark:hover:bg-primary-hover">
            <Plus className="mr-2 size-4" />
            Create Project
          </Button>
        </CreateProjectDialog>
      </div>
    </div>
  );
};

export default ProjectHeader;
