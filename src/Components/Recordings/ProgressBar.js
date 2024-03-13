import { _data } from "../../Context/Context";
import convertDuration from "@/lib/convertDuration";
import { useEffect, useState, useContext } from "react";

export default function ProgressBar({ record, isPlaying, setSourceAudio, }) {

    const context = useContext(_data);
    const [progress, setProgress] = useState(0);

    useEffect(() => {

        if (!context.sourceAudio || !context.sourceAudio.duration) return;
        
        let audio = document.getElementById("audioSource");
        const duration = convertDuration(context.sourceAudio.duration);

        function handleTimeUpdate() {
            const x = (audio.currentTime / duration) * 100;
            setProgress(x);
        }

        audio.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
        }
    }, [context.sourceAudio]);

    return (
        <>
            <div
                className="relative my-3 mx-4 w-[50%] h-1 bg-[#aaa] rounded-md "  /* cursor-pointer */
            >
                <div
                    className="absolute left-0 top-0 h-full bg-[#333] "
                    style={{
                        width: `${progress}%`,
                    }}
                ></div>
            </div>
        </>
    );
}