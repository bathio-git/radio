import { useContext, useState, useEffect } from "react";
import { _data } from "../../Context/Context"
import RadioLink from "./RadioLink";
import PlayPause from "./PlayPause";

export default function Player(){

    const context = useContext(_data);
    const audio = context.getAudio();
    const [isPlaying, setIsPlaying] = useState(() => {
        audio ? !audio.paused && !audio.ended : false;
    });

    useEffect(() => {

        if (!audio) return;

        function updatePlayingStatus() {
            setIsPlaying(!audio.paused && !audio.ended);
        }

        audio.addEventListener('play', updatePlayingStatus);
        audio.addEventListener('pause', updatePlayingStatus);
        audio.addEventListener('ended', updatePlayingStatus);

        // Set initial state in case it changed
        updatePlayingStatus();

        return () => {
            audio.removeEventListener('play', updatePlayingStatus);
            audio.removeEventListener('pause', updatePlayingStatus);
            audio.removeEventListener('ended', updatePlayingStatus);
        };
    }, [context.sourceAudio]); // re-run when source changes

    function playPaused () {
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