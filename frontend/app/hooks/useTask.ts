import type { CreatePorjectFormData } from "@/components/workspace/project/createProjectDialog";
import type { CreateTaskFormData } from "@/components/workspace/task/createTaskDialog";
import { getData, postData, updateData } from "@/lib/service";
import type { Task } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTaskCreationMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            projectId,
            taskData
        }: {
            projectId: string,
            taskData: CreateTaskFormData
        }) => postData(`/tasks/${projectId}/create`, taskData),
        onSuccess: (data: unknown) => {
            queryClient.invalidateQueries({
                queryKey: ['project', (data as { projectId: string }).projectId]
            })
        }
    })
}

export const useTaskByIdQuery = (taskId: string) => {
    return useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getData(`/tasks/${taskId}`),
    });
};


export const useTaskUpdateMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ taskId, data }: { taskId: string, data: Partial<Task> }) => updateData(`/tasks/${taskId}/update`, data),
        onSuccess: (data: unknown) => {
            queryClient.invalidateQueries({
                queryKey: ['task', (data as { taskId: string }).taskId]
            })
        }
    })
}