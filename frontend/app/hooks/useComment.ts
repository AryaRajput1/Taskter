import { getData, postData } from "@/lib/service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCommentCreationMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            taskId,
            data
        }: {
            taskId: string,
            data: {
                text: string
            }
        }) => postData(`/comments/${taskId}`, { text: data.text }),
        onSuccess: (data: unknown) => {
            queryClient.invalidateQueries({
                queryKey: ['comment', (data as { taskId: string }).taskId]
            })
        }
    })
}

export const useCommentByTaskIdQuery = <T>(taskId: string) => {
    return useQuery({
        queryKey: ["comment", taskId],
        queryFn: async () => getData<T>(`/comments/${taskId}`),
    });
};