import { useState, useContext } from "react"
import { _data } from "@/Context/Context"
import TextInput from "./TextInput"
import submitLogin from "../../lib/submitLogin"

export default function Login () {

    const {setCurrentUser} = useContext(_data);
    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState('')

    return(
        <div>
            <form >
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
                <button
                    className="text-[1.5rem]" 
                    type="submit"  
                    onClick={(event)=> submitLogin({userName, password, setCurrentUser, event}) }
                >
                    {"--> submit"}
                </button>
            </form>
            <p id='messageL' className="text-[1.5rem] mt-[1.5rem]" style={{display:'none'}}> 
            </p>
        </div>
    )
}