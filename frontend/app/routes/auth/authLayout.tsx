import { useAuth } from "@/provider/authContextProvider"
import { Navigate, Outlet } from "react-router"

const authLayout = () => {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isAuthenticated) {
        return <Navigate to={'/dashboard'} />
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <Outlet />
        </div>
    )
}
export default authLayout