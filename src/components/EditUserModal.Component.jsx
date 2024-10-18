import { useState } from "react";
import ModalOverlay from "./ModalOverlay.Component";
import "../css/modal.css"
import FormValidation from "../services/FormValidation";
import { HandleInput } from "../helpers/functions";
import userService from "../services/userService";
import MistakesAlert from "./MistakesAlert.Component";
import { useDispatch } from "react-redux";
import { setEditUser } from "../redux/user.slicer";

export default function EditUserModal({userData, setModalActive}){

    const [activeOverlay, setActiveOverlay] = useState(false);
    const [inputData, setInputData] = useState({
        id: userData.id,
        name: userData.name,
        cardId: userData.card_id,
        phone: userData.phone,
        email: userData.email,
    });
    const [errors, setErrors] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");
    const handleInput = new HandleInput(setInputData, inputData);
    const dispatch = useDispatch();

    const editUser = (event) => {
        let mistakes = FormValidation.validateInputFields(inputData);
        if(mistakes.length > 0){
            setErrors(mistakes);
            event.target.disabled = true;
            return;
        }
        let data = {...inputData};
        data.card_id = inputData.cardId;
        delete data.cardId;

        // api request
        userService.edit(data)
            .then((response) => {
                setSuccessMsg(response.data.message);
                event.target.disabled = false;
                dispatch(setEditUser({userData : data}));
                setTimeout(() => setSuccessMsg(""), 2000);
            })
            .catch(error => setErrors(error))
    }
    
    return (
        <>
            <ModalOverlay setActiveOverlay={setActiveOverlay} setModalActive={setModalActive} />
            
            <div className="card edit-user">
                {successMsg !== "" ? <div className="alert alert-success">
                    {successMsg}
                </div>: null }
                <MistakesAlert mistakes = {errors} />
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <td>Card id</td>
                            <td>First and last name</td>
                            <td>Phone</td>
                            <td>Email</td> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input 
                                    className="form-control"
                                    type="text" 
                                    name="cardId" 
                                    value={inputData.cardId} 
                                    onChange={handleInput.handle}
                                />
                            </td>
                            <td>
                                <input 
                                    className="form-control"
                                    type="text" 
                                    name="name" 
                                    value={inputData.name} 
                                    onChange={handleInput.handle}
                                />
                            </td>
                            <td>
                                <input 
                                    className="form-control"
                                    type="text" 
                                    name="phone" 
                                    value={inputData.phone} 
                                    onChange={handleInput.handle}
                                />
                            </td>
                            <td>
                                <input 
                                    className="form-control"
                                    type="email" 
                                    name="email" 
                                    value={inputData.email} 
                                    onChange={handleInput.handle}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="card-footer d-flex justify-content-between">
                    <button 
                        onClick={() => setModalActive(false)}
                        className="btn btn-outline-primary">
                        Close
                    </button>
                    <button 
                        onClick={(event) => editUser(event)}
                        className="btn btn-primary">
                        Edit user
                    </button>
                </div>
            </div>
        </>
    )

}