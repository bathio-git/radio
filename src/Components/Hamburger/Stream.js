import RadioList from "./RadioList"
import HamburgerSlider from "./HamburgerSlider"
import UserProfile from "../UserProfile"
import Connect from "../Connect"
import Recordings from "../Recordings"
import { _data } from "@/Context/Context";

export default function Stream({ setRadioList, currentUser, showRadioList, live, setLive }) {

    return (
        <nav className={`md:ml-[2rem] zHamburger relative`}>
            <div className="relative">
                { 
                    currentUser && Object.keys(currentUser).length > 0 
                    ? <UserProfile edits={true} />
                    : <Connect setRadioList={setRadioList} />
                }
            </div>
            {
                showRadioList &&
                <>
                    <HamburgerSlider setLive={setLive} live={live} />
                    <div className="mt-[6rem] mx-0 md:mx-16">
                        {
                            live === false 
                            ? <RadioList />
                            : <Recordings edits={false} />
                        }
                    
                    </div>
                </>
            }
        </nav>
    )
}