import React from "react";
import { ArrowRight } from "lucide-react";
import type { Task } from "@/types/task.types";

interface TaskCardProps {
  tasks: Task[];
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "TODO":
      return { dot: "bg-muted-foreground", badge: "text-muted-foreground bg-muted", label: "To do" };
    case "IN_PROGRESS":
      return { dot: "bg-primary", badge: "text-primary bg-primary-subtle", label: "In progress" };
    case "IN_REVIEW":
      return { dot: "bg-warning", badge: "text-warning-foreground bg-warning-subtle", label: "In review" };
    case "DONE":
      return { dot: "bg-success", badge: "text-success-foreground bg-success-subtle", label: "Done" };
    default:
      return { dot: "bg-muted", badge: "text-muted-foreground bg-muted", label: status };
  }
};

export function TaskCard({ tasks }: TaskCardProps) {
  return (
    <div className="flex flex-col h-full rounded-3xl border border-border bg-card p-6 shadow-sm min-h-112.5">
      <div className="flex items-start justify-between border-b border-border pb-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">My tasks</h3>
          <p className="text-sm text-muted-foreground">Tasks assigned directly to you</p>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors">
          View Kanban <ArrowRight className="size-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-1">
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">No tasks assigned.</p>
        ) : (
          tasks.map((task) => {
            const styles = getStatusStyles(task.status);
            const formattedDate = new Date(task.updatedAt || task.createdAt).toLocaleDateString('en-US', { 
              month: 'short', day: 'numeric', year: 'numeric' 
            });

            return (
              <div key={task.id} className="flex items-center justify-between py-3 group hover:bg-muted/40 rounded-xl px-2 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`mt-1.5 size-2.5 rounded-full shrink-0 ${styles.dot}`} />
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span className="bg-muted px-1.5 py-0.5 rounded text-[10px] font-medium text-foreground/70">
                        {task.project?.name || "Core Roadmap"}
                      </span>
                      <span>•</span>
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full shrink-0 ${styles.badge}`}>
                  {styles.label}
                </span>
              </div>
            );
          })
        )}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4 mt-2">
        <span className="text-xs text-muted-foreground">
          Showing {Math.min(4, tasks.length)} of {tasks.length} assigned tasks
        </span>
      </div>
    </div>
  );
}