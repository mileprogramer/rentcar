import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/navigation-items.css";

export default function NavigationItems() {

    const { logoutAdmin } = useAuth();

    return (
        <>
            <li className="nav-item">
                <NavLink to="/" className="nav-link">
                    Home 
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/available-cars" className="nav-link">
                    Available Cars 
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/rented-cars" className="nav-link"> 
                    Rented Cars 
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/statistics" className="nav-link"> 
                    Statistics 
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/add-car" className="nav-link"> 
                    Add Car 
                </NavLink>
                </li>
            <li className="nav-item">
                <NavLink to="/edit-delete-cars" className="nav-link">
                    Edit/Delete Cars 
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/edit-users" className="nav-link">
                    Edit users 
                </NavLink>
            </li>

            <li className="nav-item">
                <button
                    onClick={() => logoutAdmin()} 
                    className="btn btn-danger">
                    Logout
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-box-arrow-right ps-1" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                    </svg>
                </button>
            </li> 
        </>
    );
    
}