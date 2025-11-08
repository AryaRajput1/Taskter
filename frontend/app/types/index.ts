import type { PROJECT_STATUS, ROLES } from "utils/constant"

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
    name: string,
    description: string
    owner: User | null
    color: string
    members: Member[],
    createdAt: Date
    updatedAt: Date

}

export type ProjectStatus = typeof PROJECT_STATUS[keyof typeof PROJECT_STATUS]

export interface Project {
    _id: string,
    title: string,
    description: string,
    workspace: Workspace
    status: ProjectStatus,
    startDate: Date,
    dueDate: Date,
    progress: number
    tasks: unknown[]
    members: Member[],
    tags: String[],
    isArchieved: boolean,
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