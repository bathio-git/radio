import { useState, useContext } from "react";
import Modal from 'react-modal';
import { modalStylesIndex } from "../modalStyles/modalStylesIndex";
import { _data } from "@/Context/Context";
import Stream from "./Stream";
import UserX from "../UserProfile/UserX";


export default function Burger() {

    const { currentUser, showMenu, setMenu, burgerContent, burgerUser } = useContext(_data)

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
                {
                    burgerContent === 'streams' &&
                    <Stream
                        setRadioList={setRadioList}
                        currentUser={currentUser}
                        showRadioList={showRadioList}
                        live={live}
                        setLive={setLive}
                    />
                }
                {
                    burgerContent === 'user' &&
                    <UserX
                        username={burgerUser}
                    />
                }
            </Modal>
        </>
    )
}