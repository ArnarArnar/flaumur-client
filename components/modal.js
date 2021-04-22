import React, { forwardRef, useImperativeHandle, useCallback, useEffect } from 'react';
import ReactDom from 'react-dom';

export function Modal(props, ref) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [fade, setFade] = React.useState('IN');

    const close = useCallback(() => setIsOpen(false), []);

    useImperativeHandle(
        ref,
        () => ({
            openModal: () => setIsOpen(true),
            close: () => setIsOpen(false)
        }),
        [close]
    );

    const fadeOutAndClose = () => {
        setFade('OUT');
        setTimeout(() => (close(), setFade('IN')), 200);
    };

    const handleEscape = useCallback(
        (event) => {
            if (event.keyCode === 27) close();
        },
        [close]
    );

    useEffect(() => {
        if (isOpen) document.addEventListener('keydown', handleEscape, false);
        return () => {
            document.removeEventListener('keydown', handleEscape, false);
        };
    }, [handleEscape, isOpen]);

    if (!isOpen) return null;

    return ReactDom.createPortal(
        <>
            <div className={fade == 'IN' ? 'fade-in-fast' : 'fade-out-fast'}>
                <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
                <div
                    onClick={fadeOutAndClose}
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-10/12 max-w-sm mx-auto my-6">
                        <div className="relative flex flex-col w-full bg-gray-700 border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                            <div className="w-auto">{props.children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    );
}

export default forwardRef(Modal);
