import { Project } from "../models/project.model.js";
import { Task } from "../models/task.model.js";
import { Workspace } from "../models/workspace.model.js";

export const createTask = async (req, res) => {
    try {
        const { projectId } = req.params
        const { title, description, status, assignees, startDate, dueDate, priority } = req.body

        const project = await Project.findById(projectId)

        if (!project) {
            return res.status(404).json({
                message: 'No project found.'
            })
        }

        const user = req.user

        const isOwner = project.createdBy.toHexString() === user._id
        const isMember = project.members.some(wm => wm.user.toHexString() === user._id.toHexString())

        if (!isMember && !isOwner) {
            return res.status(403).json({
                message: 'You are not a part of this project'
            })
        }

        const task = await Task.create({
            title,
            description,
            project: projectId,
            status,
            priority,
            assignees,
            startDate,
            dueDate,
            progress: 0,
            watchers: [],
            tags: [],
            subTasks: [],
            comments: [],
            attachments: [],
            isArchieved: false,
            createdBy: user._id
        })


        project.tasks.push(task)
        task.populate("assignees", "fullName profilePic")

        await project.save()

        return res.status(201).json({
            message: 'Task created successfully',
            projectId,
            task
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getTask = async (req, res) => {
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
