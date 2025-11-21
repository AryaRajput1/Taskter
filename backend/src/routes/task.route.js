import { Router } from 'express'
import { validateRequest } from 'zod-express-middleware'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { taskSchema, taskUpdateSchema } from '../libs/validateSchema.js'
import { createTask, getTask, updateTask, getMyTasks } from '../controllers/task.controller.js'

const router = new Router()

router.post('/:projectId/create',
    authMiddleware,
    validateRequest({
        body: taskSchema
    }), createTask)

router.get('/:taskId',
    authMiddleware,
    getTask)

router.put('/:taskId/update',
    authMiddleware,
    validateRequest({
        body: taskUpdateSchema
    }),
    updateTask)

router.get('/',
    authMiddleware,
    getMyTasks)


export default router