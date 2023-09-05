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

            let x = audio.volume > 0.9 ? ' ' : '>'
            setShowUp(x)
        }
    }, [volume])
    //
    return (
        <div className="  mr-[0px] fixed right-0 top-0 h-[100vh] flex flex-col align-middle justify-between  zVolume ">
            <button
                className=" transparent h-[45vh]   "
                onClick={
                    ()=> volumeUp(setVolume)
                }
                id="volumeUp"
            >
                {showUp}
            </button>

            <p className=" text-[1.25rem] flex justify-center text-[#AAA]  w-[350px] transparent" >
                {volumeText}
            </p>
            <button
                id="volumeDown"
                className="mb-8  h-[45vh] transparent"
                onClick={
                    ()=> volumeDown(setVolume)
                }
            >
                {'<'}
            </button>
        </div>
    )
}