import { useContext, useEffect } from "react"
import { _data } from "../Context/Context"
import Lucky from "@/Components/Lucky";
import Audioplayer from "@/Components/Audioplayer";
import Burger from "@/Components/Hamburger/Hamburger";
import PayPal from "@/Components/PayPal";
import EmailForm from "@/Components/EmailForm";
import Test from "@/Components/Test.js";



export default function Home() {

  const context = useContext(_data);

/*   useEffect(() => {
    localStorage.setItem('context', JSON.stringify(context))
  }, [context])
 */

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="m-8">
          <Burger />
        </div>
        
        { context.sourceAudio 
          ? <Audioplayer /> 
          : <Lucky />
        }

      </div>

      {/* <a
        className="fixed bottom-0 text-[1rem] m-8" 
        href={"https://bathio.xyz"}> 
        {`(ﾉ^_^)`}
      </a> */}
      <div className="fixed bottom-0 text-[1rem] m-8">
        <PayPal />
        {/* <EmailForm /> */}
      </div>
    </>
  )
}


/* <p className="m-[0.75rem]">
      mix∑s
    </p>
 */