import React from 'react';

export default function Beta() {
    return (
        <div
            className={`fixed origin-top-left -ml-11 mt-16 transform   -rotate-45 z-20 w-36  shadow-md  `}
            style={{ backgroundColor: 'rgba(163, 163, 163, 0.6)' }}>
            <div className="ml-2 font-semibold text-center text-m" style={{ font: 'Roboto' }}>
                Beta
            </div>
            <div
                className="pb-1 ml-2 text-xs font-semibold text-center "
                style={{ font: 'Roboto' }}>
                Aðeins mobile UI
            </div>
        </div>
    );
}
