import { TaskBase, TaskPriority } from "./task.types";

export type ProjectCreatePayload =
  | FormData
  | {
      name: string;
      description?: string;
      files?: Array<File | string>;
    };

export interface ProjectUpdatePayload {
  name?: string;
  description?: string;
}

export interface TaskCreatePayload {
  title: string;
  description?: string;
}

export interface ProjectParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortOrder?: "desc" | "asc";
}

export interface TaskCreatePayload {
  title: string;
  description?: string;
  priority?: TaskPriority;
  labels?: string[];
}

export interface ProjectFile {
  url: string;
  publicId: string;
}

export interface ProjectManagerSummary {
  id: string;
  name: string;
  email: string;
  managerAvatarUrl: string | null;
}

export interface ProjectSummary {
  id: string;
  name: string;
  description: string | null;
  status: string;
  managerId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
  additionalFiles: ProjectFile[];
  manager: ProjectManagerSummary;
  members: unknown[];
  tasks: TaskBase[];
}
