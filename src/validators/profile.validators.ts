import z from "zod";

export const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

export const ACCEPTED_AVATAR_TYPES = ["image/png", "image/jpeg", "image/webp"];

export function isAcceptedAvatarSize(fileSize: number) {
  return fileSize <= MAX_AVATAR_SIZE;
}

export function isAcceptedAvatarType(fileType: string) {
  return ACCEPTED_AVATAR_TYPES.includes(fileType);
}

const avatarFileSchema = z
  .custom<File>((value) => value instanceof File, {
    message: "Avatar must be a valid image file",
  })
  .refine((file) => isAcceptedAvatarSize(file.size), {
    message: "Avatar image must be under 2 MB",
  })
  .refine((file) => isAcceptedAvatarType(file.type), {
    message: "Avatar must be a PNG, JPEG or WebP image",
  });

export const MemberProfileUpdateSchema = z.object({
  bio: z.string().optional(),

  skills: z.array(z.string()).optional(),

  phoneNumber: z.string().optional(),

  memberAvatarUrl: avatarFileSchema.optional(),
});

export const ManagerProfileUpdateSchema = z.object({
  bio: z.string().optional(),

  phoneNumber: z.string().optional(),

  managerAvatarUrl: avatarFileSchema.optional(),
});

export type MemberProfileUpdatePayload = z.infer<
  typeof MemberProfileUpdateSchema
>;

export type ManagerProfileUpdatePayload = z.infer<
  typeof ManagerProfileUpdateSchema
>;
