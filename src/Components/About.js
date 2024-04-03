import { useState, useContext } from "react";
import Modal from 'react-modal';
import { modalAbout } from "../Components/modalStyles/modalAbout";

export default function About() {

    const [showMenu, setMenu] = useState(false)


    const close = () => {setMenu(false); }
    const open = () => {setMenu(true);}

    return (
        <>
            <button 
                className="burger"
                onClick={ showMenu ? close : open}
                key="about"
            >
                {showMenu ? <p>&#10005;</p> : "?" }
            </button>
            <Modal
                isOpen={showMenu}
                onRequestClose={close}
                style={modalAbout}
                closeTimeoutMS={50}
                ariaHideApp= {false}
                contentLabel="Modal" 
                htmlOpenClassName="ReactModal__Html--open" 
                overlayClassName="header__overlay " 
            >
                <div className="m-8">
                <button 
                    onClick={() => close()}>
                        &#10005;
                </button>
                <h1 className="m-4">About</h1>
                    <div className="m-12 text-[1.25rem]">
                        This page is a proof of concept of a social network that would allow users to share interesting bits from cool internet radios.
                        <br />
                        I still want to add a lot of features to this page, but I am currently working on other projects.
                        <br />
                        Also, IOS has lot of unsuported features... Therefore, I encourage you to try this page on a desktop.
                        <br />
                        If you have any questions, please contact me at <a href="mailto:ecrire@bathio.xyz">ecrire@bathio.xyz</a>
                        <br />
                        Have fun !
                        <br />
                        <br />
                        <button onClick={() => close()}>(ﾉ^_^)</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}