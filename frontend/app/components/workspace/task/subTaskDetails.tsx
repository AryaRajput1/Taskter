import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Member, Task } from "@/types";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { CreateTaskDialog } from "./createTaskDialog";

export const SubTasksDetails = ({
    subTasks,
    taskId,
    projectMembers
}: {
    subTasks: Task[];
    taskId: string;
    projectMembers: Member[]
}) => {
    const [isCreateTask, setIsCreateTask] = useState(false)
    const { workspaceId, projectId } = useParams()

    const handleToggleTask = (subTaskId: string, checked: boolean) => {

    };

    const handleAddSubTask = () => {
    };

    return (
        <div className="mb-6">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-0">
                    Sub Tasks
                </h3>
                <Button onClick={() => setIsCreateTask(true)}>Add Sub Task</Button>
            </div>


            <div className="space-y-2 mb-4">
                {subTasks.length > 0 ? (
                    subTasks.map((subTask) => (
                        <Link key={subTask._id} to={`/workspaces/${workspaceId}/projects/${projectId}/tasks/${subTask._id}`}>
                            <div className="flex items-center space-x-2">
                                <label
                                    className={cn(
                                        "text-sm",
                                        subTask.compltedAt ? "line-through text-muted-foreground" : ""
                                    )}
                                >
                                    {subTask.title}
                                </label>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-sm text-muted-foreground">No sub tasks</div>
                )}
            </div>
            <CreateTaskDialog
                isSubTask={true}
                parentTaskId={taskId}
                isOpen={isCreateTask}
                onOpenChange={setIsCreateTask}
                projectId={projectId || ''}
                projectMembers={projectMembers}
            />
        </div>
    );
};