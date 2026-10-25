import { createBrowserRouter, Link, Navigate } from "react-router-dom";
import App from "../App";
import AuthProvider from "../context/userContext";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Gruades from "./RouteGuard";
import MyReportsPage from "../pages/user/MyReportsPage";
import ReportFormPage from "../pages/user/ReportFormPage";
import ReportDetailsPage from "../pages/user/ReportDetailsPage";
import FoundItemDetailsPage from "../pages/user/FoundItemDetailsPage";
import AdminRequestsPage from "../pages/admin/AdminRequestsPage";
import AdminFoundItemsPage from "../pages/admin/AdminFoundItemsPage";
import FoundItemFormPage from "../pages/admin/FoundItemFormPage";

export const router=createBrowserRouter
(
[
{
    path: "/", element: <AuthProvider><App /></AuthProvider>,children:[
    { index: true, element: <Navigate to="/login" /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    {
        element:<Gruades role={['User']} />,children:[
          { path: "/my-reports", element: <MyReportsPage /> },
          { path: "/my-reports/new", element: <ReportFormPage /> },
          { path: "/my-reports/:id", element: <ReportDetailsPage /> },
          { path: "/my-reports/:id/edit", element: <ReportFormPage /> },
          { path: "/found-items/:id", element: <FoundItemDetailsPage /> }
        ]
    },
    {
         element:<Gruades role={['Admin']} />,children:[
         { path: "/admin/requests", element: <AdminRequestsPage /> },
          { path: "/admin/found-items", element: <AdminFoundItemsPage /> },
          { path: "/admin/found-items/new", element: <FoundItemFormPage /> },
          { path: "/admin/found-items/:id/edit", element: <FoundItemFormPage /> },
        ]

    }
    ]
       
   
},
 { path: "*", element: <div className="status-screen status-screen-404"><p className="status-code">404</p><p>הדף שחיפשת לא נמצא.</p><Link to="/" className="btn btn-primary mt-2">חזרה לדף הבית</Link></div> }
]
)