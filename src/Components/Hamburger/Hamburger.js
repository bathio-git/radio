import { useState, useContext } from "react";
import Modal from 'react-modal';
import { modalStylesIndex } from "../modalStyles/modalStylesIndex";
import RadioList from "./RadioList";
import Connect from "../Connect";
import { _data } from "@/Context/Context";
import UserProfile from "../UserProfile";
import Recordings from "../Recordings";
import HamburgerSlider from "./HamburgerSlider";


export default function Burger() {

    const { currentUser, showMenu, setMenu, showUserX, setShowUserX } = useContext(_data)

    const [showRadioList, setRadioList] = useState(true)
    const [ live, setLive ] = useState(false)

    const close = () => {setMenu(false); }
    const open = () => {setMenu(true); setRadioList(true)}

    return (
        <>
            <button 
                className="burger"
                onClick={ showMenu ? close : open}
                key="burger"
            >
                {showMenu ? <p>&#10005;</p> : "☰" }
            </button>
            <Modal
                isOpen={showMenu}
                onRequestClose={close}
                style={modalStylesIndex}
                closeTimeoutMS={50}
                ariaHideApp= {false}
                contentLabel="Modal" 
                htmlOpenClassName="ReactModal__Html--open" 
                overlayClassName="header__overlay " 
                >
                <nav className={`md:ml-[2rem] zHamburger relative`}>
                    <div className="relative">
                    { currentUser && currentUser !== {} ?( 
                            <UserProfile setRadioList={setRadioList} currentUser={currentUser} />
                        ):( 
                            <Connect setRadioList={setRadioList} />
                        )
                    }
                    </div>
                    {
                        showRadioList &&
                        <>
                            <HamburgerSlider setLive={setLive} live={live} />
                            <div className="mt-[6rem] mx-0 md:mx-16">
                                {
                                    live === false ?( 
                                        <RadioList />
                                ):(  
                                    <Recordings edits={false} />
                                )
                            }
                            
                            <br/><br/><br/></div>
                        </>
                    }
                    <button 
                        onClick={() =>  setMenu(false) }
                    >
                    </button>
                        
                   {/*  {
                        showUserX &&
                        <p>
                            lol
                        </p>
                    } */}
                </nav>
            </Modal>
        </>
    )
}