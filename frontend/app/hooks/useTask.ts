import type { CreatePorjectFormData } from "@/components/workspace/project/createProjectDialog";
import type { CreateTaskFormData } from "@/components/workspace/task/createTaskDialog";
import { getData, postData } from "@/lib/service";
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
