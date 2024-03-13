import { useContext, useEffect } from "react";
import Player from "./Player"
import Volume from "./Volume"
import Next from "./Next";
import { _data } from "../../Context/Context"
import Spectro from "./Spectro";
import Record from "./Record";

export default function Audioplayer ({size}) {
    
    const context = useContext(_data);

    function connectAudio(element) {

        console.log("I'm trying to connect", element , "to audioContext")

        if(window.audioContext){
            console.log(window.audioContext, 'already exists, reusing it')
        }

        if (element.isConnectedToNode) {
            console.log(element, 'already connected to audioContext')
            return element.sourceNode
        }
        

        if (!window.audioContext) {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('Just created ', window.audioContext)
        }
    
        if (!element.sourceNode) {
            element.sourceNode = window.audioContext.createMediaElementSource(element);
            element.sourceNode.connect(window.audioContext.destination);
            element.isConnectedToNode = true;
            console.log('Just connected audioContext to', element )
        } 

        return element.sourceNode
    }
    
    useEffect(() => {

        if (context.sourceAudio && !window.audioContext) {
            console.log("User want to listen ", context.sourceAudio ,)
            const source = connectAudio(document.getElementById('audioSource'))
            source.connect(window.audioContext.destination)
            context.setSourceNode(source)
        }
    }, [])

    return(
        <>
            <div className="flex ml-0 lg:ml-[1rem] w-full justify-between">
                {/* <VolumeMobile /> */}
                <Record />
                <Player />
                <Next context={context}/>
            </div>
            <Spectro size={size} />
            {
                size && size.width > 640 && <Volume />
            }
        </>
    )
}