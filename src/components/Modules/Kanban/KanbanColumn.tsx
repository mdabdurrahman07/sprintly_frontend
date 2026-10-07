"use client";

import { useDroppable } from "@dnd-kit/core";
import { Lock } from "lucide-react";
import {
  canDragTask,
  getMoveBlockedReason,
  type KanbanActor,
  type KanbanColumnConfig,
} from "@/lib/kanban";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/task.types";
import { DraggableTaskCard } from "../Tasks/TaskCard";

interface KanbanColumnProps {
  config: KanbanColumnConfig;
  tasks: readonly Task[];
  actor: KanbanActor;
  /** The task currently being dragged, if any. */
  activeTask: Task | null;
  onOpenTask: (task: Task) => void;
}

export function KanbanColumn({
  config,
  tasks,
  actor,
  activeTask,
  onOpenTask,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: config.id });

  const isDropBlocked =
    activeTask !== null &&
    activeTask.status !== config.id &&
    getMoveBlockedReason(actor, activeTask, config.id) !== null;
  const isManagerOnly = actor.role === "MEMBER" && config.id === "DONE";

  return (
    <section
      ref={setNodeRef}
      aria-label={`${config.title} column`}
      className={cn(
        "relative flex min-h-112 flex-col rounded-2xl bg-muted/50 p-3 transition-colors",
        isOver && !isDropBlocked && "bg-primary-subtle ring-2 ring-primary/30",
        isOver && isDropBlocked && "ring-2 ring-destructive/40",
        isDropBlocked && "opacity-60",
      )}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={cn("size-2 rounded-full", config.dotClass)} />
          <h3 className="font-heading text-sm font-bold text-foreground">
            {config.title}
          </h3>
          <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[11px] font-bold text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        {isManagerOnly && (
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
            <Lock className="size-3" /> Manager only
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {tasks.map((task) => (
          <DraggableTaskCard
            key={task.id}
            task={task}
            isDragDisabled={!canDragTask(actor, task)}
            onOpen={onOpenTask}
          />
        ))}
        {tasks.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-border p-4 text-center text-xs font-medium text-muted-foreground">
            {activeTask ? "Drop here" : "No tasks here"}
          </div>
        )}
      </div>
    </section>
  );
}
