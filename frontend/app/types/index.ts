import type { ACTIVITY_ACTION, ACTIVITY_RESOURCE_TYPE, PROJECT_STATUS, ROLES, TASK_PRIORITY, TASK_STATUS } from "utils/constant"

export interface User {
    _id: string
    email: string
    fullName: string
    createAt: Date
    updatedAt: Date
    isEmailVerified: boolean
    profilePicture?: string
}

export type UserRoles = typeof ROLES[keyof typeof ROLES]

export interface Member {
    _id: string
    user: User
    role: UserRoles
    joinedAt: Date
}

export interface Workspace {
    _id: string
    name: string
    description: string
    owner: User | null
    color: string
    members: Member[]
    createdAt: Date
    updatedAt: Date

}

export type ProjectStatus = typeof PROJECT_STATUS[keyof typeof PROJECT_STATUS]

export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS]
export type TaskPriority = typeof TASK_PRIORITY[keyof typeof TASK_PRIORITY]

export interface Project {
    _id: string
    title: string
    description: string
    workspace: Workspace
    status: ProjectStatus
    startDate: Date
    dueDate: Date
    progress: number
    tasks: Task[]
    members: Member[]
    tags: String[]
    isArchived: boolean
    createdBy: string
}

export interface Attachment {
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    uploadedBy: string;
    uploadedAt: Date;
    _id: string;
}

export interface Task {
    _id: string
    title: string
    description: string
    project: Project
    status: TaskStatus
    priority: TaskPriority
    startDate: Date
    dueDate: Date
    compltedAt: Date
    estimatedHours: number
    actualHours: number
    progress: number
    subTasks: Task[]
    assignees: User[] | string[]
    watchers: User[]
    isArchived: boolean
    attachments: Attachment[]
    createdBy: string
    createdAt: string
    updatedAt: string
    isWatching?: boolean
    // comments: Comment[]
}

export interface Activity {
    _id: string
    user: User
    action: ActivityAction
    resourceId: string
    resourceType: ActivityResourceType
    details: {
        description: string
    }
    createdAt: string
}

export type ActivityAction = typeof ACTIVITY_ACTION[keyof typeof ACTIVITY_ACTION]

export type ActivityResourceType = typeof ACTIVITY_RESOURCE_TYPE[keyof typeof ACTIVITY_RESOURCE_TYPE]

export interface Comment {
    _id: string
    text: string
    author: User
    createdAt: string
}

export interface TaskTrendsData {
    name: string;
    completed: number;
    inProgress: number;
    todo: number;
}

export interface TaskPriorityData {
    name: string;
    value: number;
    color: string;
}

export interface ProjectStatusData {
    name: string;
    value: number;
    color: string;
}

export interface WorkspaceProductivityData {
    name: string;
    completed: number;
    total: number;
}

export interface StatsData {
    totalProjects: number;
    totalTasks: number;
    totalProjectInProgress: number;
    totalTaskCompleted: number;
    totalTaskToDo: number;
    totalTaskInProgress: number;
}