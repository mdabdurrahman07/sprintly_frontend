export type userRole = "MEMBER" | "MANAGER" | "ADMIN";
export type userStatus = "ACTIVE" | "BLOCKED" | "DELETED"
export interface MemberProfile {
  id: string;
  name: string;
  email: string;
  jobTitle: string | null;
  skills: string[];
  bio: string | null;
  memberAvatarUrl: string | null;
  memberProfileImagePublicId: string | null;
  phoneNumber: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface ManagerProfile {
  id: string;
  name: string;
  email: string;
  department: string | null;
  bio: string | null;
  managerAvatarUrl: string | null;
  managerProfileImagePublicId: string | null;
  phoneNumber: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  googleId: string | null;
  authProvider: string;
  emailVerified: boolean;
  status: string;
  needPasswordChange: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  role: userRole;
  createdAt: string;
  updatedAt: string;
  memberProfile: MemberProfile | null;
  managerProfile: ManagerProfile | null;
}
