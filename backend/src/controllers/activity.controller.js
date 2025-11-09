import ActivityLog from "../models/activityLog.model.js"

export const getActivity = async (req, res) => {

    try {
        const user = req.user
        const { resourceId, resourceType } = req.params

        const activities = await ActivityLog.find({
            user: user._id,
            resourceId,
            resourceType
        }).populate("user", "fullName profilePicture").sort({ createdAt: -1 })

        return res.status(200).json({
            activities
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })
    }

}