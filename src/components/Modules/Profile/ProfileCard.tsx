"use client";
import { SessionUser } from "@/types/user.types";
import { useState } from "react";
import { Camera, Pencil, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditProfileDialog } from "./EditProfileDialog";

interface UserProfileCardProps {
  user: SessionUser;
  className?: string;
}

const ProfileCard = ({ user, className = "" }: UserProfileCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const isManager = user.role === "MANAGER";
  const managerProfile = user.managerProfile;
  const memberProfile = user.memberProfile;

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const avatarUrl = isManager
    ? managerProfile?.managerAvatarUrl
    : memberProfile?.memberAvatarUrl;

  const bio = isManager ? managerProfile?.bio : memberProfile?.bio;
  const phoneNumber = isManager
    ? managerProfile?.phoneNumber
    : memberProfile?.phoneNumber;
  const subtitle = isManager
    ? managerProfile?.department || "Manager"
    : memberProfile?.jobTitle || "";

  const skills = !isManager ? memberProfile?.skills || [] : [];
  return (
    <>
      <div
        className={`relative w-full max-w-7xl rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-xs dark:border-border dark:bg-card ${className}`}
      >
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-blue-100 font-headline text-lg font-bold text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user.name}
                  className="size-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsEditDialogOpen(true)}
              className="absolute -bottom-0.5 -right-0.5 flex size-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs transition-transform hover:scale-105 dark:bg-primary"
              title="Change avatar"
            >
              <Camera className="size-3.5" />
            </button>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="truncate font-headline text-lg font-bold tracking-tight text-zinc-900 dark:text-foreground">
                {user.name}
              </h2>
              <span
                className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                  isManager
                    ? "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400"
                    : "bg-zinc-100 text-zinc-700 ring-zinc-500/20 dark:bg-muted dark:text-muted-foreground"
                }`}
              >
                {isManager ? "Manager" : "Member"}
              </span>
            </div>

            {subtitle && (
              <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-muted-foreground">
                {subtitle}
              </p>
            )}

            <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <div className="my-5 border-t border-zinc-100 dark:border-border/50" />

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-zinc-400 dark:text-muted-foreground">
                ABOUT
              </span>
              <button
                type="button"
                onClick={() => setIsEditDialogOpen(true)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-foreground transition-colors"
              >
                <Pencil className="size-3.5" />
              </button>
            </div>
            <div className="mt-1.5 rounded-2xl border border-dashed border-zinc-200/80 bg-zinc-50/50 p-3 text-xs italic text-zinc-600 dark:border-border/60 dark:bg-muted/20 dark:text-muted-foreground">
              {bio ? (
                `"${bio}"`
              ) : (
                <span className="not-italic text-zinc-400">No bio yet</span>
              )}
            </div>
          </div>

          <div>
            {isManager ? null : (
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold tracking-wider text-zinc-400 dark:text-muted-foreground">
                  PHONE
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditDialogOpen(true)}
                  className="text-zinc-400 hover:text-zinc-700 dark:hover:text-foreground transition-colors"
                >
                  <Pencil className="size-3.5" />
                </button>
              </div>
            )}
            <div className="flex items-center justify-between rounded-2xl border border-dashed border-zinc-200/80 bg-zinc-50/50 p-3 text-xs dark:border-border/60 dark:bg-muted/20">
              <div className="flex items-center gap-2 text-zinc-600 dark:text-foreground">
                <Phone className="size-3.5 text-zinc-400" />
                <span
                  className={
                    phoneNumber
                      ? "font-semibold text-zinc-800 dark:text-foreground"
                      : "text-zinc-400"
                  }
                >
                  {phoneNumber || "Add phone number"}
                </span>
              </div>
              {isManager && (
                <button
                  type="button"
                  onClick={() => setIsEditDialogOpen(true)}
                  className="text-zinc-400 hover:text-zinc-700 dark:hover:text-foreground transition-colors"
                >
                  <Pencil className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          {!isManager && (
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider text-zinc-400 dark:text-muted-foreground">
                  SKILLS
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditDialogOpen(true)}
                  className="text-zinc-400 hover:text-zinc-700 dark:hover:text-foreground transition-colors"
                >
                  <Pencil className="size-3.5" />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-zinc-100 px-3.5 py-1 text-xs font-semibold text-zinc-800 shadow-2xs dark:bg-muted dark:text-foreground"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-zinc-400 italic">
                    No skills added yet
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditDialogOpen(true)}
            className="w-full rounded-full border-zinc-200 py-2.5 font-semibold text-zinc-800 shadow-2xs transition-colors hover:bg-zinc-50 dark:border-border dark:text-foreground dark:hover:bg-accent"
          >
            <Pencil className="mr-2 size-3.5" />
            Edit profile
          </Button>
        </div>
      </div>
      <EditProfileDialog
        user={user}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </>
  );
};

export default ProfileCard;
