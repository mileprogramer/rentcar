import React, { useEffect, useState } from 'react';
import '../css/loader.css'

function Loader(props) {
    const [className, setClassName] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setClassName('loader');
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={className}></div>
    );
}

export default Loader;