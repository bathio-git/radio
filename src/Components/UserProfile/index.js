import { useContext } from "react";
import { _data } from "@/Context/Context";
import Image from "../Image"

export default function UserProfile({ edits }) {

    const { setBurgerContent, setBurgerUser, currentUser } = useContext(_data)

    return (
        <>
            <div className="mx-[0.75rem] text-[1.5rem] flex items-center " >
                <Image
                    metadata={{
                        type: 'profilePicture',
                        username: currentUser.username,
                    }}
                />
                <div className="flex flex-col items-start">
                    <button 
                            onClick={ ()=>{
                                setBurgerContent('user')
                                setBurgerUser(currentUser.username)
                            }}
                            key="userProfile"
                    >
                        <p> 
                            {currentUser.username} 
                        </p>
                    </button>
                </div>
            </div>
        </>
    )
}