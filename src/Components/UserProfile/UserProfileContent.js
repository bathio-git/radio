import { useContext, useEffect } from "react"
import { _data } from "@/Context/Context"
import { useState } from "react"
import Disconnect from "./Disconnect"
import Recordings from "../Recordings"

export default function UserProfileContent ({setRadioList}) {
    
    const { currentUser, setSourceAudio } = useContext(_data)
    const[records, setRecords] = useState(null)

    return (
        <div className="text-[1rem] flex flex-col">
            <div>
                <Recordings user={currentUser} edits={true} />
            </div>
            <Disconnect currentUser={currentUser} setRadioList={setRadioList} /> 
        </div>
    )
}