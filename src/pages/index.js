import { useContext, useEffect, useState } from "react"
import { _data } from "../Context/Context"
import Lucky from "@/Components/Lucky";
import Audioplayer from "@/Components/Audioplayer";
import Burger from "@/Components/Hamburger/Hamburger";
import PayPal from "@/Components/PayPal";
import useWindowSize from "@/lib/useWindowSize";
import { sizeWidth } from "@mui/system";



export default function Home() {

  const context = useContext(_data);

  const [size, setSize] = useState({
    width: typeof window !== 'undefined'  ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
      function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
      }

      if (typeof window !== 'undefined' && window !== null) {
      window.addEventListener('resize', updateSize);
      updateSize();
      }

      return () => {
      if (typeof window !== 'undefined') {
          window.removeEventListener('resize', updateSize);
      }
      };
  }, []);


/*   useEffect(() => {
    localStorage.setItem('context', JSON.stringify(context))
  }, [context])
 */

  return size.width > 640 ? (
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
      
      <div className="fixed bottom-0 text-[1rem] m-16">
        <PayPal />
      </div>
    </>
  ):(
    <>
      
      <div 
        className="fixed bottom-0 py-8 zIndex2 blackborder w-screen flex bg-[#000]">
            <div className="flex items-center">
              <Burger />
            </div>
            { context.sourceAudio 
              ? <Audioplayer size={size} /> 
              : <Lucky />
            }
      </div>
      <div className="flex flex-row justify-center mt-4 text-[1rem]">
          <PayPal />
      </div>
    </>
  )
}
