import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {

    const user = false;
    return user ? <Outlet/> : <Navigate to="/login"/>

}