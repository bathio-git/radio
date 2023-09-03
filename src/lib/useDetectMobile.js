import { useEffect, useState } from 'react'
  
export default function useDetectMobile() {

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        if( typeof window === 'undefined' ) return;
        const userAgent = window.navigator.userAgent;
        setIsMobile(Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)));
    }, []);

    return isMobile;
}