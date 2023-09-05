import Burger from "../Hamburger/Hamburger"
import Audioplayer from "../Audioplayer"
import Lucky from "../Lucky"
import PayPal from "../PayPal"

export default function Desktop({ context, size}) {
    return(
        <>
            <div className="flex items-center m-1 p-[2rem]">
                <Burger />
                <div className="mx-4">
                    { context.sourceAudio 
                        ? <Audioplayer size={size}/> 
                        : <Lucky />
                    }
                </div>
            </div>
            <p id='message' className="text-[1.5rem] mt-[1.5rem] fixed top-[20vh] left-[10vw] text-center zAudioplayer" 
                style={{display:'none'}}> lollol
            </p>
            {/* <div className="fixed bottom-0 text-[1rem] m-16">
                <PayPal />
            </div> */}
        </>
    )
}