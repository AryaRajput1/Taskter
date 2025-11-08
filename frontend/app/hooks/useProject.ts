import type { CreatePorjectFormData } from "@/components/workspace/project/createProjectDialog";
import { getData, postData } from "@/lib/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useProjectTaskQuery = <K>(projectId: string) => {
    return useQuery({
        queryKey: ["project", projectId],
        queryFn: async () => getData<K>(`/projects/${projectId}/tasks`)
    })
}