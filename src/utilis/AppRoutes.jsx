import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import HomePage from "../pages/HomePage";
import AvailableCars from "../pages/AvailableCars.Page";
import StatisticsPage from "../pages/Statistics.Page";
import AddCar from "../pages/AddCar.Page";
import EditDeletePage from "../pages/EditDelete.Page";
import EditUsers from "../pages/EditUsers.Page";
import RentedCarsPage from "../pages/RentedCars.Page";
import { useAuth } from "../context/AuthContext";
import AppLoading from "../components/AppLoading";
import ProtectedLogin from "./ProtectedLogin";

export default function AppRoutes() {

    const { loading } = useAuth();

    if(loading) {
        return <AppLoading />
    }

    return (
        <Router>
            <Routes>
                <Route element = {<ProtectedRoutes />}>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/available-cars" element={<AvailableCars />} />
                    <Route exact path="/rented-cars" element={<RentedCarsPage />} />
                    <Route exact path="/statistics" element={<StatisticsPage />} />
                    <Route path="/add-car" element={<AddCar />} />
                    <Route path="/edit-delete-cars" element={<EditDeletePage />} />
                    <Route path="/edit-users" element={<EditUsers />} />
                </Route>
                <Route path="/login" element={<ProtectedLogin/>}/>
            </Routes>
        </Router>
    )
}