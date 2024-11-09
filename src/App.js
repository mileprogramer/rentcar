import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddCar from "./pages/AddCar.Page";
import EditDeletePage from "./pages/EditDelete.Page";
import RentedCarsPage from "./pages/RentedCars.Page";
import StatisticsPage from './pages/Statistics.Page';
import "./css/default.css"
import AvailableCars from './pages/AvailableCars.Page';
import HomePage from './pages/HomePage';
import EditUsers from './pages/EditUsers.Page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/Login.Page';
import axios from 'axios';
import { hostname } from "./config/globals.js"

axios.defaults.withXSRFToken = true;
axios.get(hostname + "sanctum/csrf-cookie/");
const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client = {queryClient}> 
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/available-cars" element={<AvailableCars />} />
                    <Route exact path="/rented-cars" element={<RentedCarsPage />} />
                    <Route exact path="/statistics" element={<StatisticsPage />} />
                    <Route path="/add-car" element={<AddCar />} />
                    <Route path="/edit-delete-cars" element={<EditDeletePage />} />
                    <Route path="/edit-users" element={<EditUsers />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
