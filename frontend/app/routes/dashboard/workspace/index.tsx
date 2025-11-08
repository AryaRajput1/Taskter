import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import { CreateWorkspace } from "@/components/workspace/createWorkspace"
import { NoDataFound } from "@/components/workspace/noDataFound"
import WorkspaceCard from "@/components/workspace/workspaceCard"
import { useGetWorkspacesQuery } from "@/hooks/useWorkspace"
import type { Workspace } from "@/types"
import { PlusCircle } from "lucide-react"
import { useState } from "react"

const workspace = () => {
    const [isWorkspaceCreating, setIsWorkspaceCreating] = useState(false)
    const { data, isLoading } = useGetWorkspacesQuery<{ workspaces: Workspace[] }>()

    const { workspaces } = data || {}

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-bold">Workspaces</h2>
                    <Button onClick={() => setIsWorkspaceCreating(true)}>
                        <PlusCircle className="size-4 mr-2" />
                        New Workspace
                    </Button>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        workspaces?.length ? workspaces.map(workspace => {
                            return <WorkspaceCard key={workspace._id} workspace={workspace} />
                        }) : <NoDataFound
                            title="No workspace found"
                            description="Create a new workspace to get started"
                            buttonText="Create workspace"
                            buttonAction={() => setIsWorkspaceCreating(true)} />
                    }
                </div>
            </div>
            <CreateWorkspace
                isCreatingWorkspace={isWorkspaceCreating}
                setIsCreatingWorkspace={setIsWorkspaceCreating}
            />
        </>
    )
}
export default workspace