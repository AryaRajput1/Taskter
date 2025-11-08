import { postData } from "@/lib/service"
import { useMutation } from "@tanstack/react-query"

export const useSignupMutation = <T, K>() => {
    return useMutation({
        mutationFn: (data: T) => postData<K>('/auth/register', data)
    })
}

export const useEmailVerificationMutation = <T extends { token?: string }, K>() => {
    return useMutation({
        mutationFn: (data: T) => postData<K>('/auth/verify-email', data)
    })
}

export const useLoginMutation = <T, K>() => {
    return useMutation({
        mutationFn: (data: T) => postData<K>('/auth/login', data)
    })
}

export const useForgetPasswordMutation = <T, K>() => {
    return useMutation({
        mutationFn: (data: T) => postData<K>('/auth/forget-password', data)
    })
}


export const useResetPasswordMutation = <T, K>() => {
    return useMutation({
        mutationFn: (data: T) => postData<K>('/auth/reset-password', data)
    })
}
