"use client";

import { useMemo } from "react";
import { Loader2, Trash2, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteComment, useGetTaskComments } from "@/hooks/comment.hooks";
import { useGetTaskDetails } from "@/hooks/task.hooks";
import { getErrorMessage } from "@/lib/api-error";
import {
  KANBAN_COLUMNS,
  PRIORITY_BADGE_CLASS,
  PRIORITY_LABELS,
  formatRelativeTime,
  getInitials,
  getMoveBlockedReason,
  isTaskStatus,
  type KanbanActor,
} from "@/lib/kanban";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types/task.types";
import { CommentForm } from "@/components/Form/Comment/CommentForm";


interface TaskDetailsSheetProps {
  /** The task to show; `null` keeps the sheet closed. */
  task: Task | null;
  projectName: string | null;
  actor: KanbanActor;
  onOpenChange: (open: boolean) => void;
  onChangeStatus: (task: Task, nextStatus: TaskStatus) => void;
}

export function TaskDetailsSheet({
  task,
  projectName,
  actor,
  onOpenChange,
  onChangeStatus,
}: TaskDetailsSheetProps) {
  const taskId = task?.id ?? "";
  const detailsQuery = useGetTaskDetails(taskId);
  const commentsQuery = useGetTaskComments(taskId);
  const { mutate: deleteComment, isPending: isDeleting, variables: deleteVariables } =
    useDeleteComment();

  const comments = useMemo(
    () =>
      (commentsQuery.data?.data ?? [])
        .filter((comment) => !comment.isDeleted)
        .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)),
    [commentsQuery.data],
  );

  const assignee = detailsQuery.data?.data?.assignee ?? task?.assignee ?? null;
  const isStatusLocked =
    task !== null &&
    KANBAN_COLUMNS.every(
      (column) =>
        column.id === task.status || getMoveBlockedReason(actor, task, column.id) !== null,
    );

  const handleDelete = (commentId: string) => {
    if (!task) return;
    deleteComment(
      { commentId, taskId: task.id, projectId: task.projectId },
      {
        onSuccess: () => toast.success("Comment deleted"),
        onError: (error) => toast.error(getErrorMessage(error, "Could not delete the comment")),
      },
    );
  };

  return (
    <Sheet open={task !== null} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-lg">
        {task && (
          <>
            <SheetHeader className="border-b border-border p-4 pr-12">
              <SheetTitle className="font-heading text-lg leading-snug">{task.title}</SheetTitle>
              <SheetDescription>{projectName ?? "Task details"}</SheetDescription>
            </SheetHeader>

            <div className="flex-1 space-y-6 overflow-y-auto p-4">
              <dl className="grid grid-cols-[7rem_1fr] items-center gap-x-3 gap-y-3 text-sm">
                <dt className="text-muted-foreground">Status</dt>
                <dd>
                  <Select
                    value={task.status}
                    disabled={isStatusLocked}
                    onValueChange={(value) => {
                      if (isTaskStatus(value) && value !== task.status) onChangeStatus(task, value);
                    }}
                  >
                    <SelectTrigger className="w-44" aria-label="Task status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {KANBAN_COLUMNS.map((column) => (
                        <SelectItem
                          key={column.id}
                          value={column.id}
                          disabled={
                            column.id !== task.status &&
                            getMoveBlockedReason(actor, task, column.id) !== null
                          }
                        >
                          {column.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isStatusLocked && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {getMoveBlockedReason(actor, task, "TODO") ?? "You can't change this status."}
                    </p>
                  )}
                </dd>

                <dt className="text-muted-foreground">Priority</dt>
                <dd>
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold",
                      PRIORITY_BADGE_CLASS[task.priority],
                    )}
                  >
                    {PRIORITY_LABELS[task.priority]}
                  </span>
                </dd>

                <dt className="text-muted-foreground">Assignee</dt>
                <dd className="flex items-center gap-2">
                  {assignee ? (
                    <>
                      <Avatar className="size-6">
                        <AvatarImage src={assignee.memberAvatarUrl ?? undefined} alt={assignee.name} />
                        <AvatarFallback className="bg-primary-subtle text-[10px] font-bold text-primary-subtle-foreground">
                          {getInitials(assignee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{assignee.name}</span>
                    </>
                  ) : (
                    <>
                      <UserRound className="size-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Unassigned</span>
                    </>
                  )}
                </dd>

                <dt className="text-muted-foreground">Created</dt>
                <dd className="text-foreground">{formatRelativeTime(task.createdAt)}</dd>
              </dl>

              {task.labels.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {task.labels.map((label) => (
                    <span
                      key={label}
                      className="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}

              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {task.description ?? "No description."}
              </p>

              <section aria-label="Comments" className="space-y-4">
                <h3 className="font-heading text-sm font-bold text-foreground">
                  Comments{commentsQuery.isSuccess ? ` (${comments.length})` : ""}
                </h3>

                {commentsQuery.isLoading && (
                  <div className="space-y-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                )}

                {commentsQuery.isError && (
                  <p className="text-sm text-destructive">
                    Couldn&apos;t load comments.{" "}
                    <button
                      type="button"
                      onClick={() => void commentsQuery.refetch()}
                      className="font-semibold underline"
                    >
                      Try again
                    </button>
                  </p>
                )}

                {commentsQuery.isSuccess && comments.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No comments yet. Share an update with the team.
                  </p>
                )}

                <ul className="space-y-4">
                  {comments.map((comment) => {
                    const isOwn = comment.memberId === actor.memberId;
                    const authorName = isOwn ? "You" : (comment.member?.name ?? "Team member");
                    const canDelete = actor.role === "MANAGER" || isOwn;
                    const isBeingDeleted =
                      isDeleting && deleteVariables?.commentId === comment.id;
                    return (
                      <li key={comment.id} className="flex gap-3">
                        <Avatar className="mt-0.5 size-7">
                          <AvatarImage
                            src={comment.member?.memberAvatarUrl ?? undefined}
                            alt={authorName}
                          />
                          <AvatarFallback className="bg-muted text-[10px] font-bold text-muted-foreground">
                            {getInitials(authorName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs">
                              <span className="font-bold text-foreground">{authorName}</span>{" "}
                              <span className="text-muted-foreground">
                                {formatRelativeTime(comment.createdAt)}
                              </span>
                            </p>
                            {canDelete && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="size-6 text-muted-foreground hover:text-destructive"
                                aria-label="Delete comment"
                                disabled={isBeingDeleted}
                                onClick={() => handleDelete(comment.id)}
                              >
                                {isBeingDeleted ? (
                                  <Loader2 className="size-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="size-3.5" />
                                )}
                              </Button>
                            )}
                          </div>
                          <p className="mt-0.5 whitespace-pre-wrap wrap-break-word text-sm text-foreground">
                            {comment.content}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>

            <CommentForm key={task.id} task={task} />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}