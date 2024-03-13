import { useContext, useEffect } from "react"
import { _data } from "@/Context/Context"
import { useState } from "react"
import Disconnect from "./Disconnect"
import Recordings from "../Recordings"

export default function UserProfileContent ({setRadioList, user, edits}) {
    
    const { currentUser, setSourceAudio } = useContext(_data)
    const[records, setRecords] = useState(null)
    
    console.log("Rendering UserProfileContent of", user, ". User can edit this page?", edits)
    
    return (
        <div className="text-[1rem] flex flex-col">
            <div>
                <Recordings user={user} edits={edits} />
            </div>
            {
                edits &&
                <Disconnect currentUser={currentUser} setRadioList={setRadioList} />
            }
        </div>
    )
}