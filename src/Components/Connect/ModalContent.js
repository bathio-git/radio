import React, { useState } from 'react';
import Slider from './Slider';
import FirstTime from './FirstTime';
import Login from './Login';


export default function ModalContent() {

     const [signUp, setSignUp] = useState(false)

    return (
        <span className={`flex text-[2.815rem]  borderr p-8 h-[60vh] w-[30rem]`}>
            <Slider setSignUp={setSignUp} signUp={signUp} />
            <div className="mt-[8rem]">
                {
                    signUp === false ?( 
                        <Login/>
                    ):(  
                        <FirstTime/> 
                    )
                }
            </div>
        </span>
    )
}