import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined"

export default function PlayButton ({record, isPlaying, setSourceAudio, equal}){

    return (
        <div className="flex align-baseline ">
            <button
                onClick={() => {

                    let audio = document.getElementById("audioSource");

                    console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/stream?id=${record._id}`)

                    
                    if (audio.src === `${process.env.NEXT_PUBLIC_API_URL}/api/stream?id=${record._id}`) {
                        isPlaying ? audio.pause() : audio.play();
                    } else {
                        const x = {
                        name: record.text,
                        slogan: "",
                        stream: `${process.env.NEXT_PUBLIC_API_URL}/api/stream?id=${record._id}`,
                        radioUrl: "",
                        id: record._id,
                        duration: record.duration,
                        };
                        setSourceAudio(x);
                        audio.oncanplaythrough = () => {
                            audio.play();
                        };
                    }
                }}
            >
                <p>
                    {isPlaying ? (
                        <PauseCircleOutlineOutlinedIcon />
                    ) : (
                        <PlayCircleFilledWhiteOutlinedIcon />
                    )}
                    &nbsp;&nbsp;{record.text}
                </p>
            </button>
            &nbsp;&nbsp;{record.duration}
        </div>
    )
}