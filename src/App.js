import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./pages/Home.Page";
import BestSellingCars from "./pages/BestSellingCars.Page";
import AddCar from "./pages/AddCar.Page";
import EditDeletePage from "./pages/EditDelete.Page";
import AcceptCarPage from "./pages/AcceptCar.Page";


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/best-selling-cars" element={<BestSellingCars />} />
                <Route path="/add-car" element={<AddCar />} />
                <Route path="/edit-delete-cars" element={<EditDeletePage />} />
                <Route path="/accept-car" element={<AcceptCarPage />} />
            </Routes>
        </Router>
    );
}

export default App;
