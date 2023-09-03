import { useContext, useEffect } from "react";
import Player from "./Player"
import Volume from "./Volume"
import VolumeMobile from "./VolumeMobile.js"
import Next from "./Next";
import { _data } from "../../Context/Context"
import Spectro from "./Spectro";
import Record from "./Record";

export default function Audioplayer () {
    
    const context = useContext(_data);

    function connectAudio(element) {

        if (!window.audioContext) {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    
        if (!element.sourceNode) {
            element.sourceNode = window.audioContext.createMediaElementSource(element);
            element.sourceNode.connect(window.audioContext.destination);
            element.isConnectedToNode = true;
        } 
        return element.sourceNode
    }
    
    useEffect(() => {

        if (context.sourceAudio) {
            const source = connectAudio(document.getElementById('audioSource'))
            source.connect(window.audioContext.destination)
            context.setSourceNode(source)
        }
    }, [])
    //flex ml-[1rem] w-full justify-between
    return(
        <>
            <div className="flex ml-0 lg:ml-[1rem] w-full justify-between">
                <VolumeMobile />
                <Record />
                <Player />
                <Next context={context}/>
                {/* <Volume /> */}
                <Spectro />
            </div>
        </>
    )
}