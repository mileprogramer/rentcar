import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./pages/Home.Page";
import AddCar from "./pages/AddCar.Page";
import EditDeletePage from "./pages/EditDelete.Page";
import RentedCarsPage from "./pages/RentedCars.Page";
import {Provider} from "react-redux";
import storeOptions from "./settings/store";
import { configureStore } from '@reduxjs/toolkit';
import StatisticsPage from './pages/Statistics.Page';
import "./css/default.css"

function App() {
    return (
        <Provider store={configureStore({ reducer: storeOptions })}>
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/rented-cars" element={<RentedCarsPage />} />
                    <Route exact path="/statistics" element={<StatisticsPage />} />
                    <Route path="/add-car" element={<AddCar />} />
                    <Route path="/edit-delete-cars" element={<EditDeletePage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
