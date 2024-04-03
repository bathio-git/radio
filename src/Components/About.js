import { useState, useContext } from "react";
import { _data } from "@/Context/Context";
import Modal from 'react-modal';
import { modalAbout } from "../Components/modalStyles/modalAbout";

export default function About() {

    const [showAbout, setAbout] = useState(false)
    const { showMenu } = useContext(_data)



    const close = () => {setAbout(false); }
    const open = () => {setAbout(true);}

    return showMenu === true ? <></> : (
        <>
            <button 
                className="burger"
                onClick={ showAbout ? close : open}
                key="about"
            >
                {showAbout ? <p>&#10005;</p> : "?" }
            </button>
            <Modal
                isOpen={showAbout}
                onRequestClose={close}
                style={modalAbout}
                closeTimeoutMS={50}
                ariaHideApp= {false}
                contentLabel="Modal" 
                htmlOpenClassName="ReactModal__Html--open" 
                overlayClassName="header__overlay " 
            >
                <div className="m-4 md:m-8">
                <button 
                    onClick={() => close()}>
                        &#10005;
                </button>
                <h1 className=" m-2 md:m-4">About</h1>
                    <div className=" m-4 md:m-12 text-[1rem] md:text-[1.25rem]">
                        <p className="my-1 md:my-0">
                            This page is a proof of concept of a social network that would allow users to share interesting bits from cool internet radios.
                        </p>
                        <p className="my-1 md:my-0">
                            I still want to add a lot of features to this page, but I am currently working on other projects.
                        </p>
                        <p className="my-1 md:my-0">
                            Also, iOS has lot of unsuported features... Therefore, I encourage you to try this page on a desktop.
                        </p>
                        <p className="my-1 md:my-0">
                            If you have any questions, please contact me at <a href="mailto:ecrire@bathio.xyz">ecrire@bathio.xyz</a>
                        </p>
                        <p className="my-2 md:my-2">
                            Have fun !
                        </p>
                        <button onClick={() => close()}>(ﾉ^_^)</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}