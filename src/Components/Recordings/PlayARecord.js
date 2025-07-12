import RecordInfos from "./RecordInfos";
import { useEffect, useState, useContext, useCallback } from "react";
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

    const handleEnded = useCallback(() => {
        if (audio.src === stream) {
            setIsPlaying(false);
            playAudioStream(nextRecord, context, false);
        }
    }, [stream, nextRecord, context]);

    useEffect(() => {
    const audio = context.getAudio(stream);
    
    // Only add the ended listener with callback
    audio.addEventListener("ended", handleEnded);
    
    return () => {
        audio.removeEventListener("ended", handleEnded);
    };
    }, [handleEnded]);

    // Separate effect for play/pause listeners
    useEffect(() => {
    const audio = context.getAudio(stream);
    
    function handlePlay() {
        if (audio.src === stream) setIsPlaying(true);
    }
    
    function handlePause() {
        if (audio.src === stream) setIsPlaying(false);
    }

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    
    return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
    };
    }, [stream]);

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