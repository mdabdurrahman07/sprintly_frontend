# Sprintly

> A shared workspace for organizing projects, assigning tasks, and tracking team progress.

## Project description

Sprintly gives teams one place to organize projects, assign work, and follow task progress and collaboration. It replaces ad-hoc coordination with shared project views, task boards, comments, and role-specific dashboards.

The frontend follows the **SSDI (Static Shell, Dynamic Island)** concept: the page shell (layout, navigation, headers, and sidebars) is static or server-rendered for fast initial loading, while data-driven and interactive areas (kanban boards, task lists, comments, dashboards, and analytics) work as independent dynamic islands.

In this codebase, `next.config.ts` configures a static export. The App Router layouts provide the surrounding shell: the marketing layout in `src/app/(public)/(marketing)/layout.tsx` renders the public navigation and footer, and `src/components/Dashboard/DashboardShell.tsx` renders the dashboard sidebar and header. Role-specific route layouts wrap dashboard pages in client-side auth guards. Interactive modules such as `src/components/Modules/Kanban/` and the dashboard modules are client components that load data through TanStack Query hooks. Suspense boundaries are used on selected routes, including billing and account-verification pages; not every dynamic module is wrapped in Suspense.

## Tech stack

| Category | Technology |
| --- | --- |
| Framework and routing | Next.js 16 App Router |
| Language | TypeScript |
| UI | React 19, Tailwind CSS 4, shadcn/ui components |
| Data fetching and caching | TanStack React Query |
| HTTP client | ofetch |
| Forms and validation | TanStack React Form, Zod |
| Drag and drop | dnd-kit |
| Authentication UI | Google OAuth (`@react-oauth/google`) |
| Icons | Lucide React |
| Notifications | Sonner |

## Features by role

### MANAGER

- View a manager dashboard with project and task summaries.
- Create, update, and delete projects; add or remove project members.
- Create project tasks, set task details and priority, and assign tasks to members.
- View project tasks on a Kanban board and move them between task states.
- View task details and collaborate through task comments.
- View subscription status and payment history, and start a bKash payment from the billing flow.
- Edit the manager profile.
- Project and task creation are backend-gated by an active subscription whose dates include the current time. Managers cannot create a payment for a FREE plan or while they already have an active subscription. A successful bKash callback creates or renews a one-month subscription.

### MEMBER

- View a dashboard of assigned tasks and a calendar.
- View assigned tasks on the Kanban board and update permitted task states. The client only allows members to move their own assigned tasks; it prevents marking a task Done or reopening a completed task.
- View task details, add comments, and delete their own comments.
- Edit the member profile.

### ADMIN

- View platform analytics and a project overview.
- View and update user account status.
- View audit logs.

## Project structure

```text
.
├── public/                       # Static assets
├── src/
│   ├── api/                      # Backend API request functions
│   ├── app/                      # App Router routes, layouts, and global styles
│   │   ├── (dashboard)/          # Manager, member, and admin dashboards
│   │   ├── (public)/             # Authentication and marketing routes
│   │   ├── globals.css           # Global Tailwind styles and theme tokens
│   │   ├── layout.tsx            # Root layout and providers
│   │   ├── loading.tsx           # Shared loading UI
│   │   └── not-found.tsx         # Not-found route
│   ├── components/               # Shared and feature-specific UI
│   │   ├── Auth/                 # Authentication and role guards
│   │   ├── Dashboard/            # Dashboard shell and sidebar
│   │   ├── Form/                 # Authentication and comment forms
│   │   ├── Modules/              # Admin, manager, member, task, and billing UI
│   │   ├── public/               # Public navigation and footer
│   │   ├── sections/             # Public marketing page sections
│   │   ├── shared/               # Shared brand and section components
│   │   └── ui/                   # Reusable shadcn/ui components
│   ├── hooks/                    # TanStack Query data hooks
│   ├── lib/                      # API client, error handling, and utilities
│   ├── providers/                # Query and Google authentication providers
│   ├── routes/                   # Role-based dashboard navigation definitions
│   ├── types/                    # API and domain TypeScript types
│   └── validators/               # Zod form schemas
├── components.json               # shadcn/ui configuration
├── next.config.ts                # Next.js configuration, including static export
├── package-lock.json             # npm dependency lockfile
└── package.json                  # Dependencies and scripts
```

### `src/api/` resources

