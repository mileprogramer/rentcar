
export default function Spinner({ color = "" }) {

    return (
        <div className={`spinner-border ${color !== "" ? "text-" + color : ""} `} role="status">
            <span className="sr-only"></span>
        </div>
    )

}
