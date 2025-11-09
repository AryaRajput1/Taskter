import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { validateRequest } from 'zod-express-middleware'
import { createComment, getComments } from '../controllers/comment.controller.js'
import { commentSchema } from '../libs/validateSchema.js'

const router = Router()

router.post("/:taskId", authMiddleware, validateRequest({
    body: commentSchema
}), createComment)

router.get("/:taskId", authMiddleware, getComments)

export default router