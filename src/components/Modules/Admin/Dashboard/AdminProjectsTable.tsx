import React from "react";
import { Zap, Archive, Smartphone, Clipboard, Layout, Globe } from "lucide-react";
import { AdminProject } from "@/types/admin.types";
import { Meta } from "@/types/api.types";


interface AdminProjectsTableProps {
  projects: AdminProject[];
  meta?: Meta;
  isLoading?: boolean;
}

// Helper to assign a dynamic icon/color based on index to match mockup styling
const getProjectIconConfig = (index: number) => {
  const configs = [
    { icon: Zap, bg: "bg-primary-subtle", color: "text-primary" },
    { icon: Archive, bg: "bg-warning-subtle", color: "text-warning" },
    { icon: Smartphone, bg: "bg-chart-4/10", color: "text-chart-4" },
    { icon: Clipboard, bg: "bg-success-subtle", color: "text-success" },
    { icon: Layout, bg: "bg-destructive/10", color: "text-destructive" },
    { icon: Globe, bg: "bg-primary-subtle", color: "text-primary" },
  ];
  return configs[index % configs.length];
};

// Helper for initials
const getInitials = (name: string) => {
  return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
};

export function AdminProjectsTable({ projects, meta, isLoading }: AdminProjectsTableProps) {
  return (
    <div className="flex flex-col h-full rounded-3xl border border-border bg-card shadow-sm min-h-[450px]">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-foreground">All Projects</h3>
          <span className="px-2 py-0.5 rounded-md bg-muted text-xs font-medium text-muted-foreground">
            {meta?.total || projects.length} shown
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Read-only overview across the platform</p>
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs font-bold text-muted-foreground bg-card uppercase border-b border-border">
            <tr>
              <th className="px-6 py-4 w-16">#</th>
              <th className="px-6 py-4">PROJECT</th>
              <th className="px-6 py-4">MANAGER</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground animate-pulse">Loading projects...</td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">No projects found.</td>
              </tr>
            ) : (
              projects.map((project, index) => {
                const IconConfig = getProjectIconConfig(index);
                const ProjectIcon = IconConfig.icon;
                
                return (
                  <tr key={project.id} className="hover:bg-muted/40 transition-colors group">
                    <td className="px-6 py-4 text-muted-foreground font-medium">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex size-8 items-center justify-center rounded-lg ${IconConfig.bg} ${IconConfig.color}`}>
                          <ProjectIcon className="size-4" />
                        </div>
                        <span className="font-semibold text-foreground">{project.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-7 items-center justify-center rounded-full bg-gray-800 text-white text-[10px] font-bold">
                          {getInitials(project.manager?.name || "Unknown")}
                        </div>
                        <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          {project.manager?.name || "Unassigned"}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between p-6 border-t border-border">
        <span className="text-xs font-medium text-muted-foreground">
          Showing 1 to {projects.length} of {meta?.total || projects.length} projects
        </span>
        
        <div className="flex items-center gap-1">
          <button className="px-3 py-1 text-xs font-medium text-muted-foreground border border-border rounded-md hover:bg-muted transition-colors disabled:opacity-50">
            Previous
          </button>
          <button className="size-7 flex items-center justify-center rounded-md bg-primary text-white text-xs font-bold">
            1
          </button>
          <button className="size-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted text-xs font-bold transition-colors">
            2
          </button>
          <button className="px-3 py-1 text-xs font-medium text-muted-foreground border border-border rounded-md hover:bg-muted transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}