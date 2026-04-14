import {Navigate  , Outlet } from "react-router"
import { useAppSelector } from "@/app/hooks"

export default function ProtectedRouter(){
    const {isAuthenticated , user} = useAppSelector((state) => state.auth) 
    if(!isAuthenticated) {
        return <Navigate to = "/login" replace/>
    }
    if(user?.role !== "admin"){
        return <Navigate to = "/login" replace/>
    }
    return <Outlet/>
}

