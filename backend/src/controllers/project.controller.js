import { Project } from "../models/project.model.js";
import { Task } from "../models/task.model.js";
import { Workspace } from "../models/workspace.model.js";

export const createProject = async (req, res) => {
    try {
        const { workspaceId } = req.params
        const { title, description, status, members, startDate, dueDate, tags } = req.body

        const workspace = await Workspace.findById(workspaceId)

        if (!workspace) {
            return res.status(404).json({
                message: 'No workspace found.'
            })
        }

        const user = req.user

        const isMember = workspace.members.some(wm => wm.user.toHexString() === user._id.toHexString())

        if (!isMember) {
            return res.status(403).json({
                message: 'You are not a part of this workspace'
            })
        }

        const project = await Project.create({
            title,
            description,
            status,
            members,
            startDate,
            dueDate,
            workspace: workspaceId,
            tags: tags.split(",") || [],
            progress: 0,
            tasks: [],
            isArchieved: false,
            createdBy: user._id
        })


        workspace.projects.push(project)

        await workspace.save()

        return res.status(201).json({
            message: 'Project created successfully',
            workspaceId,
            project
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getProject = async (req, res) => {
    try {
        const { projectId } = req.params

        const project = await Project.findById(projectId)

        if (!project) {
            return res.status(404).json({
                message: 'No project found.'
            })
        }

        const user = req.user

        const isOwner = project.createdBy === user._id
        const isMember = project.members.some(pm => pm.user.toHexString() === user._id.toHexString())

        if (!isMember && !isOwner) {
            return res.status(403).json({
                message: 'You are not a part of this project'
            })
        }

        return res.status(200).json({
            project
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getProjectTasks = async (req, res) => {
    try {
        const { projectId } = req.params

        const project = await Project.findById(projectId).populate("members.user")

        if (!project) {
            return res.status(404).json({
                message: 'No project found.'
            })
        }

        const user = req.user

        const isOwner = project.createdBy.toHexString() === user._id.toHexString()
        const isMember = project.members.some(pm => pm.user._id === user._id)

        if (!isMember && !isOwner) {
            return res.status(403).json({
                message: 'You are not a part of this project'
            })
        }

        const tasks = await Task.find({
            project: projectId,
            isArchived: false
        }).populate("assignees", "fullName profilePicture").sort({ createdAt: -1 })

        return res.status(200).json({
            project,
            tasks
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}