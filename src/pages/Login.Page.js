import { useState } from "react";
import Navbar from "../components/Navbar.Component"
import { HandleInput } from "../helpers/functions"
import MistakesAlert from "../components/MistakesAlert.Component"
import FormValidation from "../services/FormValidation";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const initialInputData = {
        username: "adminMile",
        password: "adminMile",
    };
    const [inputData, setInputData] = useState(initialInputData);
    const handleInput = new HandleInput(setInputData, inputData);
    const [submitingForm, setSubmitingForm] = useState(false);

    const [mistakes, setMistakes] = useState([]);
    const navigate = useNavigate();

    const loginUser = async () => {
        const mistakes = FormValidation.validateInputFields(inputData);
        if(mistakes.length > 0) {
            setMistakes(mistakes);
            return;
        }

        try {
            setSubmitingForm(true);
            await userService.getCookies();
            await userService.loginAdmin(inputData);
            setSubmitingForm(false)
            navigate("/");
        }
        catch (error) {
            if (error?.message) {
                setMistakes(() => error.message)
            }
            setSubmitingForm(false);
        }
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
                        submitingForm ? 

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