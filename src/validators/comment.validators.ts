import z from "zod";

export const commentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Write a comment first")
    .max(1000, "Comments can be up to 1,000 characters"),
});
 
export type CommentFormValues = z.infer<typeof commentSchema>;