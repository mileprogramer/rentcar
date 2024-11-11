import Loader from "./Loader.Component";

export default function AppLoading() {
    return (
        <div className="d-flex justify-content-center align-center" style={{height: "100vh"}}>
            <Loader addDelay = {false} onCenter={true} />
        </div>
    );
}