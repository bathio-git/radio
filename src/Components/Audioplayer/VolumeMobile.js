import { useEffect, useState, useContext } from "react"
import { _data } from "../../Context/Context"
import { volumeDown, volumeUp } from "../../lib/volumeControl"

export default function Volume () {

    const context = useContext(_data)
    const [ volume , setVolume ] = useState(null)
    const [ volumeText , setVolumeText ] = useState(<>&nbsp;</>)
    const [ showUp , setShowUp ] = useState(' ')

    useEffect(() => {
        if ( document.getElementById("audioSource") ) {
            let audio = document.getElementById("audioSource")
            setVolumeText(audio.volume.toString().substring(0,4))

            let x = audio.volume > 0.9 ? <p>&nbsp;</p>: <p>&#9650;</p>
            setShowUp(x)
        }
    }, [volume])
    //bg-[#00000080]
    return (
        <div className="relative flex flex-col justify-center z-20 h-32">
            <button
                className=" w-[5ch]"
                onClick={
                    ()=> volumeUp(setVolume)
                }
                id="volumeUp"
            >
                {showUp}
            </button>

            <p className=" text-[1.25rem] flex justify-center transparent" >
                {volumeText}
            </p>
            <button
                id="volumeDown"
                className="transparent"
                onClick={
                    ()=> volumeDown(setVolume)
                }
            >
                &#9660;
            </button>
        </div>
    )
}
/* 

<div>
                    <button id="volumeUp"> 
                        &#9650;
                    </button>
                
                    <p id="volume" style="width: 5ch;"> 
                        &nbsp;
                    </p>
                    
                    <button 
                        id="uniqueid"
                        style="background-color: rgba(0, 0, 0, 0);"
                        > &#9660;
                    </button>   
                </div> */