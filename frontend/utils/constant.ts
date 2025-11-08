export const ROLES = {
    ADMIN: 'admin',
    MEMBER: 'member',
    OWNER: 'owner',
    VIEWER: 'viewer'
} as const

export const PROJECT_STATUS = {
    PLANNING: "Planning",
    COMPLETED: "Completed",
    ON_HOLD: "On Hold",
    IN_PROGRESS: "In Progress",
    CANCELLED: "Cancelled",
} as const

export const TASK_STATUS = {
    TO_DO: "To Do",
    IN_PROGRESS: "In Progress",
    DONE: "Done",
} as const

export const TASK_PRIORITY = {
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low",
} as const