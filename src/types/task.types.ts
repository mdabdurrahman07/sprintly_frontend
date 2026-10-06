import { ManagerProfile, MemberProfile, userRole } from "./user.types";

export const TASK_STATUSES = [
  "TODO",
  "IN_PROGRESS",
  "IN_REVIEW",
  "DONE",
] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];
export const TASK_PRIORITIES = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];
export type KanbanRole = Extract<userRole, "MANAGER" | "MEMBER">;
export type TaskAssignee = MemberProfile;
 
export interface TaskProject {
  id: string;
  name: string;
  manager: ManagerProfile;
}
 
export type CommentAuthor = Pick<MemberProfile, "id" | "name" | "memberAvatarUrl">;
 
export interface TaskComment {
  id: string;
  content: string;
  taskId: string;
  memberId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
  /** Only present when the backend includes the author (see PATCHES.md). */
  member?: CommentAuthor;
}

export interface TaskCommentPreview {
  id: string;
  content: string;
  member?: CommentAuthor;
}

export interface TaskBase {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  labels: string[];
  projectId: string;
  assigneeId: string | null;
  assignmentNotifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
}
export interface Task extends TaskBase {
  project?: TaskProject;
  comments?: TaskCommentPreview[];
  assignee?: TaskAssignee | null;
}

export interface UpdateTaskPayload {
  status: TaskStatus;
}

export type AssignTaskPayload = Record<string, unknown>;
 
export interface CreateCommentPayload {
  content: string;
}
 
export interface TaskListParams {
  page?: number;
  limit?: number;
  sortOrder?: "asc" | "desc";
}