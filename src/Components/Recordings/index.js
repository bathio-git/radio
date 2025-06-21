import { useEffect, useState, useCallback} from "react"
import { v4 } from "uuid";
import PlayARecord from "./PlayARecord"
import LoadingAnimation from "../LoadingAnimation";
import { _data } from "@/Context/Context";
import { useContext } from "react";


export default function Recordings({ edits, user }) {

    const [ records, setRecords ] = useState(null)
    const { fetchRecords } = useContext(_data);

    useEffect(() => {
        
        if (user) {
            fetch(`/api/getMixesOfUser?user=${user.username}`)
            .then(res => res.json())
            .then(data => setRecords(data.reverse()))
        } else{
            fetch(`/api/getAllMixes`)
            .then(res => res.json())
            .then(data => setRecords(data.reverse()))
        }
    }, [fetchRecords])

    function onDelete (recordId) {

        const updatedRecords = records.filter(record => record._id !== recordId);
        setRecords(updatedRecords);
    }

    return records === null ? (
        <LoadingAnimation />
    ) : (
        records.map((record, index) =>
            <div className="mb-12 text-[1rem] m-[1.5rem] " key={v4()}>
                <PlayARecord 
                    record={record}
                    onDelete={() => onDelete(record._id)}
                    edits={edits}
                    nextRecord={records[index + 1]}
                />
                <br />
            </div>
        )
    )
}