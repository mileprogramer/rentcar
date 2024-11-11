import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoutes() {

    const { isAdminLogged } = useAuth();
    return isAdminLogged() ? <Outlet/> : <Navigate to="/login"/>
}