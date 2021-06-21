import React from 'react';
import { useDispatch } from 'react-redux';

import { setLimit } from '../store/slices/querySlice';

export default function Header() {
    const dispatch = useDispatch();
    return (
        <div
            className={`fixed flex justify-center text-center origin-top z-10 w-full h-8 shadow-lg bg-gray-600 `}
            // Hack to get new data from the server. Apollo makes a new req whenever the query object changes
            onClick={() => dispatch(setLimit(1))}>
            {/* <button className="ml-2 text-xl font-semibold text-rss hover:text-yellow-500">
                Flaumur
            </button> */}
            <source src="/flaumur_txt.svg" type="image/svg+xml" />
            <img className="h-7 " alt="Flaumur" src="/flaumur_txt.svg" />
        </div>
    );
}
