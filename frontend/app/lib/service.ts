import type { unknown } from "zod";
import axiosWrapper from "./axiosWrapper";

export const postData = async <T>(url: string, data: unknown) => {
    const response = await axiosWrapper.post<T>(url, data)

    return response.data
}

export const getData = async <T>(url: string) => {
    const response = await axiosWrapper.get<T>(url)

    return response.data
}

export const updateData = async <T>(url: string, data: unknown) => {
    const response = await axiosWrapper.put<T>(url, data)

    return response.data
}

export const deleteData = async <T>(url: string) => {
    const response = await axiosWrapper.delete<T>(url)

    return response.data
}