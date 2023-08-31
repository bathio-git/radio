import { createContext, useState, useRef, useEffect } from "react";
import radios from "./Radios.js";

export const _data = createContext(null);

export default function Context({ children }) {

    const audioElementRef = useRef(null);
    const [ sourceAudio, setSourceAudio ] = useState(null)
    const [ sourceNode, setSourceNode ] = useState(null)
    const [ mixes, setMixes ] = useState(null)

    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser !==null && storedUser !== undefined ) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);
    
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [currentUser]);



    return (
    <_data.Provider value={{ radios,
        currentUser, setCurrentUser,
        sourceAudio, setSourceAudio,
        sourceNode, setSourceNode,
        mixes, setMixes
    }}>
        <audio 
            audioautobuffer="autobuffer"
            id='audioSource'
            crossOrigin="anonymous"
            src={ sourceAudio ? sourceAudio.stream : ''}
        />
        {children}
    </_data.Provider>
    );
}