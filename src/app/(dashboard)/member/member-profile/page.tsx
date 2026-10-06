import { AuthLoading } from "@/components/Auth/RoleGuard";
import ProfileCard from "@/components/Modules/Profile/ProfileCard";
import { useGetMe } from "@/hooks";
import React from "react";

const memberProfilePage = () => {
  const { data, isPending, isError } = useGetMe();
  const user = data?.data;
  if (isPending) return <AuthLoading label="Loading profile..." />;
  if (isError || !user) return <p>Could not load your profile.</p>;
  return (
    <div>
      <h1 className="font-headline text-2xl font-bold tracking-tight text-zinc-900 dark:text-foreground">
        Profile
      </h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-muted-foreground mb-5">
        Manage your profile here
      </p>
      <ProfileCard user={user} />
    </div>
  );
};

export default memberProfilePage;
