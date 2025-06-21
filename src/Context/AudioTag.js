export default function AudioTag({sourceAudio}) {

    const silentMp3 = "data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAAWGluZwAAAA8AAAACAAACcQCA";

    return (
        <div className="hidden">
            <audio 
                id='audioSource'
                crossOrigin="anonymous"
                src={sourceAudio ? sourceAudio.stream : silentMp3}
            />
        </div>
    )
}
