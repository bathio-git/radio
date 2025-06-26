import { useEffect, useState, useContext } from "react";
import { v4 } from "uuid";
import PlayARecord from "./PlayARecord";
import LoadingAnimation from "../LoadingAnimation";
import { _data } from "@/Context/Context";
import useFetch from "@/lib/useFetch";
import onDelete from "@/lib/onDelete";

export default function Recordings({ edits, user }) {

    const { fetchRecords, setFetchRecords, setUserRecords, setAllRecords } = useContext(_data);

    const [records, setRecords] = useState(null);

    const efficientFetch = useFetch({ setRecords,user })

    useEffect(() => {
        efficientFetch();
    }, [fetchRecords, user]);

    return records === null ? (
        <LoadingAnimation />
    ) : (
        records.map((record, index) =>
            <div className="mb-12 text-[1rem] m-[1.5rem]" key={v4()}>
                <PlayARecord 
                    record={record}
                    onDelete={() => onDelete(
                        record._id,
                        records,
                        setRecords,
                        setFetchRecords,
                        setUserRecords,
                        setAllRecords
                    )}
                    edits={edits}
                />
                <br />
            </div>
        )
    );
}