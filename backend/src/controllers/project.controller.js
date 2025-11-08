import { Project } from "../models/project.model.js";
import { Workspace } from "../models/workspace.model.js";

export const project = async (req, res) => {
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