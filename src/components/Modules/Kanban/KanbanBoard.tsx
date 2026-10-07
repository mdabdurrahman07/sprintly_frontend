"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  KANBAN_COLUMNS,
  getMoveBlockedReason,
  groupTasksByStatus,
  isTaskStatus,
  type KanbanActor,
} from "@/lib/kanban";
import type { KanbanRole, Task, TaskStatus } from "@/types/task.types";
import { KanbanColumn } from "./KanbanColumn";
import { TaskCardView } from "../Tasks/TaskCard";


const GRID_CLASS = "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4";

export function KanbanBoardSkeleton() {
  return (
    <div className={GRID_CLASS} aria-busy="true" aria-label="Loading board">
      {KANBAN_COLUMNS.map((column) => (
        <div key={column.id} className="min-h-[28rem] space-y-3 rounded-2xl bg-muted/50 p-3">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      ))}
    </div>
  );
}

interface KanbanBoardProps {
  tasks: readonly Task[];
  role: KanbanRole;
  /** Member profile id of the signed-in user (`null` for managers). */
  currentMemberId: string | null;
  /** Called after a permitted drop onto a different column. */
  onMoveTask: (task: Task, nextStatus: TaskStatus) => void;
  onOpenTask: (task: Task) => void;
}

export function KanbanBoard({
  tasks,
  role,
  currentMemberId,
  onMoveTask,
  onOpenTask,
}: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const columns = useMemo(() => groupTasksByStatus(tasks), [tasks]);
  const actor = useMemo<KanbanActor>(
    () => ({ role, memberId: currentMemberId }),
    [role, currentMemberId],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTask(tasks.find((task) => task.id === active.id) ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null);
    if (!over) return;

    const task = tasks.find((candidate) => candidate.id === active.id);
    const target = over.id;
    if (!task || !isTaskStatus(target) || task.status === target) return;

    const blockedReason = getMoveBlockedReason(actor, task, target);
    if (blockedReason) {
      toast.error(blockedReason);
      return;
    }
    onMoveTask(task, target);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveTask(null)}
    >
      <div className={GRID_CLASS}>
        {KANBAN_COLUMNS.map((config) => (
          <KanbanColumn
            key={config.id}
            config={config}
            tasks={columns[config.id]}
            actor={actor}
            activeTask={activeTask}
            onOpenTask={onOpenTask}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? <TaskCardView task={activeTask} className="shadow-lg" /> : null}
      </DragOverlay>
    </DndContext>
  );
}