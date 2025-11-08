import { Router } from 'express'
import { validateRequest } from 'zod-express-middleware'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { projectSchema } from '../libs/validateSchema.js'
import { z } from 'zod'
import { getProjectTasks, getProject, createProject } from '../controllers/project.controller.js'

const router = new Router()

router.post('/:workspaceId/create',
    authMiddleware,
    validateRequest({
        body: projectSchema
    }), createProject)

router.get('/:projectId',
    authMiddleware,
    getProject)

router.get('/:projectId/tasks',
    authMiddleware,
    getProjectTasks)


export default router