- `admin.api.ts` — admin users and user status, analytics, project lists, and audit logs.
- `auth.api.ts` — login, registration, email verification, current user, token refresh, Google login, and logout.
- `comment.api.ts` — comment deletion.
- `index.ts` — re-exports the authentication API functions.
- `payment.api.ts` — payment creation and the current user's payment history.
- `plan.api.ts` — plan listing and plan create, update, and delete functions.
- `profile.api.ts` — manager and member profile updates.
- `project.api.ts` — project CRUD, project members, and project task listing/creation.
- `task.api.ts` — assigned tasks, task details and updates, task assignment, and task comments.

## Getting started

### Prerequisites

- Node.js. This repository does not pin a Node.js version in `package.json` or `.nvmrc`.
- npm. The repository includes `package-lock.json`.

### Install and configure

```bash
git clone https://github.com/mdabdurrahman07/sprintly_frontend.git
cd sprintly_frontend
npm ci
```

Create `.env.local` in the project root and set the values required for your environment. These names are referenced in the frontend:

```dotenv
NEXT_PUBLIC_API_BASE_URL=https://your-backend.example.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id

NEXT_PUBLIC_DEMO_ADMIN_EMAIL=demo-admin@example.com
NEXT_PUBLIC_DEMO_ADMIN_PASSWORD=replace-with-demo-password
NEXT_PUBLIC_DEMO_MANAGER_EMAIL=demo-manager@example.com
NEXT_PUBLIC_DEMO_MANAGER_PASSWORD=replace-with-demo-password
NEXT_PUBLIC_DEMO_MEMBER_EMAIL=demo-member@example.com
NEXT_PUBLIC_DEMO_MEMBER_PASSWORD=replace-with-demo-password
```

`NEXT_PUBLIC_API_BASE_URL` is used as the API client's base URL. Google OAuth and demo-account values are optional in the code. `NEXT_PUBLIC_` values are exposed to the browser; use only non-sensitive demo-account credentials here, never production secrets.

### Run locally

```bash
npm run dev
```

### Build and serve

```bash
npm run build
npm run server
```

The build uses Next.js static export and writes the site to `out/`. The `server` script serves that exported directory on port 3000. `package.json` also defines `npm run start` as `next start`; the configured static export is served with `npm run server`.

## API integration

The shared HTTP wrapper in `src/lib/apiClient.ts` uses `ofetch`, takes its base URL from `NEXT_PUBLIC_API_BASE_URL`, and sets `credentials: "include"` so browser requests send the authentication cookies. The backend delivers access and refresh tokens in HTTP-only cookies and also accepts the access token as a Bearer token. This frontend wrapper does not set an `Authorization` header or implement a Bearer-token fallback.

Token refresh is exposed by `refreshTokenApi` and `useRefreshToken` as an explicit `POST /auth/refresh-token` mutation. There is no automatic refresh interceptor in the shared API client. The frontend uses the cookie-based flow.

The role column below describes the frontend workflow or route using an operation, not a replacement for backend authorization. The backend remains responsible for enforcing access rules.

### `admin.api.ts`

| Function | Method | Endpoint | Purpose | Allowed role(s) |
| --- | --- | --- | --- | --- |
| `getAllUsersApi` | GET | `/admin/users` | List/filter users for the admin user screen. | ADMIN |
| `updateUserStatusApi` | PATCH | `/admin/users/:id/status` | Update a user's status. | ADMIN |
| `getAdminTotalAnalytics` | GET | `/admin/analytics` | Load admin dashboard analytics. | ADMIN |
| `getAllProjects` | GET | `/admin/projects` | Load the admin dashboard project list. | ADMIN |
| `getAuditLogs` | GET | `/admin/audit` | Load audit logs. | ADMIN |

### `auth.api.ts`

| Function | Method | Endpoint | Purpose | Allowed role(s) |
| --- | --- | --- | --- | --- |
| `loginApi` | POST | `/auth/login` | Sign in with credentials. | Public |
| `memberRegisterApi` | POST | `/auth/register/member` | Register a member. | Public |
| `managerRegisterApi` | POST | `/auth/register/manager` | Register a manager. | Public |
| `memberVerifyApi` | POST | `/auth/verifyEmail` | Verify a member account. | Public |
| `managerVerifyApi` | POST | `/auth/verifyEmail/manager` | Verify a manager account. | Public |
| `getMeApi` | GET | `/auth/me` | Load the current session user. | Authenticated users |
| `refreshTokenApi` | POST | `/auth/refresh-token` | Request token refresh using the cookie flow. | Authenticated users |
| `googleLoginApi` | POST | `/auth/google` | Sign in with Google credentials. | Public |
| `userLogout` | POST | `/auth/logout` | Sign out. | Authenticated users |

