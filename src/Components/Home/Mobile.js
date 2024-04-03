import Burger from "../Hamburger/Hamburger"
import Audioplayer from "../Audioplayer"
import Lucky from "../Lucky"
import PayPal from "../PayPal"
import About from "../About"

export default function Mobile({ context, size}) {
    
    return(
        <>
            <div 
                className="py-8 blackborder w-screen flex zVolume bg-[#000]"
            >
                <div className="flex items-center">
                    <Burger />
                </div>
                { context.sourceAudio 
                    ? <Audioplayer size={size} /> 
                    : <Lucky />
                }
            </div>
            <p 
                id='message' 
                className="text-[1.5rem] mt-[1.5rem] fixed top-[60vh] text-centermd:top-[80vh] zAudioplayer" 
                style={{display:'none'}}
            > 
            </p>
            {/*  <div className="flex flex-row justify-center mt-4 text-[1rem]">
                <PayPal />
            </div> */}
            <div className="flex flex-row  fixed top-[90%]  text-[1rem]">
                <About />
            </div>
        </>
    )
}