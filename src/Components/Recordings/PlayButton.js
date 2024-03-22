import { useState } from "react";
import EditNote from "./EditNote";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined"

export default function PlayButton ({record, isPlaying, setSourceAudio, edits }){

    const [title, setTitle] = useState(record.text)
    const [edit, setEdit] = useState(false)

    return (
        <div className="flex w-2/3">
            { edit === false && 
                <button
                    className="w-[105%] text-left flex"
                    onClick={() => {

                        let audio = document.getElementById("audioSource");
                        
                        //console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/stream?id=${record._id}`)
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
                            user: record.username,
                            };
                            setSourceAudio(x);
                            audio.oncanplaythrough = () => {
                                audio.play();
                                //console.log(x.stream)
                            };
                        }
                    }}
                >
                        {isPlaying ? (
                            <PauseCircleOutlineOutlinedIcon  />
                        ) : (
                            <PlayCircleFilledWhiteOutlinedIcon />
                        )}
                        &nbsp;{ title }
                        &nbsp;&nbsp;{record.duration}
                </button>
            }
            {
                edit &&
                <>
                    <input 
                        type="text" 
                        value={title}
                        className="textInput w-[105%]"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </>
            }
            { edits && 
                <EditNote edit={edit} setEdit={setEdit} title={title} id={record._id}/>
            }
        </div>
    )
}