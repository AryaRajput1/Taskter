import type { CreatePorjectFormData } from "@/components/workspace/project/createProjectDialog";
import { postData } from "@/lib/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProjectCreationMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            workspaceId,
            projectData
        }: {
            workspaceId: string,
            projectData: CreatePorjectFormData
        }) => postData(`/projects/${workspaceId}/create`, projectData),
        onSuccess: (data: unknown) => {
            queryClient.invalidateQueries({
                queryKey: ['workspaces', (data as { workspaceId: string }).workspaceId]
            })
        }
    })
}