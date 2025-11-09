import { Project } from "../models/project.model.js";
import { Task } from "../models/task.model.js";
import { Comment } from "../models/comment.model.js"
import { ACTIVITY_ACTION, ACTIVITY_RESOURCE_TYPE } from "../utils/constant.js";
import { recordActivity } from '../libs/index.js'

export const createComment = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { text } = req.body;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        const project = await Project.findById(task.project);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        const isOwner = project.createdBy.toHexString()

        const isMember = project.members.some(
            (member) => member.user.toString() === req.user._id.toString()
        );

        if (!isMember && !isOwner) {
            return res.status(403).json({
                message: "You are not a part of this project",
            });
        }

        const newComment = await Comment.create({
            text,
            task: taskId,
            author: req.user._id,
        });

        task.comments.push(newComment._id);
        await task.save();

        // record activity
        await recordActivity(req.user._id, ACTIVITY_ACTION.ADDED_COMMENT, ACTIVITY_RESOURCE_TYPE.COMMENT, taskId, {
            description: `added comment ${text.substring(0, 50) + (text.length > 50 ? "..." : "")
                }`,
        });

        res.status(201).json({ newComment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const getComments = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        const project = await Project.findById(task.project);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        const isOwner = project.createdBy.toHexString()

        const isMember = project.members.some(
            (member) => member.user.toString() === req.user._id.toString()
        );

        if (!isMember && !isOwner) {
            return res.status(403).json({
                message: "You are not a part of this project",
            });
        }


        const comments = await Comment.find({ task: taskId })
            .populate("author", "fullName profilePicture")
            .sort({ createdAt: -1 });

        res.status(200).json({ comments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}