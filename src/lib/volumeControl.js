function volumeDown ( setVolume ) { 
        
    let audio = document.getElementById("audioSource")
    audio.volume > 0 ? audio.volume = audio.volume/1.5 : null
    setVolume(audio.volume)
}

function volumeUp (setVolume) {

    let audio = document.getElementById("audioSource");
    
    if (audio.volume < 1) {
        audio.volume*1.5 <1 ? audio.volume = audio.volume*1.5 : audio.volume = 1
        setVolume(audio.volume)
    }
}

export { volumeDown , volumeUp }