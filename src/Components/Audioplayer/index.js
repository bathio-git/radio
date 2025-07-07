import { useContext, useEffect  } from "react";
import Player from "./Player"
import Volume from "./Volume"
import Next from "./Next";
import { _data } from "../../Context/Context"
import Spectro from "./Spectro";
import Record from "./Record";
import connectAudio from "../../lib/connectAudio";
import LoadingAnimation from "../Animations/LoadingAnimation";



export default function Audioplayer ({size}) {
    
    const context = useContext(_data);

    useEffect(() => {

        if (context.sourceAudio && !window.audioContext) {
            //console.log("User want to listen ", context.sourceAudio ,)
            const source = connectAudio(document.getElementById('audioSource'))
            source.connect(window.audioContext.destination)
            context.setSourceNode(source)
        }
    }, [])

    return(
        <>
            <div className="flex ml-0 lg:ml-[1rem] w-full h-[5rem]  justify-between">
                {/* <VolumeMobile /> */}
                <Record/>
                { context.loadingRadio === true
                    ? <LoadingAnimation />
                    :(<>
                        <Player />
                        <Volume />
                        <Next  />
                    </>)
                }
            </div>
            <Spectro size={size} />
            {/* {
                size && size.width > 640 && <Volume />
            } */}
        </>
    )
}