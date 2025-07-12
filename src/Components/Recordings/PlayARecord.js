import RecordInfos from "./RecordInfos";
import { useEffect, useState, useContext } from "react";
import PlayButton from "./PlayButton";
import XSign from "./XSign";
import { _data } from "@/Context/Context";
import playAudioStream from "@/lib/playAudioStream";

export default function PlayARecord({ record, onDelete, edits, nextRecord }) {

    const context = useContext(_data);
    const [isPlaying, setIsPlaying] = useState(false);

    const stream = `${process.env.NEXT_PUBLIC_API_URL}/api/stream?id=${record._id}`;

    const audio = context.getAudio(stream);
    const equal = () => ( audio.src  === stream )

    useEffect(() => {
        
        equal() && audio.play ? setIsPlaying(true) : setIsPlaying(false);

        function handlePlay() {
            equal() ? setIsPlaying(true) : null;
        }
        function handlePause() {
            equal() ? setIsPlaying(false) : null;
        };
        function handleEnded() {
            equal() ?( 
                setIsPlaying(false), 
                playAudioStream(nextRecord, context, isPlaying)
            ): null; 
        }
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("ended", handleEnded);
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