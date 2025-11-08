import { useParams } from "react-router"
import { useState } from "react"
import { useGetWorkspaceQuery } from "@/hooks/useWorkspace"
import Loader from "@/components/Loader"
import type { Project, Workspace } from "@/types"
import WorkspaceHeader from "@/components/workspace/workspaceHeader"
import { ProjectList } from "@/components/workspace/project/projectList"
import { CreateProjectDialog } from "@/components/workspace/project/createProjectDialog"


const WorkspaceDetails = () => {
    const { workspaceId } = useParams()
    const [isProjectCreate, setIsProjectCreate] = useState(false)
    const [isInviteMembers, setIsInviteMembers] = useState(false)
    if (!workspaceId) {
        return <div>No workspace found</div>
    }
    const { data, isLoading } = useGetWorkspaceQuery<{ workspace: Workspace, projects: Project[] }>(workspaceId)

    const { workspace, projects = [] } = data || {}

    if (!workspace) {
        return <div>No workspace found</div>
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="space-y-8">
            <WorkspaceHeader
                workspace={workspace}
                members={workspace?.members}
                onCreateProject={() => setIsProjectCreate(true)}
                onInviteMember={() => setIsInviteMembers(true)}
            />
            <ProjectList
                workspaceId={workspace._id}
                onCreateProject={() => setIsProjectCreate(true)}
                projects={projects}
            />
            <CreateProjectDialog
                isOpen={isProjectCreate}
                onOpenChange={(val: boolean) => { setIsProjectCreate(val) }}
                workspaceId={workspace._id}
                workspaceMembers={workspace.members}
            />

        </div>
    )
}

export default WorkspaceDetails