import { createContext, useState, useEffect } from "react";
import radios from "./Radios.js";

export const _data = createContext(null);

export default function Context({ children }) {

    const [ sourceAudio, setSourceAudio ] = useState(null)
    const [ sourceNode, setSourceNode ] = useState(null)
    const [ mixes, setMixes ] = useState(null)
    const [burgerContent, setBurgerContent] = useState('streams')
    const [burgerUser, setBurgerUser] = useState(null)
    const [currentUser, setCurrentUser] = useState(null);
    const [showMenu, setMenu] = useState(false);
    const [showRadioList, setRadioList] = useState(true);

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
        mixes, setMixes,
        showMenu, setMenu,
        burgerContent, setBurgerContent,
        burgerUser, setBurgerUser,
        showRadioList, setRadioList,
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