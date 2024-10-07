import React, { useEffect, useState } from 'react';
import '../css/loader.css'

function Loader(props) {
    const [className, setClassName] = useState('');

    useEffect(() => {
        // Set the class "loader" after 500ms
        const timer = setTimeout(() => {
            setClassName('loader');
        }, 500);

        // Clean up the timeout if the component unmounts
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={className}></div> // Use the className state for the class
    );
}

export default Loader;