import { useTaskUpdateMutation } from "@/hooks/useTask";
import type { TaskPriority, TaskStatus } from "@/types";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TASK_PRIORITY } from "utils/constant";

export const TaskPrioritySelector = ({
    priority,
    taskId,
}: {
    priority: TaskPriority;
    taskId: string;
}) => {
    const { mutate, isPending } = useTaskUpdateMutation();

    const handleStatusChange = (value: TaskPriority) => {
        mutate(
            { taskId, data: { priority: value } },
            {
                onSuccess: () => {
                    toast.success("Priority updated successfully");
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
        <Select value={priority || ""} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]" disabled={isPending}>
                <SelectValue placeholder="Priority" />
            </SelectTrigger>

            <SelectContent>
                {Object.values(TASK_PRIORITY).map((taskPriority) => (<SelectItem value={taskPriority} key={taskPriority}>{taskPriority}</SelectItem>))}
            </SelectContent>
        </Select>
    );
};