import { useEffect, useState } from "react";

export default function MistakesAlert({ mistakes }){

    const [outputArray, setOutputArray] = useState([]);
    const [showOutput, setShowOutput] = useState(false);
    
    useEffect(() => {
        if (mistakes instanceof Array && mistakes.length > 0) {
            setOutputArray(mistakes);
            setShowOutput(true);
        } else if (typeof mistakes === "string") {
            setOutputArray([mistakes]);
            setShowOutput(true);
        } else {
            setShowOutput(false);
        }
    }, [mistakes]);

    return (
        <>
            {showOutput && (
                <div className="alert alert-danger" role="alert">
                    {outputArray.map((error, index) => (
                        <div key={index}>{error.message || error}</div>
                    ))}
                </div>
            )}
        </>
    );

}