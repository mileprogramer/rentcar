import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginPage from "../pages/Login.Page";

export default function ProtectedLogin() {
    
    const { isAdminLogged } = useAuth();
    if(!isAdminLogged()) {
        return  <LoginPage/>;
    }
    Navigate("/");
    
}