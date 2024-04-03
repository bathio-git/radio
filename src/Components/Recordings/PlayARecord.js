import RecordInfos from "./RecordInfos";
import { _data } from "@/Context/Context";
import { useEffect, useState, useContext } from "react";
import PlayButton from "./PlayButton";
import XSign from "./XSign";

export default function PlayARecord({ record, onDelete, edits }) {

    const { sourceAudio, setSourceAudio } = useContext(_data)
    const [isPlaying, setIsPlaying] = useState(false);

    const stream = `${process.env.NEXT_PUBLIC_API_URL}/api/stream?id=${record._id}`;

    console.log('stream', stream)
    
    const audioTag = document.getElementById("audioSource");
    const equal = () => (
        audioTag.src  === stream
    )

    useEffect(() => {
        
        let audio = document.getElementById("audioSource");

        equal() && audio.play ? setIsPlaying(true) : setIsPlaying(false);

        function handlePlay() {
            equal() ? setIsPlaying(true) : null;
        }
        function handlePause() {
            equal() ? setIsPlaying(false) : null;
        };

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        equal() ? audio.addEventListener("ended", () => setIsPlaying(false)) : null;

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            equal() ? audio.removeEventListener("ended", () => setIsPlaying(false)) : null;
        };
    }, []);

    return (
        <>
            <PlayButton 
                record={record}
                isPlaying={isPlaying}
                setSourceAudio={setSourceAudio}
                equal={equal}
                edits={edits}
            />
            <RecordInfos 
                record={record} 
                equal={equal}
            />
            {edits && 
                <XSign mixId={record._id} onDelete={() => onDelete(record._id)} />
            }
        </>
    );
}