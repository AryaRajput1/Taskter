import mongoose, { Schema } from "mongoose";
import { ACTIVITY_ACTION, ACTIVITY_RESOURCE_TYPE } from "../utils/constant.js";

const activityLogSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        action: {
            type: String,
            required: true,
            enum: Object.values(ACTIVITY_ACTION),
        },
        resourceType: {
            type: String,
            required: true,
            enum: Object.values(ACTIVITY_RESOURCE_TYPE),
        },
        resourceId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        details: {
            type: Object,
        },
    },
    { timestamps: true }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;