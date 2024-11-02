import { useDispatch, useSelector } from "react-redux"
import { saveUsers, selectCurrentPage, selectPaginationData, selectUsers, setCurrentPage, setPaginationData } from "../redux/user.slicer"
import { useEffect, useRef, useState } from "react";
import Search from "../components/Search.Component"
import Pagination from "../components/Pagination.Component"
import Navbar from "../components/Navbar.Component"
import userService from "../services/userService";
import EditUserModal from "../components/EditUserModal.Component";
import DefaultTable from "../components/DefaultTable.Component";

export default function EditUsers(){

    const currentPageOfUsers = useSelector((state) => selectCurrentPage(state));
    const users = useSelector((state)=> selectUsers(state));
    const paginationData = useSelector((state) => selectPaginationData(state, currentPageOfUsers));
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(true);
    const [editModal, setEditModal] = useState(false);
    const [isSearhed, setIsSearched] = useState(false);
    const userData = useRef({});
    const dispatch = useDispatch();

    useEffect(()=>{
        getUsers(currentPageOfUsers)
    }, [currentPageOfUsers])
    
    useEffect(()=>{
        if(isSearhed === false){
            getUsers();
        }
    }, [isSearhed])

    const renderTableRow = (user) => {
        if(user){
            return <>
            <td>{user.card_id}</td>
            <td>{user.name}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>
                <button 
                    onClick={(event) => {openEditModal(user.card_id)}}
                    className="btn btn-warning">
                    Edit {user.name}
                </button>
            </td>
        </>
        }
    }

    function search(searchTerm){
        setIsSearched(true)
        userService.search(searchTerm)
            .then(data => {
                setLoader(false);
                dispatch(setCurrentPage({page : data.paginationData.currentPage}))
                dispatch(setPaginationData({paginationData: data.paginationData}))
                dispatch(saveUsers({users : data.users}));
            })
            .catch(error => setErrors(error))
    }

    function getUsers(page){
        userService.getUsers(page)
            .then(data => {
                setLoader(false);
                dispatch(setCurrentPage({page : data.paginationData.currentPage}))
                dispatch(setPaginationData({paginationData: data.paginationData}))
                dispatch(saveUsers({users : data.users}));
            })
            .catch(error => setErrors(error))
    }

    const openEditModal = (editUserCardId) => {
        setEditModal(true);
        userData.current = users.find(user => user.card_id === editUserCardId);
    }
    
    return (
        <div>
            <div className="container postion-relative">
                <Navbar /> 
                <Search
                    setIsSearched = {setIsSearched}
                    getCarData = {search}
                    setLoader = {setLoader} 
                    placeholder = {"Type user card id, personal data"}
                />
                <DefaultTable
                    data = {users}
                    columns={["Card id", "First and last name", "Phone", "Email", "Edit user"]}
                    renderRow={renderTableRow}
                    noDataMsg = "There is not data for the users"
                />
                {users?.length > 0 ?
                <Pagination
                    elementsPerPage={paginationData.elementsPerPage}
                    totalElements={paginationData.totalElements}
                    changePage={(page) => dispatch(setCurrentPage({page}))}
                    currentPage={currentPageOfUsers}/> : ""}
                
                {
                    editModal && <EditUserModal
                        setModalActive={(showOrHide) => setEditModal(showOrHide)}
                        userData = {userData.current} 
                    />
                }
            </div> 
    
        </div>
    )

}