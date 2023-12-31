import { useState } from "react";
import Modal from 'react-modal';
import { modalConnect } from "../modalStyles/modalConnect";
import FirstTime from "./FirstTime";
import Slider from "./Slider";
import Login from "./Login";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

export default function Connect({ setRadioList }) {

    const [showMenu, setMenu] = useState(false)
    const [signUp, setSignUp] = useState(false)

    const close = () => { setRadioList(true); setMenu(false) }
    const open = () => { setRadioList(false); setMenu(true) }

    return (
        <>
            <p className="mb-[2rem] text-[1.5rem]" >
                <button 
                    onClick={ showMenu ? close : open}
                    key="signIn"
                >
                    <>
                        <LoginOutlinedIcon />
                        &nbsp;sign in 
                    </>
                </button>
            </p>
            <Modal
                isOpen={showMenu}
                onRequestClose={close}
                style={modalConnect}
                closeTimeoutMS={0}
                ariaHideApp= {false}
                contentLabel="Modal" 
                htmlOpenClassName="ReactModal__Html--open" 
                overlayClassName="header__overlay zIndex" 
                >
                <nav className={`flex text-[2.815rem] justify-center`}>
                <button
                        onClick={close}
                        className="absolute top-0 left-0 m-8 text-[1.5rem]"
                    >
                        &#10005;
                    </button>
                    <Slider setSignUp={setSignUp} signUp={signUp} />
                    <div className="mt-[8rem]">
                        {
                            signUp === false ?( 
                                <Login setRadioList={setRadioList} />
                            ):(  
                                <FirstTime setRadioList={setRadioList} /> 
                            )
                        }
                    </div>
                </nav>
            </Modal>
        </>
    )
}