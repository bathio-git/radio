import React, { useState, useEffect, useContext } from "react"
import TextInput from "../TextInput"
import submitNewUser from "../../lib/submitNewUser"
import { _data } from "../../Context/Context"

export default function FirstTime({setRadioList}) {

    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const {setCurrentUser} = useContext(_data);

    return (
        <div>
                <form >
                    <TextInput
                        type="email"
                        placeholder="email"
                        onChange = {setEmail}
                    />
                    <TextInput
                        type="text"
                        placeholder="username"
                        onChange = {setUserName}
                    />
                    <TextInput
                        type="password"
                        placeholder="password"
                        onChange = {setPassword}
                    />
                    <TextInput
                        type="password"
                        placeholder="confirm password"
                        onChange = {setCPassword}
                    />
                    <button
                        className="text-[1.5rem]" 
                        type="submit"  
                        onClick={(event)=> submitNewUser( event, userName, password, cPassword, email, setCurrentUser, setRadioList )}
                    >
                        {"--> submit"}
                    </button>
                </form>
                <p id='message' className="text-[1.5rem] mt-[1.5rem]" style={{display:'none'}}> 
                </p>
        </div>
    )
}