import { useState } from "react";
import NavigationItems from "./NavigationItems.Component";

function MobileMenu(){

    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    return (
        <>
        {
            openMobileMenu ?
            <ul id="mobile-menu" className="mobile-navbar navbar-nav">
                <svg
                    onClick={() => setOpenMobileMenu(false)} 
                    xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" id="close-mobile-menu" className="bi bi-x-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
                <NavigationItems />
            </ul>
            : 
            <svg 
                onClick={() => setOpenMobileMenu(true)}
                xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" id="open-mobile-menu" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
        }
        </>
        
    )

}

export default MobileMenu;