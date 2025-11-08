import type { NAV_ITEMS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import type { Workspace } from "@/types"
import type { HtmlHTMLAttributes } from "react"
import { useLocation, useNavigate } from "react-router"
import { Button } from "../ui/button"

interface SidebarNavProps extends HtmlHTMLAttributes<HTMLElement> {
    items: typeof NAV_ITEMS
    isCollapsed: boolean
    currentWorkspace: Workspace | null
}
const SidebarNav = ({
    className,
    items,
    isCollapsed,
    currentWorkspace,
    ...props
}: SidebarNavProps) => {
    const location = useLocation()
    const navigate = useNavigate()
    return (
        <nav className={cn("flex flex-col gap-y-2", className)} {...props}>
            {
                items.map(navItem => {
                    const Icon = navItem.icon
                    const isActive = location.pathname === navItem.href

                    const handleClick = () => {
                        if (navItem.href !== '/workspaces' && currentWorkspace && currentWorkspace._id) {
                            navigate(`${navItem.href}?workspaceId=${currentWorkspace._id}`)
                        } else {
                            navigate(navItem.href)
                        }
                    }

                    return <Button key={navItem.href} variant={isActive ? "outline" : "ghost"}
                        onClick={handleClick}
                        className={
                            cn("justify-start", isActive && "bg-blue-800/20 text-blue-600 font-medium")
                        }>
                        <Icon className="size-4 mr-2" />
                        {
                            isCollapsed ? <span className="sr-only">{navItem.title}</span> : (navItem.title)
                        }
                    </Button>
                })
            }

        </nav>
    )
}
export default SidebarNav