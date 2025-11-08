
import { z } from "zod"
import { PROJECT_STATUS, ROLES } from "./constant"

export const loginSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password should be of 6 length')
})

export const signUpSchema = z.object({
    fullName: z.string().min(3, "Name should be of 3 length.").max(20, "Name should be of 20 length"),
    email: z.email('Invalid email adress'),
    password: z.string().min(6, 'Password should be of 6 length'),
    confirmPassword: z.string().min(6, 'Confirm Password should be of 6 length')
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password do not match"
})

export const forgetPasswordSchema = z.object({
    email: z.email('Invalid email address'),
})

export const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Invalid token'),
    newPassword: z.string().min(6, 'Password should be of 6 length'),
    confirmPassword: z.string().min(6, 'Password should be of 6 length')
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password do not match"
})

export const workspaceCreationSchema = z.object({
    name: z.string().min(3, "Name should be atleast of 3 char long"),
    description: z.string().optional(),
    color: z.string().min(3, 'Color should be atleast of 3 char long')
})

export const projectCreationSchema = z.object({
    title: z.string().min(3, "Title should be atleast of 3 char long"),
    description: z.string().optional(),
    status: z.enum(Object.values(PROJECT_STATUS)),
    startDate: z.string().min(10, "Start Date is mandatory"),
    dueDate: z.string().min(10, "Start Date is mandatory"),
    members: z.array(z.object({
        user: z.string(),
        role: z.enum(Object.values(ROLES))
    })).optional(),
    tags: z.string().optional()
})


