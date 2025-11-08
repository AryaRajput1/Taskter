import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Task } from "@/types";
import { format } from "date-fns";
import { AlertCircle, Calendar, CheckCircle, Clock } from "lucide-react";

interface TaskCardProps { task: Task; onClick: () => void }
export const TaskCard = ({ task, onClick }: TaskCardProps) => {
    return (
        <Card
            onClick={onClick}
            className="cursor-pointer hover:shadow-md transition-all duration-300 hover:translate-y-1"
        >
            <CardHeader>
                <div className="flex items-center justify-between">
                    <Badge
                        className={
                            task.priority === "High"
                                ? "bg-red-500 text-white"
                                : task.priority === "Medium"
                                    ? "bg-orange-500 text-white"
                                    : "bg-slate-500 text-white"
                        }
                    >
                        {task.priority}
                    </Badge>

                    <div className="flex gap-1">
                        {task.status !== "To Do" && (
                            <Button
                                variant={"ghost"}
                                size={"icon"}
                                className="size-6"
                                onClick={() => {
                                    console.log("mark as to do");
                                }}
                                title="Mark as To Do"
                            >
                                <AlertCircle className={cn("size-4")} />
                                <span className="sr-only">Mark as To Do</span>
                            </Button>
                        )}
                        {task.status !== "In Progress" && (
                            <Button
                                variant={"ghost"}
                                size={"icon"}
                                className="size-6"
                                onClick={() => {
                                    console.log("mark as in progress");
                                }}
                                title="Mark as In Progress"
                            >
                                <Clock className={cn("size-4")} />
                                <span className="sr-only">Mark as In Progress</span>
                            </Button>
                        )}
                        {task.status !== "Done" && (
                            <Button
                                variant={"ghost"}
                                size={"icon"}
                                className="size-6"
                                onClick={() => {
                                    console.log("mark as done");
                                }}
                                title="Mark as Done"
                            >
                                <CheckCircle className={cn("size-4")} />
                                <span className="sr-only">Mark as Done</span>
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <h4 className="ont-medium mb-2">{task.title}</h4>

                {task.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {task.description}
                    </p>
                )}

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        {task.assignees && task.assignees.length > 0 && (
                            <div className="flex -space-x-2">
                                {task.assignees.slice(0, 5).map((member) => (
                                    <Avatar
                                        key={member._id}
                                        className="relative size-8 bg-gray-700 rounded-full border-2 border-background overflow-hidden"
                                        title={member.fullName}
                                    >
                                        <AvatarImage src={member.profilePicture} />
                                        <AvatarFallback>{member.fullName?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                ))}

                                {task.assignees.length > 5 && (
                                    <span className="text-xs text-muted-foreground">
                                        + {task.assignees.length - 5}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {task.dueDate && (
                        <div className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="size-3 mr-1" />
                            {format(new Date(task.dueDate), "MMM d, yyyy")}
                        </div>
                    )}
                </div>
                {/* 5/10 subtasks */}
                {task.subTasks && task.subTasks.length > 0 && (
                    <div className="mt-2 text-xs text-muted-foreground">
                        {task.subTasks.filter((subTask) => subTask.status === 'Done').length} /{" "}
                        {task.subTasks.length} subtasks
                    </div>
                )}
            </CardContent>
        </Card>
    );
};