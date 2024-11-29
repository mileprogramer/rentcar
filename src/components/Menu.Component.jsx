import "../css/navigation-items.css";
import NavigationItems from "./NavigationItems.Component";
import "../css/menu.css";
import MobileMenu from "./MobileMenu.Component";

export default function Menu() {

    return (
        <>
            <ul id="desktop-menu" className="navbar-nav">
                <NavigationItems />
            </ul>
            <MobileMenu />
        </>
    );
    
}