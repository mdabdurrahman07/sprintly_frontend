export interface ProjectCreatePayload {
  name: string;
  description?: string;
  files?: string[];
}

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
