export const projectKeys = {
  all: ["projects"] as const,
  tasks: (projectId: string) => ["projects", projectId, "tasks"] as const,
  detail: (projectId: string) => ["projects", projectId] as const,
};

export const taskKeys = {
  all: ["tasks"] as const,
  assigned: () => ["tasks", "assigned"] as const,
  detail: (taskId: string) => ["tasks", "detail", taskId] as const,
  comments: (taskId: string) => ["comments", "task", taskId] as const,
};

export const taskMutationKeys = {
  update: ["tasks", "update"] as const,
};
