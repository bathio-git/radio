import Burger from "../Hamburger/Hamburger"
import Audioplayer from "../Audioplayer"
import Lucky from "../Lucky"
import PayPal from "../PayPal"
import About from "../About"

export default function Desktop({ context, size}) {
    return(
        <>
            <div className="flex items-center  p-[2rem]">
                <Burger />
                <div className="mx-4">
                    { context.sourceAudio 
                        ? <Audioplayer size={size}/> 
                        : <Lucky />
                    }
                </div>
            </div>
            <p 
                id='message' 
                className="text-[1.5rem] mt-[1.5rem] ml-[10vw] fixed top-[60vh] text-center md:top-[80vh] zAudioplayer items-center "
                style={{display:'none'}}
            > 
            </p>
            {/* <div className="fixed bottom-0 text-[1rem] m-16">
                <PayPal />
            </div> */}
            <div className="fixed bottom-0 text-[1rem] m-16">
                <About />
            </div>
        </>
    )
}