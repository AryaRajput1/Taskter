import z, { optional } from "zod";
import { PROJECT_STATUS, ROLES, TASK_PRIORITY, TASK_STATUS } from "../utils/constant.js";

export const registerSchema = z.object({
    fullName: z.string().min(3, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password should be of 6 length'),
    confirmPassword: z.string().min(6, 'Password should be of 6 length')
})

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password should be of 6 length')
})

export const verifyEmailSchema = z.object({
    token: z.string().min(1, 'Token is required'),
})

export const forgetPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
})

export const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Invalid token'),
    newPassword: z.string().min(6, 'Password should be of 6 length'),
    confirmPassword: z.string().min(6, 'Password should be of 6 length')
})

export const workspaceSchema = z.object({
    name: z.string().min(3, 'name must be atleast 3 char long'),
    description: z.string().optional(),
    color: z.string().min(3, 'color must be atleast 3 char long')
})

export const projectSchema = z.object({
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

export const taskSchema = z.object({
    title: z.string().min(3, "Title should be atleast of 3 char long"),
    description: z.string().optional(),
    status: z.enum(Object.values(TASK_STATUS)),
    priority: z.enum(Object.values(TASK_PRIORITY)),
    startDate: z.string().min(10, "Start Date is mandatory"),
    dueDate: z.string().min(10, "Start Date is mandatory"),
    assignees: z.array(z.string()).min(1, "At least 1 assignee is required")
})

export const taskUpdateSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(Object.values(TASK_STATUS)).optional(),
    assignees: z.array(z.string()).optional(),
    priority: z.enum(Object.values(TASK_PRIORITY)).optional(),
})
