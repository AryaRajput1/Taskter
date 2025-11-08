import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: 'New workspace'
    },
    workspace: {
        type: Schema.Types.ObjectId,
        ref: 'Workspace'
    },
    status: {
        type: String,
        enum: ["Planning", "Completed", "On Hold", "In Progress", "Cancelled"],
        default: "Planning"
    },
    startDate: Date,
    dueDate: Date,
    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    tasks: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }],
        default: []
    },
    members: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['owner', 'member', 'admin', 'viewer'],
            default: 'member'
        },
    }],
    tags: [String],
    isArchieved: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
})

export const Project = mongoose.model('Project', projectSchema)
