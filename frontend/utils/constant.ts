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