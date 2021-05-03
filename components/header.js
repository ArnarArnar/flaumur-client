import React, { useState, useEffect } from 'react';
import { debounce } from '../utilities/helper';

export default function header() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;

        setVisible(
            (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) ||
                currentScrollPos < 10
        );

        setPrevScrollPos(currentScrollPos);
    }, 50);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible, handleScroll]);

    const navbarStyles = {
        position: 'fixed',
        height: '60px',
        width: '100%',
        backgroundColor: 'grey',
        textAlign: 'center',
        transition: 'top 0.6s'
    };

    return (
        // <nav className="flex flex-wrap items-center justify-between bg-gray-600">
        //<div style={{ ...navbarStyles, top: visible ? '0' : '-60px' }}>
        <div
            className={`fixed origin-top z-10 w-full h-8 translate-y-0 transition transform duration-500 bg-gray-600 ${
                visible ? '' : '-translate-y-8'
            } `}>
            {/* <div className="flex items-center mr-6 text-white flex-no-shrink">
                <svg
                    className="w-8 h-8 ml-2 mr-2"
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
                </svg> */}
            <span className="ml-2 text-xl font-semibold ">Flaumur</span>
            {/* </div> */}
        </div>
    );
}
