import { useContext, useEffect, useState} from "react"
import { _data } from "../../Context/Context"
import { v4 } from "uuid";
import PlayARecord from "../PlayARecord"
import LoadingAnimation from "../LoadingAnimation";

export default function Recordings({ edits, user }) {

    const { setSourceAudio } = useContext(_data)
    const [ records, setRecords ] = useState(null)

    useEffect(() => {

        if (user) {
            fetch(`/api/getMixesOfUser?user=${user.username}`)
            .then(res => res.json())
            .then(data => setRecords(data))
        } else
        fetch(`/api/getAllMixes`)
            .then(res => res.json())
            .then(data => {setRecords(data)})
    }, [])

    function handleDelete (recordId) {

        const updatedRecords = records.filter(record => record._id !== recordId);
        setRecords(updatedRecords);
    }


    return records === null ? (
        <LoadingAnimation />
    ) : (
        records.map((record, index) =>
            <div className="mx-[1.75rem] text-[1rem] " key={v4()}>
                <PlayARecord 
                    record={record}
                    setSourceAudio={setSourceAudio}
                    onDelete={() => handleDelete(record._id)}
                    edits={edits}
                />
                <br />
            </div>
        )
    )
}