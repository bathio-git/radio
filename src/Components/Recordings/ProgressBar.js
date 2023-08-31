import { useEffect, useState, useContext } from "react";
import axios from 'axios'; // Make sure to install this package if you haven't
import { _data } from "../../Context/Context";
import convertDuration from "@/lib/convertDuration";

export default function ProgressBar({ record, isPlaying, setSourceAudio, }) {

    const context = useContext(_data);
    const [progress, setProgress] = useState(0);

    useEffect(() => {

        if (!context.sourceAudio) return;

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
                /* onClick={handleClick} */
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






/* async function handleClick (e) {

        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const t = Math.floor((x / width) * 100);
        console.log(t)
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/skip?id=${record._id}&t=${t}`;
        console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/stream?id=${record._id}`)
        try {
            let audio = document.getElementById("audioSource");
            console.log(url)
            const x = {
                name: record.text,
                slogan: "",
                stream: url,
                radioUrl: "",
                id: record._id,
                duration: record.duration,
            };

            setSourceAudio(x);
            audio.oncanplaythrough = () => {
                audio.play();
            };
        } catch (error) {
            console.error('Failed to fetch audio:', error);
        }
    }; */