import { useRef, useState } from "react";
import Search from "../components/Search.Component"
import Pagination from "../components/Pagination.Component"
import Navbar from "../components/Navbar.Component"
import EditUserModal from "../components/EditUserModal.Component";
import DefaultTable from "../components/DefaultTable.Component";
import Loader from "../components/Loader.Component";
import MistakesAlert from "../components/MistakesAlert.Component";
import useFetchUsers from "../hooks/useFetchUsers";

export default function EditUsers(){

    const [editModal, setEditModal] = useState(false);
    const userData = useRef({});
    
    const {
        data,
        isLoading,
        isError,
        error,
        searchUsers,
        changePage,
        setIsSearched,

    } = useFetchUsers();

    const users = data?.users;
    const paginationData = data?.paginationData

    const renderTableRow = (user) => {
        if(user){
            return <>
            <td>{user.card_id}</td>
            <td>{user.name}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>
                <button 
                    onClick={() => {openEditModal(user.card_id)}}
                    className="btn btn-warning">
                    Edit {user.name}
                </button>
            </td>
        </>
        }
    }

    const openEditModal = (editUserCardId) => {
        setEditModal(true);
        userData.current = users.find(user => user.card_id === editUserCardId);
    }

    const renderPageContent = () => {
        
        if(isError) {
            return <MistakesAlert mistakes={error} />
        }

        if(isLoading) {
            return <Loader />
        }
        
        return (
            <>
            <DefaultTable
                data = {users}
                columns={["Card id", "First and last name", "Phone", "Email", "Edit user"]}
                renderRow={renderTableRow}
                noDataMsg = "There is not data for the users"
            />
            <Pagination
                elementsPerPage={paginationData.elementsPerPage}
                totalElements={paginationData.totalElements}
                changePage={(page) => changePage(page)}
                currentPage={paginationData.currentPage}/>
            
            {
                editModal && <EditUserModal
                    setModalActive={(showOrHide) => setEditModal(showOrHide)}
                    userData = {userData.current} 
                />
            }
            </>
        )
    }

    
    
    return (
        <div>
            <div className="container postion-relative">
                <Navbar />
                <Search
                    setIsSearched = {setIsSearched}
                    getCarData = {searchUsers}
                    placeholder = {"Type user card id, personal data"}
                />
                { renderPageContent() } 
            </div> 
    
        </div>
    )

}