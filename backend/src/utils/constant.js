export const ROLES = {
    ADMIN: 'admin',
    MEMBER: 'member',
    OWNER: 'owner',
    VIEWER: 'viewer'
}

export const PROJECT_STATUS = {
    PLANNING: "Planning",
    COMPLETED: "Completed",
    ON_HOLD: "On Hold",
    IN_PROGRESS: "In Progress",
    CANCELLED: "Cancelled",
}

export const TASK_STATUS = {
    TO_DO: "To Do",
    IN_PROGRESS: "In Progress",
    DONE: "Done",
}

export const TASK_PRIORITY = {
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low",
}

export const ACTIVITY_ACTION = {
    CREATED_TASK: "created_task",
    UPDATED_TASK: "updated_task",
    CREATED_SUBTASK: "created_subtask",
    UPDATED_SUBTASK: "updated_subtask",
    COMPLETED_TASK: "completed_task",
    CREATED_PROJECT: "created_project",
    UPDATED_PROJECT: "updated_project",
    COMPLETED_PROJECT: "completed_project",
    CREATED_WORKSPACE: "created_workspace",
    UPDATED_WORKSPACE: "updated_workspace",
    ADDED_COMMENT: "added_comment",
    REMOVED_COMMENT: "removed_comment",
    ADDED_MEMBER: "added_member",
    REMOVED_MEMBER: "removed_member",
    JOINED_WORKSPACE: "joined_workspace",
    LEFT_WORKSPACE: 'left_workspace',
    TRANSFERRED_WORKSPACE_OWNERSHIP: "transferred_workspace_ownership",
    ADDED_ATTACHMENT: "added_attachment",
    REMOVE_ATTACHMENT: "remve_attachment",
}

export const ACTIVITY_RESOURCE_TYPE = {
    TASK: "Task", PROJECT: "Project", WORKSPACE: "Workspace", COMMENT: "Comment", USER: "User"
}