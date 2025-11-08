import Header from "@/components/layout/Header"
import Sidebar from "@/components/layout/sidebar"
import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import { CreateWorkspace } from "@/components/workspace/createWorkspace"
import { getData } from "@/lib/service"
import { useAuth } from "@/provider/authContextProvider"
import type { Workspace } from "@/types"
import { useState } from "react"
import { Navigate, Outlet, useLoaderData } from "react-router"

export async function clientLoader() {
  try {
    const [workspaces] = await Promise.all([getData('/workspaces/all')])
    return {
      workspaces
    }
  } catch (error) {
    console.log(error)
  }
}
const dashboardLayout = () => {
  const { isLoading, isAuthenticated } = useAuth()
  const [isWorkspaceCreating, setIsWorkspaceCreating] = useState(false)
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null)
  const { workspaces } = useLoaderData()

  if (isLoading) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />
  }

  const handleWorkspaceSelected = (workspace: Workspace | null) => setCurrentWorkspace(workspace)

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar Component */}
      <Sidebar currentWorkspace={currentWorkspace} />
      <div className="flex-1 flex flex-col h-full">
        <Header
          workspaces={workspaces.workspaces}
          onWorkspaceSelected={handleWorkspaceSelected}
          currentWorkspace={currentWorkspace}
          onWorkspaceCreate={() => setIsWorkspaceCreating(true)}
        />
        <main className="flex-1 overflow-y-auto h-full w-full">
          <div className="mx-auto container px-2 sm:px-6 lg:px-8 py-0 md:py-8 w-full h-full">
            <Outlet />
          </div>
        </main>

        <CreateWorkspace isCreatingWorkspace={isWorkspaceCreating} setIsCreatingWorkspace={setIsWorkspaceCreating} />
      </div>
    </div>
  )
}
export default dashboardLayout