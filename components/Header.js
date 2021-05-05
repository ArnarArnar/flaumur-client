import React, { useState, useEffect } from 'react';
//import { debounce } from '../utilities/helper';

export default function header() {
    // const [prevScrollPos, setPrevScrollPos] = useState(0);
    // const [visible, setVisible] = useState(true);

    // const handleScroll = debounce(() => {
    //     const currentScrollPos = window.pageYOffset;

    //     setVisible(
    //         (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) ||
    //             currentScrollPos < 10
    //     );

    //     setPrevScrollPos(currentScrollPos);
    // }, 50);

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);

    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, [prevScrollPos, visible, handleScroll]);

    return (
        <div className={`fixed text-center origin-top z-10 w-full h-8 shadow-lg bg-gray-600 `}>
            <span className="ml-2 text-xl font-semibold" style={{ color: '#ee831f' }}>
                Flaumur
            </span>
        </div>
    );
}
