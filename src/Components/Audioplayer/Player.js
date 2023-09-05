import { useContext, useState, useEffect } from "react";
import { _data } from "../../Context/Context"
import RadioLink from "./RadioLink";
import PlayPause from "./PlayPause";

export default function Player(){

    const context = useContext(_data);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {

        if( document.getElementById('audioSource') === null ) return;
        let audio = document.getElementById('audioSource')
    
        function handlePlay() { setIsPlaying(true) }
        function handlePause() { setIsPlaying(false) }

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
        
    }, []);

    function playPaused () {

        let audio = document.getElementById('audioSource')
        isPlaying ? audio.pause() : audio.play()
    }
    
    return (
        <div className="flex zAudioPlayer" >
            <PlayPause 
                isPlaying={isPlaying} 
                playPaused={playPaused} 
                context={context}
            />
            <RadioLink context={context} />
        </div>
    )
}