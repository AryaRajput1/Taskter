import mongoose, { Schema } from "mongoose";

const workspaceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: 'New workspace'
    },
    color: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
        joinedAt: {
            type: Date,
            default: Date.now()
        },
        projects: {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    }],
    projects: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }],
        default: []
    }
}, {
    timestamps: true
})

export const Workspace = mongoose.model('Workspace', workspaceSchema)
