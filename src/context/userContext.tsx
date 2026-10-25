import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/authLogin";
import { authMe } from "../api/authService";
import { AuthContext } from "./authContext";

interface authProviderProp{
    children:ReactNode
}

const AuthProvider=({children}:authProviderProp)=>
{
const [user,setUser]=useState<User|null>(null);
const [token,setToken]=useState<string|null>(null);
const [isAuthenticated,setIsAuthenticated]=useState(false);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const checkUser = async () => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      try {
        const me = await authMe();
        setToken(savedToken);
        setUser(me);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("token");
      }
      
    }
    setIsLoading(false);
  };

  checkUser();
}, []);
const login=(user:User,token:string)=>
{     
    setToken(token);
    setUser(user);
    setIsAuthenticated(true) ;  
    localStorage.setItem('token',token); 
}
const logout=()=>
{
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
   
}

return <AuthContext.Provider value={{user,setUser,token,isLoading,isAuthenticated,login,logout}}>{children}</AuthContext.Provider>

}
export default AuthProvider
