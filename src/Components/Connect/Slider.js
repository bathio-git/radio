import { useEffect, useState } from "react"

export default function Slider ({ setSignUp, signUp }) {

    const handleToggle = () => {
        setSignUp(!signUp)
    }

    return (
        <label
            style={{ background: '#000'}}
            className=" w-[16rem] h-[2.5rem] react-switch">
            <input
                className="react-switch-checkbox"
                onChange={handleToggle}
                type="checkbox"
                checked={signUp}
            />
            <div
                className="react-switch-button w-[8rem] h-[3rem] " />
            <div
                className="react-switch-labels text-[1.25rem]">
                <span>Log in</span>
                <span >Sign up</span>
            </div>
        </label>
    )
}