### `comment.api.ts`

| Function | Method | Endpoint | Purpose | Allowed role(s) |
| --- | --- | --- | --- | --- |
| `deleteCommentApi` | DELETE | `/comments/:id` | Delete a task comment; the task UI allows managers and comment authors. | MANAGER; MEMBER (own comments only in the UI) |

### `index.ts`

| Function | Method | Endpoint | Purpose | Allowed role(s) |
| --- | --- | --- | --- | --- |
| — | — | — | Re-exports functions from `auth.api.ts`; defines no endpoint. | — |

### `payment.api.ts`

| Function | Method | Endpoint | Purpose | Allowed role(s) |
| --- | --- | --- | --- | --- |
| `paymentCreateApi` | POST | `/payment/createPayment` | Start a plan payment; the client redirects to the returned bKash URL. | MANAGER |
| `paymentGetApi` | GET | `/payment/getMyPayment` | Load the manager's payments and subscription status/history. | MANAGER |

### `plan.api.ts`

| Function | Method | Endpoint | Purpose | Allowed role(s) |
| --- | --- | --- | --- | --- |
| `planCreateApi` | POST | `/plan/createPlan` | Create a subscription plan. | ADMIN (API helper; no plan-management page is present) |
| `planGetApi` | GET | `/plan/` | List plans for pricing and checkout views. | Public and MANAGER |
| `planUpdateApi` | PATCH | `/plan/updatePlan/:id` | Update a subscription plan. | ADMIN (API helper; no plan-management page is present) |
| `planDeleteApi` | DELETE | `/plan/delete/:id` | Delete a subscription plan. | ADMIN (API helper; no plan-management page is present) |

### `profile.api.ts`

| Function | Method | Endpoint | Purpose | Allowed role(s) |
| --- | --- | --- | --- | --- |
| `updateMemberProfile` | PATCH | `/profile/update/member` | Update the member profile. | MEMBER |
| `updateManagerProfile` | PATCH | `/profile/update/manager` | Update the manager profile. | MANAGER |

### `project.api.ts`

| Function | Method | Endpoint | Purpose | Allowed role(s) |
| --- | --- | --- | --- | --- |
| `projectCreateApi` | POST | `/project/create` | Create a project. | MANAGER |
| `projectGetApi` | GET | `/project/get` | List projects for the manager project and kanban views. | MANAGER; MEMBER |
| `projectGetByIdApi` | GET | `/project/get/:id` | Load a project by ID; no role-specific caller is established in the frontend. | Not established in frontend |
| `projectUpdateApi` | PATCH | `/project/update/:id` | Update a project. | MANAGER |
| `projectDeleteApi` | DELETE | `/project/del/:id/project` | Delete a project. | MANAGER |
| `projectRemoveMemberApi` | DELETE | `/project/del/:projectId` | Remove a member from a project (the member ID is sent in the request body). | MANAGER |
| `projectTasksCreateApi` | POST | `/project/:projectId/tasks` | Create a task in a project. | MANAGER |
| `projectTasksGetApi` | GET | `/project/:projectId/tasks` | List a project's tasks for the manager's Kanban view. | MANAGER |

### `task.api.ts`

| Function | Method | Endpoint | Purpose | Allowed role(s) |
| --- | --- | --- | --- | --- |
| `getMyAssignedTaskApi` | GET | `/task/myAssigned` | List the current member's assigned tasks. | MEMBER |
| `getTaskDetailsApi` | GET | `/task/:id` | Load task details. | MANAGER; MEMBER |
| `updateTaskApi` | PATCH | `/task/:id` | Update task properties/status. | MANAGER; MEMBER (status changes are restricted in the UI) |
| `assignedTaskToMemberApi` | PUT | `/task/:id` | Assign a task to a member. | MANAGER |
| `createTaskCommentApi` | POST | `/task/:taskId/comment` | Add a comment to a task. | MANAGER; MEMBER |
| `getTaskCommentsApi` | GET | `/task/:taskId/comments` | List task comments. | MANAGER; MEMBER |

`ofetch` errors are surfaced through the shared `getErrorMessage` helper and user-facing error states/toasts in the relevant UI. The frontend does not contain dedicated handling for blocked-account responses or subscription-required responses; those rules are enforced by the backend.

## Related Repository

Backend: [Sprintly Backend](https://github.com/mdabdurrahman07/sprintly_backend)

<!-- YOUR_BACKEND_REPO_URL -->

## Designed and Developed by

Designed and Developed by [mdabdurrahman](https://github.com/mdabdurrahman07)