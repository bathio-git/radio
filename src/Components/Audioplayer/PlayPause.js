import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';

export default function PlayPause({isPlaying, playPaused, context}) {


    return (
        <button 
            onClick={playPaused}
            className="flex items-center text-white"
        >
                {isPlaying ? (
                    <PauseCircleOutlineOutlinedIcon />
                ) : (
                    <PlayCircleFilledWhiteOutlinedIcon />
                )}
                <div className='flex items-center '>
                    &nbsp;{context.sourceAudio.name}
                </div>
        </button>
    )
}