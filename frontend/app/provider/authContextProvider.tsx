import type { User } from "@/types";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useCookies } from 'react-cookie'
import { queryClient } from "./reactQueryProvider";
import { useLocation, useNavigate } from "react-router";
import { PUBLIC_ROUTES } from "@/lib";

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (data: { user: User, token: string }) => Promise<void>
    logout: () => Promise<void>
}

export const Context = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: async (data: { user: User, token: string }) => { },
    logout: async () => { }
})

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [cookies, setCookie, removeCookie] = useCookies();

    const navigate = useNavigate()
    const currentPath = useLocation().pathname?.split('/').join("")

    const isPublicRoute = PUBLIC_ROUTES.includes(currentPath)

    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);

            const userInfo = localStorage.getItem("user")

            if (userInfo) {
                setUser(JSON.parse(userInfo))
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
                if (!isPublicRoute) {
                    navigate('/login')
                }
            }
            setIsLoading(false);
        }

        checkAuth()

    }, [])


    useEffect(() => {
        const handleLogout = () => {
            logout()
            navigate("/login")
        }

        window.addEventListener("force-logout", handleLogout)

        return () => window.removeEventListener("force-logout", handleLogout)
    }, [])

    const login = async (data: { user: User, token: string }) => {
        setUser(data.user)
        localStorage.setItem("user", JSON.stringify(data.user))
        setIsAuthenticated(true)
    }
    const logout = async () => {
        setUser(null)
        setIsAuthenticated(false)
        removeCookie("token")
        localStorage.removeItem("user")
        queryClient.clear() //clear cache
    }
    return <Context.Provider value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout
    }
    }>
        {children}
    </Context.Provider>
}

export function useAuth() {
    const context = useContext(Context)

    if (!context) {
        throw new Error("useAuth must be in AuthContextProvider")
    }

    return context
}

export default AuthContextProvider