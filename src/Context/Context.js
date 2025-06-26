import { createContext, useState, useEffect, useRef } from "react";
import radios from "./Radios.js";
import AudioTag from "./AudioTag.js";

export const _data = createContext(null);

export default function Context({ children }) {

    const [sourceAudio, setSourceAudio] = useState(null);
    const [sourceNode, setSourceNode] = useState(null);
    const [mixes, setMixes] = useState(null);
    const [burgerContent, setBurgerContent] = useState('streams');
    const [burgerUser, setBurgerUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [showMenu, setMenu] = useState(false);
    const [showRadioList, setRadioList] = useState(true);
    const [loadingRadio, setLoadingRadio] = useState(null) 
    const [isPlaying, setIsPlaying] = useState(false);
    const [fetchRecords, setFetchRecords ] = useState(0) 
    const [uploadedImage, setUploadedImage] = useState(null);
    const [previousMetadata, setPreviousMetadata] = useState(null);
    const [userRecords, setUserRecords] = useState(null);
    const [allRecords, setAllRecords] = useState(null);
    const [previousFetchRecords, setPreviousFetchRecords] = useState(null);

    function getAudio() {
         return typeof window !== "undefined" 
        ? document.getElementById("audioSource") 
        : null
    }

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
        loadingRadio, setLoadingRadio,
        isPlaying, setIsPlaying,
        fetchRecords, setFetchRecords,
        getAudio,
        uploadedImage, setUploadedImage,
        previousMetadata, setPreviousMetadata,
        userRecords, setUserRecords,
        allRecords, setAllRecords,
        previousFetchRecords, setPreviousFetchRecords
    }}> 
        <AudioTag sourceAudio={sourceAudio} />
        {children}
    </_data.Provider>
    );
}