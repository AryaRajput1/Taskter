
import { BackButton } from "@/components/backButton"
import Loader from "@/components/Loader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateTaskDialog } from "@/components/workspace/task/createTaskDialog"
import { TaskColumn } from "@/components/workspace/task/taskColumn"
import { useProjectTaskQuery } from "@/hooks/useProject"
import { getProjectProgress } from "@/lib"
import type { Project, Task, TaskStatus } from "@/types"
import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { TASK_STATUS } from "utils/constant"

const ProjectDetails = () => {
    const { projectId, workspaceId } = useParams()
    const navigate = useNavigate()

    const [isCreateTask, setIsCreateTask] = useState(false)

    const [taskFilter, setTaskFilter] = useState<TaskStatus | "All">("All")

    const { data, isLoading } = useProjectTaskQuery<{ project: Project, tasks: Task[] }>(projectId || '')

    const { project, tasks = [] } = data || {}

    const projectProgress = getProjectProgress(tasks)

    if (isLoading) {
        return <Loader />
    }


    const handleTaskClick = (taskId: string) => {
        navigate(`/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`)
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md: items-center justify-between gap-4">
                <div>
                    <BackButton />
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl md: text-2x1 font-bold">{project?.title}</h1>
                    </div>
                    {project?.description &&
                        (<p className="text-sm text-gray-500">{project?.description}</p>)
                    }
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center gap-2 min-w-32">
                        <div className="text-sm text-muted-foreground">Progress :</div>
                        <div className="flex-1">
                            <Progress value={projectProgress} className="h-2" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                            {projectProgress}%
                        </span>
                    </div>
                    <Button onClick={() => setIsCreateTask(true)}>Add Task</Button>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <Tabs defaultValue="all" className="w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <TabsList>
                            <TabsTrigger value="all" onClick={() => setTaskFilter('All')}>
                                All Tasks
                            </TabsTrigger>
                            <TabsTrigger value="todo" onClick={() => setTaskFilter("To Do")}>
                                To Do
                            </TabsTrigger>
                            <TabsTrigger
                                value="in-progress"
                                onClick={() => setTaskFilter("In Progress")}
                            >
                                In Progress
                            </TabsTrigger>
                            <TabsTrigger value="done" onClick={() => setTaskFilter("Done")}>
                                Done
                            </TabsTrigger>
                        </TabsList>

                        <div className="flex items-center text-sm">
                            <span className="text-muted-foreground">Status :</span>
                            <div>
                                <Badge variant="outline" className="bg-background">
                                    {tasks.filter((task) => task.status === "To Do").length} To Do
                                </Badge>
                                <Badge variant="outline" className="bg-background">
                                    {tasks.filter((task) => task.status === "In Progress").length}{" "}
                                    In Progress
                                </Badge>
                                <Badge variant="outline" className="bg-background">
                                    {tasks.filter((task) => task.status === "Done").length} Done
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <TabsContent value="all" className="m-0">
                        <div className="grid grid-cols-3 gap-4">
                            <TaskColumn
                                title="To Do"
                                tasks={tasks.filter((task) => task.status === "To Do")}
                                onTaskClick={handleTaskClick}
                            />

                            <TaskColumn
                                title="In Progress"
                                tasks={tasks.filter((task) => task.status === 'In Progress')}
                                onTaskClick={handleTaskClick}
                            />

                            <TaskColumn
                                title="Done"
                                tasks={tasks.filter((task) => task.status === 'Done')}
                                onTaskClick={handleTaskClick}
                            />

                        </div>
                    </TabsContent>
                    <TabsContent value="todo" className="m-0">
                        <div className="grid md:grid-cols-1 gap-4">
                            <TaskColumn
                                title="To Do"
                                tasks={tasks.filter((task) => task.status === "To Do")}
                                onTaskClick={handleTaskClick}
                                isFullWidth={true}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="in-progress" className="m-0">
                        <div className="grid md:grid-cols-1 gap-4">
                            <TaskColumn
                                title="In Progress"
                                tasks={tasks.filter((task) => task.status === "In Progress")}
                                onTaskClick={handleTaskClick}
                                isFullWidth={true}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="done" className="m-0">
                        <div className="grid md:grid-cols-1 gap-4">
                            <TaskColumn
                                title="Done"
                                tasks={tasks.filter((task) => task.status === "Done")}
                                onTaskClick={handleTaskClick}
                                isFullWidth={true}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <CreateTaskDialog
                isOpen={isCreateTask}
                onOpenChange={setIsCreateTask}
                projectId={projectId || ''}
                projectMembers={project?.members}
            />
        </div>
    )
}

export default ProjectDetails