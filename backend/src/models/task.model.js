import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: 'New workspace'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Done", "In Review"],
        default: "Planning"
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },
    startDate: Date,
    dueDate: Date,
    completedAt: Date,
    estimatedHours: {
        type: Number,
        default: 0
    },
    actualHours: {
        type: Number,
        default: 0
    },
    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    tasks: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    assigniees: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    watchers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    tags: [String],
    subtasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    attachments: [
        {
            fileName: { type: String, required: true },
            fileUrl: { type: String, required: true },
            fileType: { type: String },
            fileSize: { type: Number },
            uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
            uploadedAt: {
                type: Date, default: Date.now
            }
        }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isArchived: { type: Boolean, default: false },
}, {
    timestamps: true
})

export const Task = mongoose.model('Task', taskSchema)
