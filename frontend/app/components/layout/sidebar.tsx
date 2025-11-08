import { cn } from "@/lib/utils"
import { useAuth } from "@/provider/authContextProvider"
import type { Workspace } from "@/types"
import { ChevronsLeft, ChevronsRight, LogOut, Wrench } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { NAV_ITEMS } from "@/lib/constants"
import SidebarNav from "./sidebarNav"

interface SidebarProps {
    currentWorkspace: Workspace | null
}
const Sidebar = ({ currentWorkspace }: SidebarProps) => {
    const { user, logout } = useAuth()

    const [isCollapsed, setIsCollapsed] = useState(false)
    return (
        <div className={
            cn("flex flex-col bg-sidebar duration-300 border-r transition-all",
                isCollapsed ? "w-16 md:w-[80px]" : "w-16 md:w-[240px]"
            )
        }>
            <div className="flex items-center h-14 border-b px-4 mb-4">
                <Link to={'/dashboard'} className="flex items-center"> {
                    (
                        <div className="flex items-center">
                            <Wrench className="size-6 text-blue-600" />
                            {!isCollapsed && <span className="font-semibold text-lg hidden md:block ml-2">
                                Taskter
                            </span>}
                        </div>
                    )
                }
                </Link>
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="ml-auto hidden md:block"
                    onClick={() => setIsCollapsed(prev => !prev)}
                >
                    {
                        isCollapsed ?
                            <ChevronsRight className="size-4" /> :
                            <ChevronsLeft className="size-4" />
                    }

                </Button>
            </div >

            <ScrollArea className="flex-1 px-3 py-2">
                <SidebarNav
                    items={NAV_ITEMS}
                    isCollapsed={isCollapsed}
                    currentWorkspace={currentWorkspace}
                    className={
                        isCollapsed ? "items-center space-y-2" : ""
                    }
                />
            </ScrollArea>
            <div className="flex items-center justify-center">
                <Button variant={"ghost"}
                    size={isCollapsed ? "icon" : "default"}
                    onClick={logout}>
                    <LogOut className={cn("size-4", isCollapsed && "mr-2")} />
                    {
                        !isCollapsed && <span className="font-semibold hidden md:block">Logout</span>
                    }</Button>
            </div>
        </div >
    )
}
export default Sidebar