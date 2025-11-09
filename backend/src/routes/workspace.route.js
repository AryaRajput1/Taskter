import { Router } from 'express'
import { validateRequest } from 'zod-express-middleware'
import { workspaceSchema } from '../libs/validateSchema.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { workspace, workspaces, getWorkspace, getWorkspaceStats } from '../controllers/workspace.controller.js'

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

router.get('/:workspaceId/stats',
    authMiddleware,
    getWorkspaceStats
)

export default router