import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTaskUpdateMutation } from "@/hooks/useTask";
import type { TaskStatus } from "@/types";
import { toast } from "sonner";
import { TASK_STATUS } from "utils/constant";

export const TaskStatusSelector = ({
    status,
    taskId,
}: {
    status: TaskStatus;
    taskId: string;
}) => {
    const { mutate, isPending } = useTaskUpdateMutation();

    const handleStatusChange = (value: TaskStatus) => {
        mutate(
            { taskId, data: { status: value } },
            {
                onSuccess: () => {
                    toast.success("Status updated successfully");
                },
                onError: (error: any) => {
                    const errorMessage = error.response.data.message;
                    toast.error(errorMessage);
                    console.log(error);
                },
            }
        );
    };
    return (
        <Select value={status || ""} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]" disabled={isPending}>
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                {
                    Object.values(TASK_STATUS).map((taskStatus) => (<SelectItem value={taskStatus} key={taskStatus}>{taskStatus}</SelectItem>))
                }
            </SelectContent>
        </Select>
    );
};