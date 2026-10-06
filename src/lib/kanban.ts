import { ApiResponse } from "@/types/api.types";
import {
  KanbanRole,
  Task,
  TASK_STATUSES,
  TaskAssignee,
  TaskBase,
  TaskPriority,
  TaskStatus,
} from "@/types/task.types";
import { userRole } from "@/types/user.types";

export const KANBAN_TASK_LIMIT = 100;
export const MAX_LABELS = 8;
export const MAX_LABEL_LENGTH = 24;

export interface KanbanColumnConfig {
  id: TaskStatus;
  title: string;
  dotClass: string;
}

export const KANBAN_COLUMNS: readonly KanbanColumnConfig[] = [
  { id: "TODO", title: "To do", dotClass: "bg-muted-foreground/50" },
  { id: "IN_PROGRESS", title: "In progress", dotClass: "bg-primary" },
  { id: "IN_REVIEW", title: "In review", dotClass: "bg-warning" },
  { id: "DONE", title: "Done", dotClass: "bg-success" },
];

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

export const PRIORITY_BADGE_CLASS: Record<TaskPriority, string> = {
  LOW: "bg-muted text-muted-foreground",
  MEDIUM: "bg-primary-subtle text-primary-subtle-foreground",
  HIGH: "bg-warning-subtle text-warning-foreground",
  URGENT: "bg-destructive/10 text-destructive",
};

const PRIORITY_RANK: Record<TaskPriority, number> = {
  URGENT: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

export type BoardColumns = Record<TaskStatus, Task[]>;

export interface KanbanActor {
  role: KanbanRole;
  //* Member profile id of the signed-in user; `null` for managers.
  memberId: string | null;
}

export const toKanbanRole = (role: userRole | undefined): KanbanRole | null =>
  role === "MANAGER" || role === "MEMBER" ? role : null;

export const isTaskStatus = (value: unknown): value is TaskStatus =>
  typeof value === "string" &&
  (TASK_STATUSES as readonly string[]).includes(value);

const compareTasks = (a: Task, b: Task): number =>
  PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] ||
  Date.parse(b.createdAt) - Date.parse(a.createdAt);

export const groupTasksByStatus = (tasks: readonly Task[]): BoardColumns => {
  const columns: BoardColumns = {
    TODO: [],
    IN_PROGRESS: [],
    IN_REVIEW: [],
    DONE: [],
  };
  for (const task of tasks) {
    if (task.isDeleted || !isTaskStatus(task.status)) continue;
    columns[task.status].push(task);
  }
  for (const status of TASK_STATUSES) columns[status].sort(compareTasks);
  return columns;
};

export const getMoveBlockedReason = (
  actor: KanbanActor,
  task: Task,
  to: TaskStatus,
): string | null => {
  if (actor.role === "MANAGER") return null;
  if (actor.memberId === null || task.assigneeId !== actor.memberId) {
    return "You can only move tasks assigned to you.";
  }
  if (task.status === "DONE") {
    return "Only a manager can reopen a completed task.";
  }
  if (to === "DONE") {
    return "Only a manager can mark a task as done.";
  }
  return null;
};

export const canDragTask = (actor: KanbanActor, task: Task): boolean =>
  actor.role === "MANAGER" ||
  (actor.memberId !== null &&
    task.assigneeId === actor.memberId &&
    task.status !== "DONE");

export const patchTaskInResponse = (
  response: ApiResponse<Task[]> | undefined,
  taskId: string,
  patch: Partial<Task>,
): ApiResponse<Task[]> | undefined => {
  if (!response?.data) return response;
  return {
    ...response,
    data: response.data.map((task) =>
      task.id === taskId ? { ...task, ...patch } : task,
    ),
  };
};

export const getProjectProgress = (
  tasks: readonly Pick<TaskBase, "status" | "isDeleted">[],
): number => {
  const live = tasks.filter((task) => !task.isDeleted);
  if (live.length === 0) return 0;
  const done = live.filter((task) => task.status === "DONE").length;
  return Math.round((done / live.length) * 100);
};

export const getDistinctAssignees = (
  tasks: readonly Task[],
): TaskAssignee[] => {
  const byId = new Map<string, TaskAssignee>();
  for (const task of tasks) {
    if (task.assignee && !byId.has(task.assignee.id)) {
      byId.set(task.assignee.id, task.assignee);
    }
  }
  return [...byId.values()];
};

export const parseLabels = (input: string): string[] => {
  const labels = new Set<string>();
  for (const raw of input.split(",")) {
    const label = raw.trim().toLowerCase();
    if (label) labels.add(label);
  }
  return [...labels];
};

export const getInitials = (name: string): string => {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials || "?";
};

const RELATIVE_UNITS: readonly [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
];

export const formatRelativeTime = (
  iso: string,
  now: number = Date.now(),
): string => {
  const timestamp = Date.parse(iso);
  if (Number.isNaN(timestamp)) return "";
  const diffSeconds = Math.round((timestamp - now) / 1000);
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const [unit, seconds] of RELATIVE_UNITS) {
    if (Math.abs(diffSeconds) >= seconds) {
      return formatter.format(Math.round(diffSeconds / seconds), unit);
    }
  }
  return "just now";
};
