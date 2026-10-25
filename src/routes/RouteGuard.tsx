import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { Navigate, Outlet } from "react-router-dom"

interface GruadesProps{
    role:string[]
}
const Gruades=({role}:GruadesProps)=>{
 const { user,isLoading } = useContext(AuthContext)
 if (isLoading) return <p className="loader">בטעינה</p>;
 if(!user)
    return <Navigate to={"/login"}></Navigate>
 if (!role.includes(user.role)) return <p className="status-screen status-screen-lock">אין גישה</p>;
return <Outlet/>
}
export default Gruades