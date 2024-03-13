import { _data } from "@/Context/Context";
import Image from "@/Components/Image/index.js";
import { useState, useEffect, useContext } from "react";
import UserProfileContent from "@/Components/UserProfile/UserProfileContent";

export default function UserX({username}) {

    const { setRadioList, currentUser, setBurgerContent, setBurgerUser } = useContext(_data)
    const [user, setUser] = useState(null)
    const [edits, setEdits] = useState(false)

    useEffect(() => {
        
        if (currentUser && currentUser.username === username) {
            setEdits(true)
        }

    }, [currentUser, username])


    useEffect(() => {

        if (username ) {
            if(edits) {
                setUser(currentUser)
                return
            }

            fetch(`/api/getUser?username=${username}`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
        }
    }, [username])

    return user === null ? <></> : (
        <div className="m-4 md:m-16">
            <div className="mx-[0.75rem] text-[1.5rem] flex items-center " >
                <button 
                    className="absolute top-0 left-0 m-8 text-[1.5rem]"
                    onClick={ ()=>{
                        setBurgerContent('streams')
                        setBurgerUser(null)
                    }
                }>
                    <p>&#8592;</p> 
                </button>
                <Image
                    metadata={{
                        type: 'profilePicture',
                        username: user.username,
                    }}
                    edits={edits}
                />
                <div className="flex flex-col items-start">
                    <p> 
                        {user.username} 
                    </p>
                    <a className="text-[1rem] mt-4"
                        href={`mailto:${user.email}`}
                    >
                        {user.email}
                    </a>
                </div>
            </div>
            <nav className={` mx-0 md:mx-16 mt-[3rem] `}>
                <UserProfileContent 
                    setRadioList={setRadioList}
                    user={user}
                    edits={edits}
                />
            </nav>
        </div>
    )
}