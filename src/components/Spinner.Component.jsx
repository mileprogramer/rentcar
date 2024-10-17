
export default function HomePage({ color = "" }) {

    return (
        <div className={`spinner-border ${color !== "" ? "text-" + color : ""} `} role="status">
            <span className="sr-only"></span>
        </div>
    )

}
