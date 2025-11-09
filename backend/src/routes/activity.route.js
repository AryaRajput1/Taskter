import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { validateRequest } from 'zod-express-middleware'
import { getActivity } from '../controllers/activity.controller.js'
import { activitySchema } from '../libs/validateSchema.js'

const router = Router()

router.get("/:resourceId/:resourceType", authMiddleware, validateRequest({
    params: activitySchema
}), getActivity)

export default router