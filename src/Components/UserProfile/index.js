import { useState } from "react";
import Modal from 'react-modal';
import { modalConnect } from "../modalStyles/modalConnect";
import UserProfileContent from "./UserProfileContent.js";
import Image from "../Image"

export default function UserProfile({ setRadioList, currentUser}) {

    const [showMenu, setMenu] = useState(false)

    const close = () => { setRadioList(true); setMenu(false) }
    const open = () => { setRadioList(false); setMenu(true) }


    return (
        <>
            <div className="mx-[0.75rem] text-[1.5rem] flex items-center h-[15vh] " >

                {
                    showMenu ?(
                        <div className=''>
                            <Image
                                metadata={{
                                    type: 'profilePicture',
                                    username: currentUser.username,
                                }}
                            />
                        </div>
                    ):(
                        <div className=''>
                            <Image
                                metadata={{
                                    type: 'profilePicture',
                                    username: currentUser.username,
                                }}
                                classe=" w-[20px] h-[20px] rounded-full"
                            />
                        </div>
                    )
                }
                <div className="flex flex-col items-start">
                    <button 
                            onClick={ showMenu ? close : open}
                            key="userProfile"
                    >
                        <p> 
                            {currentUser.username} 
                        </p>
                    </button>
                    
                    {   
                        showMenu ?(
                        <a 
                            className="text-[1rem] mt-4"
                            href={`mailto:${currentUser.email}`}>
                        {currentUser.email}
                        </a>
                        ):(
                            <a 
                            className="text-[1rem] mt-4"
                            href={`mailto:${currentUser.email}`}>
                                &nbsp;
                            </a>
                        )
                    }
                </div>
            </div>
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
                <nav className={`flex flex-col text-[2.815rem] mx-0 md:mx-16`}>
                    <UserProfileContent setRadioList={setRadioList}/>
                </nav>
            </Modal>
        </>
    )
}