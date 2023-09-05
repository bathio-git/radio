import Burger from "../Hamburger/Hamburger"
import Audioplayer from "../Audioplayer"
import Lucky from "../Lucky"
import PayPal from "../PayPal"

export default function Mobile({ context, size}) {
    
    return(
        <>
            <div 
                className="fixed bottom-0 py-8 blackborder w-screen flex zVolume "
                style={{background: 'rgba(28,28,28,0.5)', backdropFilter: 'blur(10px)'}}
            >
                <div className="flex items-center">
                    <Burger />
                </div>
                { context.sourceAudio 
                    ? <Audioplayer size={size} /> 
                    : <Lucky />
                }
            </div>
            <p id='message' className="text-[1.5rem] mt-[1.5rem] fixed top-[60vh] text-center
            md:top-[80vh] zAudioplayer" style={{display:'none'}}> lollol
            </p>
            {/*  <div className="flex flex-row justify-center mt-4 text-[1rem]">
                <PayPal />
            </div> */}
        </>
    )
}