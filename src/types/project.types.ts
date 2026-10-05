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