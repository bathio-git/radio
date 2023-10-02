export default function AudioTag({sourceAudio}) {

    return (
        <div className="hidden">
            <audio 
                audioautobuffer="autobuffer"
                id='audioSource'
                crossOrigin="anonymous"
                src={ sourceAudio ? sourceAudio.stream : ''}
            />
        </div>
    )
}
