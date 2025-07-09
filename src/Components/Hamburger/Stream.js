import RadioList from "./RadioList"
import HamburgerSlider from "./HamburgerSlider"
import Recordings from "../Recordings"
import { _data } from "@/Context/Context";
import { useState } from "react";
import ModalContent from "../Connect/ModalContent";

export default function Stream({ setRadioList, currentUser, showRadioList }) {

    const [ live, setLive ] = useState(0)
    console.log("live value:", live);
    return (
        <nav className={`md:ml-[2rem] zHamburger relative`}>
            {
                showRadioList &&
                <>
                    <HamburgerSlider 
                        live={live} 
                        setLive={setLive} 
                        currentUser={currentUser} 
                        setRadioList={setRadioList} 
                    />
                    <div className="mt-[5rem] mx-0 md:mx-16">
                       {live === 0 && <RadioList />}
                       {live === 1 && <Recordings edits={false} />}
                       {live === 2 && <ModalContent setRadioList={setRadioList} currentUser={currentUser} />}
                       {live === 3 && <p></p>}
                    </div>
                </>
            }
        </nav>
    )
}