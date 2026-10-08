import type {
  ManagerProfile,
  MemberProfile,
  userRole,
  userStatus,
} from "@/types/user.types";
import { ProjectFile } from "./project.types";
import { TaskBase } from "./task.types";


export type AuthProvider = "CREDENTIAL" | "GOOGLE";
export type SortOrder = "asc" | "desc";


export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface AdminUsersParams extends PaginationParams {
  searchTerm?: string;
  role?: userRole;
}

export interface AdminProjectsParams extends PaginationParams {
  searchTerm?: string;
  status?: string;
}

export interface AdminAuditLogsParams extends PaginationParams {
  searchTerm?: string;
  entityType?: string;
}


export interface UpdateUserStatusPayload {
  status: userStatus;
}



export interface AdminUserBase {
  id: string;
  name: string;
  email: string;
  googleId: string | null;
  authProvider: AuthProvider;
  emailVerified: boolean;
  status: userStatus;
  needPasswordChange: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  role: userRole;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser extends AdminUserBase {
  memberProfile: MemberProfile | null;
  managerProfile: ManagerProfile | null;
}

export interface AdminAnalytics {
  totalAmount: number;
  totalMembers: number;
  totalManagers: number;
  usersCount: number;
}

export interface AdminProjectMember {
  id: string;
  addedAt: string;
  projectId: string;
  memberId: string;
}

export interface AdminProject {
  id: string;
  name: string;
  description: string | null;
  status: string;
  managerId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
  additionalFiles: ProjectFile[];
  manager: ManagerProfile;
  members: AdminProjectMember[];
  tasks: TaskBase[];
}

export interface AuditLog {
  id: string;
  actorUserId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  actor: AdminUserBase;
}
