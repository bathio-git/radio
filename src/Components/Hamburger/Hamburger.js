import { useEffect, useState, useContext } from "react";
import Modal from 'react-modal';
import { modalStylesIndex } from "../modalStyles/modalStylesIndex";
import RadioList from "./RadioList";
import Connect from "../Connect";
import { _data } from "@/Context/Context";
import UserProfile from "../UserProfile";
import Recordings from "../Recordings";
import HamburgerSlider from "./HamburgerSlider";


export default function Burger() {

    const { currentUser } = useContext(_data)

    const [showMenu, setMenu] = useState(false)
    const [showRadioList, setRadioList] = useState(true)
    const [ live, setLive ] = useState(false)
    const [closeBurger, setClose] = useState(false)

    const close = () => setMenu(false)
    const open = () => {setMenu(true), setRadioList(true)}

    useEffect(() => {
        closeBurger ? close() : null
        setClose(false)
    }, [closeBurger])

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
                overlayClassName="header__overlay zIndex" 
                >
                <nav className={`md:ml-[2rem] zIndex`}>
                    { currentUser && currentUser !== {} ?( 
                            <UserProfile setRadioList={setRadioList} currentUser={currentUser} />
                        ):( 
                            <Connect setRadioList={setRadioList} />
                        )
                    }
                    {
                        showRadioList &&
                        <>
                            <HamburgerSlider setLive={setLive} live={live} />
                            <div className="mt-[6rem] mx-0 md:mx-16">
                                {
                                    live === false ?( 
                                        <RadioList setClose={setClose} />
                                ):(  
                                    <Recordings edits={false} />
                                )
                            }
                            </div>
                        </>
                    }
                </nav>
            </Modal>
        </>
    )
}