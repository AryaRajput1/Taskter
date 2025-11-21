import { getData, postData } from "@/lib/service"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCreateWorkspaceMutation = <T, K>() => {
    return useMutation({
        mutationFn: (data: T) => postData<K>('/workspaces/create', data)
    })
}

export const useGetWorkspacesQuery = <K>() => {
    return useQuery({
        queryKey: ["workspaces"],
        queryFn: async () => getData<K>('/workspaces/all')
    })
}

export const useGetWorkspaceQuery = <K>(workspaceId: string) => {
    return useQuery({
        queryKey: ["workspaces", workspaceId],
        queryFn: async () => getData<K>(`/workspaces/${workspaceId}`)
    })
}

export const useGetWorkspacesStatsQuery = <K>(workspaceId: string) => {
    return useQuery({
        queryKey: ["workspaces", workspaceId, "stats"],
        queryFn: async () => getData<K>(`/workspaces/${workspaceId}/stats`)
    })
}

export const useGetWorkspaceDetailsQuery = (workspaceId: string) => {
    return useQuery({
        queryKey: ["workspace", workspaceId, "details"],
        queryFn: async () => getData(`/workspaces/${workspaceId}`),
    });
};
