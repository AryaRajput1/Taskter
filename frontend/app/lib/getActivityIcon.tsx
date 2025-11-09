import type { ActivityAction } from "@/types";
import {
    Building2,
    CheckCircle,
    CheckCircle2,
    CheckSquare,
    Eye,
    EyeOff,
    FileEdit,
    FolderEdit,
    FolderPlus,
    LogIn,
    MessageSquare,
    Upload,
    UserMinus,
    UserPlus,
} from "lucide-react";
import { ACTIVITY_ACTION } from "utils/constant";

export const getActivityIcon = (action: ActivityAction) => {
    switch (action) {
        case ACTIVITY_ACTION.CREATED_TASK:
            return (
                <div className="bg-green-600/10 p-2 rounded-md">
                    <CheckSquare className="h-5 w-5 text-green-600 rounded-full" />
                </div>
            );
        case ACTIVITY_ACTION.CREATED_SUBTASK:
            return (
                <div className="bg-emerald-600/10 p-2 rounded-md">
                    <CheckSquare className="h-5 w-5 text-emerald-600 rounded-full" />
                </div>
            );
        case ACTIVITY_ACTION.UPDATED_TASK:
        case ACTIVITY_ACTION.UPDATED_SUBTASK:
            return (
                <div className="bg-blue-600/10 p-2 rounded-md">
                    <FileEdit className="h-5 w-5 text-blue-600 rounded-full" />
                </div>
            );
        case ACTIVITY_ACTION.COMPLETED_TASK:
            return (
                <div className="bg-green-600/10 p-2 rounded-md">
                    <CheckCircle className="h-5 w-5 text-green-600 rounded-full" />
                </div>
            );
        case ACTIVITY_ACTION.CREATED_PROJECT:
            return (
                <div className="bg-blue-600/10 p-2 rounded-md">
                    <FolderPlus className="h-5 w-5 text-blue-600 rounded-full" />
                </div>
            );
        case ACTIVITY_ACTION.UPDATED_PROJECT:
            return (
                <div className="bg-blue-600/10 p-2 rounded-md">
                    <FolderEdit className="h-5 w-5 text-blue-600 rounded-full" />
                </div>
            );
        case ACTIVITY_ACTION.COMPLETED_PROJECT:
            return (
                <div className="bg-green-600/10 p-2 rounded-md">
                    <CheckCircle2 className="h-5 w-5 text-green-600 rounded-full" />
                </div>
            );
        case ACTIVITY_ACTION.CREATED_WORKSPACE:
            return (
                <div className="bg-blue-600/10 p-2 rounded-md">
                    <Building2 className="h-5 w-5 text-blue-600 rounded-full" />
                </div>
            );
        case ACTIVITY_ACTION.ADDED_COMMENT:
            return (
                <div className="bg-blue-600/10 p-2 rounded-md">
                    <MessageSquare className="h-5 w-5 text-blue-600 rounded-full" />
                </div>
            );
        case ACTIVITY_ACTION.ADDED_MEMBER:
            return (
                <div className="bg-blue-600/10 p-2 rounded-md">
                    <UserPlus className="h-5 w-5 text-blue-600 rounded-full" />
                </div>
            );
        case ACTIVITY_ACTION.REMOVED_MEMBER:
            return (
                <div className="bg-red-600/10 p-2 rounded-md">
                    <UserMinus className="h-5 w-5 text-red-600 rounded-full" />
                </div>
            );
        case ACTIVITY_ACTION.JOINED_WORKSPACE:
            return (
                <div className="bg-blue-600/10 p-2 rounded-md">
                    <LogIn className="h-5 w-5 text-blue-600 rounded-full" />
                </div>
            );
        case ACTIVITY_ACTION.ADDED_ATTACHMENT:
            return (
                <div className="bg-blue-600/10 p-2 rounded-md">
                    <Upload className="h-5 w-5 text-blue-600 rounded-full" />
                </div>
            );
        default:
            return null;
    }
};