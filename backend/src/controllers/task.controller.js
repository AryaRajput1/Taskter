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
        const { taskId } = req.params;

        const task = await Task.findById(taskId)
            .populate("assignees", "fullName profilePicture")
            .populate("watchers", "fullName profilePicture");

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        const project = await Project.findById(task.project).populate(
            "members.user",
            "fullName profilePicture"
        );

        res.status(200).json({ task, project });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params
        const user = req.user

        const task = await Task.findById(taskId)

        const { title } = req.body

        if (!task) {
            return res.status(404).json({
                message: "Invalid task"
            })
        }

        const project = await Project.findById(task.project)

        if (!project) {
            return res.status(404).json({
                message: "It is not a part of a project"
            })
        }

        const isOwner = project.createdBy.toHexString() === user._id.toHexString()
        const isMember = project.members.some((member) => member.user.toHexString() === user._id.toHexString())

        if (!isOwner && !isMember) {
            return res.status(403).json({
                message: "Not a part of this project"
            })

        }

        if (title.trim()) {
            task.title = title.trim();
            await task.save()
        }

        return res.status(200).json({
            message: "Task updated successfully",
            taskId,
            task
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}
