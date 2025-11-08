import { useAuth } from "@/provider/authContextProvider"
import type { Workspace } from "@/types"
import { Button } from "../ui/button"
import { Bell, Ghost, PlusCircle } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Link } from "react-router"
import WorkspaceAvatar from "../workspace/workspaceAvatar"

interface HeaderProps {
    onWorkspaceCreate: () => void
    currentWorkspace: Workspace | null
    onWorkspaceSelected: (workspace: Workspace | null) => void
    workspaces: Workspace[]
}

const Header = ({
    workspaces,
    currentWorkspace,
    onWorkspaceSelected,
    onWorkspaceCreate
}: HeaderProps) => {
    const { user, logout } = useAuth()
    const avatarFallback = user?.fullName.split(" ").map(name => name[0]).join("")
    return (
        <div className="bg-background sticky top-0 z-40 border-b">
            <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"outline"}>
                                {
                                    currentWorkspace ?
                                        <>
                                            {
                                                currentWorkspace.color &&
                                                    <WorkspaceAvatar
                                                        color={currentWorkspace.color}
                                                        name={currentWorkspace.name}
                                                    />
                                            }
                                            <span className="font-medium">{currentWorkspace.name}</span>

                                        </> : <>
                                            <span className="font-medium">Select Workspace</span>
                                        </>
                                }
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                {
                                    workspaces?.map(ws => (
                                        <DropdownMenuItem key={ws._id} onClick={() => onWorkspaceSelected(ws)}>
                                            {
                                                <>{ws.color &&
                                                    <WorkspaceAvatar
                                                        color={ws.color}
                                                        name={ws.name}
                                                    />}
                                                    <span className="ml-2">{ws.name}</span></>
                                            }
                                        </DropdownMenuItem>
                                    ))
                                }
                            </DropdownMenuGroup>
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={onWorkspaceCreate}>
                                    <PlusCircle className="size-4 mr-2" />
                                    Create Workspace
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant={'ghost'} size={'icon'}>
                        <Bell />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <button>
                                <Avatar>
                                    <AvatarImage src={user?.profilePicture}></AvatarImage>
                                    <AvatarFallback className="bg-black text-white">{avatarFallback}</AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to={'/user/profile'}>Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

        </div >
    )
}
export default Header