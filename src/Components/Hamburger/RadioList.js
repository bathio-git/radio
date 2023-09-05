import { useContext, useEffect, useState} from "react"
import { _data } from "../../Context/Context"
import { v4 } from "uuid";

export default function RadioList() {

    const context = useContext(_data);
    const [ radios, setRadios ] = useState(null)

    useEffect(() => {
        setRadios(context.radios)
    }, [context.radios])

    return (
        <>
            {radios &&
                radios.map((radio) =>
                    <p className="m-[0.75rem] text-[1.5rem]" key={v4()}>
                        {
                            context.sourceAudio === radio
                            ? <>ø&nbsp;</>
                            : <>&nbsp;&nbsp;</>
                        }
                        <button
                            onClick={() => {
                                let audio = document.getElementById('audioSource')
                                if (context.sourceAudio === radio && !audio.paused) {
                                    audio.pause()
                                }
                                else{
                                    context.setSourceAudio(radio)
                                    setTimeout(() => {
                                        audio.play()
                                    }, 1000)
                                }
                            }}
                        >
                            {radio.name}
                        </button>
                    </p>
                )
            }
        </>
    )
}