import { Router } from 'express'
import z from 'zod'
import { validateRequest } from 'zod-express-middleware'
import { forgetPasswordSchema, loginSchema, registerSchema, resetPasswordSchema, verifyEmailSchema } from '../libs/validateSchema.js'
import { login, register, verifyEmail, forgetPassword, verifyResetPasswordTokenAndResetPassword } from '../controllers/auth.controller.js'

const router = new Router()

router.post('/register', validateRequest({
    body: registerSchema
}), register)

router.post('/login', validateRequest({
    body: loginSchema
}), login)

router.post('/verify-email', validateRequest({
    body: verifyEmailSchema
}), verifyEmail)

router.post('/forget-password', validateRequest({
    body: forgetPasswordSchema
}), forgetPassword)

router.post('/reset-password', validateRequest({
    body: resetPasswordSchema
}), verifyResetPasswordTokenAndResetPassword)

export default router;

