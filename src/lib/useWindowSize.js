import { useEffect, useState } from 'react';

export default function useWindowSize() {

    const isClient = typeof window === 'object';

    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (!isClient) {
        return;
        }

        function updateSize() {
        setSize({ width: window.innerWidth, height: window.innerHeight });
        }

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => {
        window.removeEventListener('resize', updateSize);
        };
    }, [isClient]);

    return size;
}