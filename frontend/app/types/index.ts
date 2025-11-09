import type { PROJECT_STATUS, ROLES, TASK_PRIORITY, TASK_STATUS } from "utils/constant"

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
    // comments: Comment[]
}