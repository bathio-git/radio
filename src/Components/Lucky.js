import { useContext } from "react"
import { _data } from "../Context/Context"
import TextChanger from "../lib/depracated/TextChanger";
import shuffle from "../lib/shuffle";

export default function Lucky() {

    const context = useContext(_data);

    return context.sourceAudio ? (
            <TextChanger />
    ):(
        <button
            onClick={() => shuffle({context})}
            className="m-[1rem]"
        >
            fortune cookies
        </button>
    )
}