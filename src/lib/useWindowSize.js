import { useEffect, useState } from 'react'

export default function useWindowSize() {
    const [size, setSize] = useState({
        width: typeof window !== 'undefined'  ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    useEffect(() => {
        function updateSize() {
        setSize({ width: window.innerWidth, height: window.innerHeight });
        }

        if (typeof window !== 'undefined' && window !== null) {
        window.addEventListener('resize', updateSize);
        updateSize();
        }

        return () => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', updateSize);
        }
        };
    }, []);

    return size;
}