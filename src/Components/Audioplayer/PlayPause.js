import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';

export default function PlayPause({isPlaying, playPaused, context}) {
    return (
        <button 
            onClick={playPaused}>
                {isPlaying ? (
                    <PauseCircleOutlineOutlinedIcon />
                ) : (
                    <PlayCircleFilledWhiteOutlinedIcon />
                )}
                &nbsp;{context.sourceAudio.name}
        </button>
    )
}