import { createContext } from "react";
import type { User } from "../types/authLogin";


interface AuthContexType{
    user:User|null,
    setUser: (s: null | User) => void
    token:string|null,
    isAuthenticated:boolean,
     isLoading: boolean,
    login:(user:User,token:string)=>void,
    logout:()=>void
}
export const AuthContext=createContext<AuthContexType>( {user: null,setUser: () => { },
    token: null,
    isAuthenticated: false,
    isLoading:false,
    login:  () => {},
    logout: () => {}});
