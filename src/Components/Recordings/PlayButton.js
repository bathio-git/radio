import { useState, useContext } from "react";
import EditNote from "./EditNote";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined"
import { _data } from "@/Context/Context";
import playAudioStream from "@/lib/playAudioStream";


export default function PlayButton ({record, isPlaying, edits}){

    const [title, setTitle] = useState(record.text)
    const [edit, setEdit] = useState(false)
    const context = useContext(_data);

    return (
        <div className="flex w-2/3">
            { edit === false && 
                <button
                    className="w-[105%] text-left flex"
                    onClick={()=>playAudioStream(record, context, isPlaying)}
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
                        className="textInput2 w-[105%]"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </>
            }
            { edits && 
                <EditNote edit={edit} setEdit={setEdit} title={title} id={record._id} />
            }
        </div>
    )
}