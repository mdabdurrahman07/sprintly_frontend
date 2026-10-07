"use client";

import type { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Check, GripVertical, MessageSquare, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PRIORITY_BADGE_CLASS,
  PRIORITY_LABELS,
  formatRelativeTime,
  getInitials,
} from "@/lib/kanban";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/task.types";

const MAX_VISIBLE_LABELS = 3;

interface TaskCardViewProps {
  task: Task;
  onOpen?: (task: Task) => void;
  /** Drag handle slot, rendered at the top right of the card. */
  handle?: ReactNode;
  className?: string;
}

/** Pure presentation. Also used inside the drag overlay, so it must not call useDraggable. */
export function TaskCardView({ task, onOpen, handle, className }: TaskCardViewProps) {
  const commentCount = task.comments?.length;
  const visibleLabels = task.labels.slice(0, MAX_VISIBLE_LABELS);
  const hiddenLabelCount = task.labels.length - visibleLabels.length;

  return (
    <div
      onClick={() => onOpen?.(task)}
      className={cn(
        "group relative rounded-2xl border border-border bg-card p-4 shadow-xs transition-colors hover:border-primary-border",
        onOpen && "cursor-pointer",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold",
            PRIORITY_BADGE_CLASS[task.priority],
          )}
        >
          {PRIORITY_LABELS[task.priority]}
          {task.status === "DONE" && <Check className="ml-1 size-3 text-success" />}
        </span>
        {handle}
      </div>

      <h4 className="mt-2.5 font-heading text-sm font-bold leading-snug text-foreground">
        <button
          type="button"
          className="rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {task.title}
        </button>
      </h4>
      {task.description && (
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {task.description}
        </p>
      )}

      {visibleLabels.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {visibleLabels.map((label) => (
            <span
              key={label}
              className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
            >
              {label}
            </span>
          ))}
          {hiddenLabelCount > 0 && (
            <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
              +{hiddenLabelCount}
            </span>
          )}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
        <div className="flex items-center gap-2">
          {task.assignee ? (
            <Avatar className="size-6" title={task.assignee.name}>
              <AvatarImage
                src={task.assignee.memberAvatarUrl ?? undefined}
                alt={task.assignee.name}
              />
              <AvatarFallback className="bg-primary-subtle text-[10px] font-bold text-primary-subtle-foreground">
                {getInitials(task.assignee.name)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <span
              title={task.assigneeId === null ? "Unassigned" : "Assigned"}
              className="flex size-6 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground"
            >
              <UserRound className="size-3" />
            </span>
          )}
          <span className="text-[11px] font-semibold text-muted-foreground">
            {formatRelativeTime(task.createdAt)}
          </span>
        </div>

        {commentCount !== undefined && (
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <MessageSquare className="size-3" />
            <span>{commentCount}</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface DraggableTaskCardProps {
  task: Task;
  isDragDisabled: boolean;
  onOpen: (task: Task) => void;
}

/** Card inside a column. The original stays in place (dimmed) while the DragOverlay follows the pointer. */
export function DraggableTaskCard({ task, isDragDisabled, onOpen }: DraggableTaskCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    disabled: isDragDisabled,
  });

  return (
    <div ref={setNodeRef} className={cn(isDragging && "opacity-40")}>
      <TaskCardView
        task={task}
        onOpen={onOpen}
        handle={
          !isDragDisabled && (
            <button
              type="button"
              aria-label={`Drag ${task.title}`}
              onClick={(event) => event.stopPropagation()}
              {...attributes}
              {...listeners}
              className="touch-none cursor-grab rounded text-muted-foreground transition-opacity hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing md:opacity-0 md:focus-visible:opacity-100 md:group-hover:opacity-100"
            >
              <GripVertical className="size-4" />
            </button>
          )
        }
      />
    </div>
  );
}