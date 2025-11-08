import { Router } from 'express'
import authRoutes from './auth.routes.js'
import workspaceRoutes from './workspace.route.js'
import projectRoutes from './project.route.js'

const router = new Router()

router.use('/auth', authRoutes)
router.use('/workspaces', workspaceRoutes)
router.use('/projects', projectRoutes)

export default router