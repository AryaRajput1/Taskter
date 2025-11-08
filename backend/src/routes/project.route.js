import { Router } from 'express'
import { validateRequest } from 'zod-express-middleware'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { projectSchema } from '../libs/validateSchema.js'
import { project } from '../controllers/project.controller.js'
import { z } from 'zod'

const router = new Router()

router.post('/:workspaceId/create',
    authMiddleware,
    validateRequest({
        body: projectSchema
    }), project)


export default router