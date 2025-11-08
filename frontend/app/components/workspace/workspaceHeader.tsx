import type { User, UserRoles, Workspace } from "@/types"
import WorkspaceAvatar from "./workspaceAvatar"
import { Button } from "../ui/button"
import { Plus, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface WorkspaceHeaderProps {
    workspace: Workspace
    members: {
        _id: string
        role: UserRoles
        user: User
        joinedAt: Date
    }[]
    onCreateProject: () => void
    onInviteMember: () => void
}
const WorkspaceHeader = ({
    members,
    workspace,
    onCreateProject,
    onInviteMember
}: WorkspaceHeaderProps) => {
    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-3">
                    <div className="flex md: items-center gap-3">
                        {workspace.color && (
                            <WorkspaceAvatar color={workspace.color}
                                name={workspace.name} />
                        )}

                        <h2 className="text-x1 md:text-2x1 font-semibold">
                            {workspace.name}
                        </h2>
                    </div>
                    <div className="flex items-center gap-3 justify-between md:justify-start mb-4 md:mb-0">
                        <Button variant={"outline"} onClick={onInviteMember}>
                            <UserPlus className="size-4 mr-2" />
                            Invite
                        </Button>
                        <Button onClick={onCreateProject}>
                            <Plus className="size-4 mr-2" />
                        </Button>
                    </div>
                </div>
                {workspace.description && (
                    <p className="text-sm md:text-base text-muted-foreground">
                        {workspace.description}
                    </p>
                )}
            </div>

            {members.length > 0 && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Members</span>

                    <div className="flex space-x-2">
                        {members.map((member) => (
                            <Avatar key={member._id} className="relative size-8 rounded-full border-2 border-background overflow-hidden" title={member.user.fullName}>
                                <AvatarImage src={member.user.profilePicture} alt={member.user.fullName} />
                                <AvatarFallback>
                                    {member.user.fullName?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                </div>
            )
            }
        </div >
    )
}
export default WorkspaceHeader