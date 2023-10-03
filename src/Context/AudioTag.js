export default function AudioTag({sourceAudio}) {

    return (
        <div className="hidden">
            <audio 
                id='audioSource'
                crossOrigin="anonymous"
                src={ sourceAudio ? sourceAudio.stream : ''}
            />
        </div>
    )
}
