import { Project } from "../models/project.model.js";
import { Workspace } from "../models/workspace.model.js";

export const workspace = async (req, res) => {
    try {

        const { name, description, color } = req.body

        const workspace = await Workspace.create({
            name,
            description,
            color,
            owner: req.user._id,
            members: [{
                user: req.user._id,
                role: 'owner',
                joinedAt: new Date()
            }]
        })

        res.status(201).json({
            message: 'Workspace created successfully',
            workspace
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const workspaces = async (req, res) => {
    try {
        const workspaces = await Workspace.find({
            'members.user': req.user._id
        })

        res.status(200).json({
            workspaces
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getWorkspace = async (req, res) => {
    const { workspaceId } = req.params
    try {
        const workspace = await Workspace.findOne({
            _id: workspaceId,
            "members.user": req.user._id
        }).populate("members.user", "name email fullName profilePicture")

        if (!workspace) {
            return res.status(404).json({
                message: 'No workspace found'
            })
        }

        const projects = await Project.find({
            workspace: workspaceId,
            isArchieved: false,
        })
            .sort({
                createdAt: -1
            })


        res.status(200).json({
            workspace,
            projects
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getWorkspaceProjects = async (req, res) => {
    const { workspaceId } = req.params
    try {
        const workspace = await Workspace.findOne({
            _id: workspaceId,
            "members.user": req.user._id
        }).populate("members.user", "name email profilePicture")

        if (!workspace) {
            return res.status(404).json({
                message: 'No workspace found'
            })
        }

        res.status(200).json({
            workspace
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}