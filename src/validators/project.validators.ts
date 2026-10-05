import z from "zod";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const MAX_ADDITIONAL_FILES = 3;

export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

export function isAcceptedFileSize(fileSize: number) {
  return fileSize <= MAX_FILE_SIZE;
}

export function isAcceptedFileType(fileType: string) {
  return ACCEPTED_FILE_TYPES.includes(fileType);
}

export const ProjectPayloadSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  description: z.string().optional(),

  additionalFiles: z
    .array(z.custom<File>((value) => value instanceof File))
    .max(
      MAX_ADDITIONAL_FILES,
      `You can attach at most ${MAX_ADDITIONAL_FILES} files`,
    )
    .refine(
      (files) =>
        files.every(
          (file) =>
            isAcceptedFileSize(file.size) &&
            isAcceptedFileType(file.type),
        ),
      {
        message:
          "Each file must be a PDF, DOC, DOCX, PNG or JPEG under 5 MB",
      },
    )
    .optional(),
});

export type ProjectPayload = z.infer<typeof ProjectPayloadSchema>;
