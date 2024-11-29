import { useState } from "react";
import Navbar from "../components/Navbar.Component"
import { HandleInput } from "../helpers/functions"
import MistakesAlert from "../components/MistakesAlert.Component"
import FormValidation from "../services/FormValidation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {

    const initialInputData = {
        username: "admin@admin",
        password: "password123",
    };
    const [inputData, setInputData] = useState(initialInputData);
    const handleInput = new HandleInput(setInputData, inputData);
    const { loginAdmin, loading } = useAuth();


    const [mistakes, setMistakes] = useState([]);
    const navigate = useNavigate();

    const loginUser = async () => {
        const mistakes = FormValidation.validateInputFields(inputData);
        if(mistakes.length > 0) {
            setMistakes(mistakes);
            return;
        }
        
        loginAdmin(inputData)
            .then(response => navigate("/"))
            .catch(error => setMistakes(error.message))

    }

    return <>
        <Navbar />
        <div className="container">
            <div style={{width: "500px", margin: "auto"}}> 
                <MistakesAlert mistakes = {mistakes} /> 
            </div>
            <div className="card" style={{width: "500px", margin: "auto"}}>
                <div className="card-header">
                    <p>Type the login info</p>
                </div>   
                <div className="form-group p-3 pb-0">
                    <label htmlFor="username">Type your username</label>
                    <input 
                        className="form-control" 
                        name="username"
                        onChange={handleInput}
                        value={inputData.username}
                        type="text"
                        placeholder="username"
                    />
                </div>
                <div className="form-group p-3">
                    <label htmlFor="password">Type your password</label>
                    <input 
                        className="form-control" 
                        name="password"
                        onChange={handleInput}
                        value={inputData.password}
                        type="password"
                        placeholder="password"
                    />
                </div>
                <div className="card-footer">
                    { 
                        loading ? 

                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="sr-only ps-1">Loading...</span>
                        </button>
                    :
                        <button
                            className="btn btn-primary"
                            onClick={loginUser}
                        >
                            Login
                        </button>
                    }
                </div>
            </div>
        </div>
    </>

}