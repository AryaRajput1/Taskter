import { Router } from 'express'
import { validateRequest } from 'zod-express-middleware'
import { workspaceSchema } from '../libs/validateSchema.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { workspace, workspaces, getWorkspace } from '../controllers/workspace.controller.js'

const router = new Router()

router.post('/create',
    authMiddleware,
    validateRequest({
        body: workspaceSchema
    }), workspace)

router.get('/all',
    authMiddleware,
    workspaces
)

router.get('/:workspaceId',
    authMiddleware,
    getWorkspace
)

export default router