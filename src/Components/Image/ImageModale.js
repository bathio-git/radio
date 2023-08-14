import { useEffect, useState, useContext } from "react";
import Modal from 'react-modal';
import { imageModalStyles } from "../modalStyles/imageModalStyles";
import { _data } from "@/Context/Context";
import addImage from '../../lib/addImage';


export default function ImageModale({ image, setSelectedImage, classe }) {

    const { currentUser } = useContext(_data)

    const [showMenu, setMenu] = useState(false)
    const [showRadioList, setRadioList] = useState(true)
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
                onClick={ showMenu ? close : open}
            >
                {
                    showMenu ? (
                        <div className="w-24 h-24 rounded-full">
                            <p>&#10005;</p> 
                        </div>
                    ):(
                        <div className="mr-3">
                            <img src={image} alt="image" className={classe ? classe : "profile-thumbnail"} />
                    </div>
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
                    <img src={image} alt="image" className=""  />
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

                </nav>
            </Modal>
        </>
    )
}