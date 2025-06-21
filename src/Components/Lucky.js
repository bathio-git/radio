import { useContext } from "react"
import { _data } from "../Context/Context"
import shuffle from "../lib/shuffle";
import LoadingAnimation2 from "./LoadingAnimation2";

export default function Lucky() {

    const context = useContext(_data);

    return (
            context.loadingRadio === null
            ?(
                <button
                    onClick={() => shuffle({context})}
                    className="mx-[1rem]"
                >
                    fortune cookies
                </button>
            ):(
                <LoadingAnimation2/>
            ) 
    )
}