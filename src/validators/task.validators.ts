import { MAX_LABEL_LENGTH, MAX_LABELS, parseLabels } from "@/lib/kanban";
import { TASK_PRIORITIES } from "@/types/task.types";
import z from "zod";

const createTaskSchema = z.object({
  projectId: z.string().min(1, "Choose a project"),
  title: z
    .string()
    .trim()
    .min(3, "Title needs at least 3 characters")
    .max(120, "Title can be up to 120 characters"),
  description: z
    .string()
    .trim()
    .max(2000, "Description can be up to 2,000 characters"),
  priority: z.enum(TASK_PRIORITIES),
  labels: z.string().refine((value) => {
    const labels = parseLabels(value);
    return (
      labels.length <= MAX_LABELS &&
      labels.every((label) => label.length <= MAX_LABEL_LENGTH)
    );
  }, `Use up to ${MAX_LABELS} labels, ${MAX_LABEL_LENGTH} characters each`),
});

export type CreateTaskFormValues = z.infer<typeof createTaskSchema>;
