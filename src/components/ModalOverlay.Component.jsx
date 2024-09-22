import "../css/modal-overlay.css";

function ModalOverlay({setActiveOverlay, setModalRentCar}) {

    const closeModal = (event) =>{
        setActiveOverlay(false);
        setModalRentCar(false);
    }

    return (
        <div
            id="overlay"
            onClick={closeModal}
        >
        </div>
    );
}

export default ModalOverlay;