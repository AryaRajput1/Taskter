import { Router } from 'express'
import { validateRequest } from 'zod-express-middleware'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { taskSchema } from '../libs/validateSchema.js'
import { createTask, getTask } from '../controllers/task.controller.js'

const router = new Router()

router.post('/:projectId/create',
    authMiddleware,
    validateRequest({
        body: taskSchema
    }), createTask)

router.get('/:taskId',
    authMiddleware,
    getTask)


export default router