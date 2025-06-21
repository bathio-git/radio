import { useRouter } from 'next/router'
import { _data } from "@/Context/Context";
import { useState, useEffect, useContext } from "react";
import Image from "@/Components/Image/index.js";
import UserProfileContent from "@/Components/UserProfile/UserProfileContent";

export default function UserProfile() {

    const router = useRouter()
    const username  = router.query.user

    const { setRadioList, currentUser } = useContext(_data)
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

            fetch(`/api/getUser?username=${router.query.user}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUser(data)
            })
        }
    }, [username])

    return user === null ? <></> : (
        <div className="m-8 md:m-16">
            <div className="mx-[0.75rem] text-[1.5rem] flex items-center " >
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
