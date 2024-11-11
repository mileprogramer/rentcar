import React, { useEffect, useState } from 'react';
import '../css/loader.css'

function Loader({ addDelay = true, onCenter }) {
    const [className, setClassName] = useState('');

    useEffect(() => {

        if(!addDelay) {
            return;
        }

        const timer = setTimeout(() => {
            setClassName('loader');
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const renderClasses = () => {
        let classToOutput = "";

        if(addDelay) {
            classToOutput += " " + className;
        }
        else if(addDelay === false) {
            classToOutput += " loader"
        }

        if(onCenter) {
            classToOutput += " loader-center"
        }

        return classToOutput;
    }

    return (
        <div className={renderClasses()}></div>
    );
}

export default Loader;