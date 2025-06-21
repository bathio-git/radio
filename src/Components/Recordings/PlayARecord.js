import RecordInfos from "./RecordInfos";
import { useEffect, useState, useContext } from "react";
import PlayButton from "./PlayButton";
import XSign from "./XSign";
import { _data } from "@/Context/Context";

export default function PlayARecord({ record, onDelete, edits }) {

    const { getAudio }= useContext(_data);
    const [isPlaying, setIsPlaying] = useState(false);

    const stream = `${process.env.NEXT_PUBLIC_API_URL}/api/stream?id=${record._id}`;

    const audio = getAudio(stream);
    //console.log('stream', stream)
    const equal = () => (
        audio.src  === stream
    )

    useEffect(() => {
        
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