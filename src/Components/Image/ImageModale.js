import { useEffect, useState, useContext } from "react";
import Modal from 'react-modal';
import { imageModalStyles } from "../modalStyles/imageModalStyles";
import { _data } from "@/Context/Context";
import Image from "next/image";

export default function ImageModale({ image, classe, edits }) {

    const [showMenu, setMenu] = useState(false)
    const [closeBurger, setClose] = useState(false)

    const close = () => setMenu(false)
    const open = () => {setMenu(true)}

    useEffect(() => {
        closeBurger ? close() : null
        setClose(false)
    }, [closeBurger])

    return (
        <>
            <button onClick={ showMenu ? close : open}>
                {
                    showMenu ? (
                            <p>&#10005;</p> 
                    ):(
                        <Image 
                            src={image} 
                            width={65} 
                            height={65} 
                            alt="image"  
                            className="object-cover w-24 h-24 rounded-full overflow-hidden mr-3"  
                        />
                    )
                }
            </button>
            <Modal
                isOpen={showMenu}
                onRequestClose={close}
                style={imageModalStyles}
                closeTimeoutMS={50}
                ariaHideApp= {false}
                contentLabel="Modal" 
                htmlOpenClassName="ReactModal__Html--open" 
                overlayClassName="header__overlay zIndex" 
                >
                <nav className={`flex flex-col justify-center items-center`}>
                    <button
                        onClick={close}
                        className="absolute top-0 left-0 m-4 text-2x"
                    >
                        &#10005;
                    </button>
                    <Image
                        src={image}
                        width={400}
                        height={400}
                        alt="image"
                        className="object-cover w-[30rem] h-[30rem] rounded-full overflow-hidden mr-3"
                    />
                    {
                        edits &&
                        <button 
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation()
                            document.getElementById("fileUpload").click(); 
                        }}
                        className="mt-16 h-12 rounded-full flex items-center justify-center"
                        >
                            change image
                        </button>
                    }
                </nav>
            </Modal>
        </>
    )
}