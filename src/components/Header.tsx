import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
    const { user,logout } = useContext(AuthContext)
    const navigate = useNavigate();

        const handleLogout = () => {
            logout();
        navigate("/login");
};
       const Nativation=()=>{
         switch (user?.role) {
                case 'Admin':
                    return (<>
                    <NavLink to={"/admin/requests"} className="nav-link">בקשות בעלות</NavLink>
                    <NavLink to={"/admin/found-items"} end className="nav-link">ניהול פריטים</NavLink>
                    <NavLink to={"/admin/found-items/new"} className="nav-link">פריט חדש</NavLink>
                    </>)
                case 'User':
                    return (<>
                    <NavLink to={"/my-reports"} end className="nav-link">הדיווחים שלי</NavLink>
                    <NavLink to={"/my-reports/new"} className="nav-link">דיווח חדש</NavLink>
                    </>)

            }
       }
       return <header className="app-header" data-role={user?.role}>
        <div className="app-header-inner">
        <span className="app-logo">SmartFind</span>
        <nav className="app-nav">{Nativation()}</nav>
        <h1 className="app-user">{user?.fullName}</h1>
        {user && <button onClick={handleLogout} className="btn btn-ghost app-logout">התנתקות</button>}
        </div>
       </header>
           
        
    
}
export default Header