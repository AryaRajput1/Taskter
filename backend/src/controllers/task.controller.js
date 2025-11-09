import { recordActivity } from "../libs/index.js";
import { Project } from "../models/project.model.js";
import { Task } from "../models/task.model.js";
import { Workspace } from "../models/workspace.model.js";
import { ACTIVITY_ACTION, ACTIVITY_RESOURCE_TYPE } from "../utils/constant.js";

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
            .populate("comments")
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

        const { title, description, status, assignees, priority, isWatching, isArchived } = req.body

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

        if (title?.trim()) {
            const oldTitle = task.title.substring(0, 50) + task.title.length > 50 ? '...' : ''
            task.title = title.trim();
            await task.save()
            const newTitle = task.title.substring(0, 50) + task.title.length > 50 ? '...' : ''
            await recordActivity(user._id, ACTIVITY_ACTION.UPDATED_TASK, ACTIVITY_RESOURCE_TYPE.TASK, taskId, { description: `updated task title from ${oldTitle} to ${newTitle}` })
        }

        if (description?.trim()) {
            const oldDescription = task.description.substring(0, 50) + (task.description.length > 50 ? '...' : '')
            task.description = description.trim();
            await task.save()
            const newDescription = task.description.substring(0, 50) + (task.description.length > 50 ? '...' : '')
            await recordActivity(user._id, ACTIVITY_ACTION.UPDATED_TASK, ACTIVITY_RESOURCE_TYPE.TASK, taskId, { description: `updated task description from ${oldDescription} to ${newDescription}` })
        }

        if (status?.trim()) {
            const oldStatus = task.status
            task.status = status;
            await task.save()
            const newStatus = task.status
            await recordActivity(user._id, ACTIVITY_ACTION.UPDATED_TASK, ACTIVITY_RESOURCE_TYPE.TASK, taskId, { description: `updated task status from ${oldStatus} to ${newStatus}` })
        }

        if (priority?.trim()) {
            const oldPriority = task.priority
            task.priority = priority;
            await task.save()
            const newPriority = task.priority
            await recordActivity(user._id, ACTIVITY_ACTION.UPDATED_TASK, ACTIVITY_RESOURCE_TYPE.TASK, taskId, { description: `updated task priority from ${oldPriority} to ${newPriority}` })
        }

        if (assignees) {
            const oldAssignees = task.assignees
            task.assignees = assignees;
            await task.save()
            const newAssignees = task.assignees
            await recordActivity(user._id, ACTIVITY_ACTION.UPDATED_TASK, ACTIVITY_RESOURCE_TYPE.TASK, taskId, { description: `updated task assignees from ${oldAssignees.length} to ${newAssignees.length}` })
        }

        if (isWatching !== undefined && isWatching !== null) {
            if (isWatching) {
                task.watchers = [...task.watchers, req.user._id]
            } else {
                task.watchers = task.watchers.filter(watcher => watcher.toHexString() !== req.user._id.toHexString())
            }
            await task.save()
            await recordActivity(user._id, ACTIVITY_ACTION.UPDATED_TASK, ACTIVITY_RESOURCE_TYPE.TASK, taskId, { description: `updated task from ${isWatching ? 'not watching' : 'watching'} to ${isWatching ? 'watching' : 'not watching'}` })
        }

        if (isArchived !== undefined && isArchived !== null) {
            task.isArchived = isArchived
            await task.save()
            await recordActivity(user._id, ACTIVITY_ACTION.UPDATED_TASK, ACTIVITY_RESOURCE_TYPE.TASK, taskId, { description: `updated task from ${isArchived ? 'not archived' : 'archived'} to ${isWatching ? 'archived' : 'not archived'}` })
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
