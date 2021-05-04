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

    return (
        <div
            className={`fixed origin-top z-10 w-full h-8 translate-y-0 transition transform duration-500 bg-gray-600 ${
                visible ? '' : '-translate-y-8'
            } `}>
            <span className="ml-2 text-xl font-semibold ">Flaumur</span>
        </div>
    );
}
