import React, { createElement } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import ModalImage from 'react-modal-image';
import { animated, config, useSpring } from 'react-spring';

export function useHeight({ on = true /* no value means on */ } = {}) {
    const ref = useRef();
    const [height, set] = useState(0);
    const heightRef = useRef(height);
    const [ro] = useState(
        () =>
            new ResizeObserver((packet) => {
                if (ref.current && heightRef.current !== ref.current.offsetHeight) {
                    heightRef.current = ref.current.offsetHeight;
                    set(ref.current.offsetHeight);
                }
            })
    );
    useLayoutEffect(() => {
        if (on && ref.current) {
            set(ref.current.offsetHeight);
            ro.observe(ref.current, {});
        }
        return () => ro.disconnect();
    }, [on, ref.current]);
    return [ref, height];
}

export default function ShowMoreAnimated({ article, showContent }) {
    const [heightRef, height] = useHeight();

    const slideInStyles = useSpring({
        config: { ...config.default },
        from: { opacity: 0, height: 0 },
        to: {
            opacity: showContent ? 1 : 0,
            height: showContent ? height : 0
        }
    });

    return (
        <animated.div style={{ ...slideInStyles, overflow: 'hidden' }}>
            <div
                ref={heightRef}
                className="mb-1 text-base font-light leading-5 text-gray-400 overflow-ellipsis">
                {article.image ? (
                    <div id="imageContainer" className="float-right h-full ml-2 md:hidden">
                        <div className="relative pb-32 pr-32 overflow-hidden rounded">
                            <ModalImage
                                className="absolute object-cover w-full h-full border border-gray-700 border-solid"
                                small={article.image}
                                medium={article.image}
                                large={article.image}
                                // TODO: Add image description when possible
                                // alt="Hello World!"
                            />
                        </div>
                    </div>
                ) : null}
                {article.description}
            </div>
        </animated.div>
    );
}
