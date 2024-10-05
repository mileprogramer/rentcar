import "../css/modal-overlay.css";

function ModalOverlay({setActiveOverlay, bgColor = "rgba(221, 221, 221, 0.687)", setModalActive}) {

    const closeModal = (event) =>{
        setActiveOverlay(false);
        setModalActive(false);
    }
    
    return (
        <div
            id="overlay"
            onClick={closeModal}
            style={{backgroundColor: bgColor}}
        >
        </div>
    );
}

export default ModalOverlay;