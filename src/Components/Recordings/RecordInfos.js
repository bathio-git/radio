import { _data } from "../../Context/Context";
import formattedDate from "../../lib/formattedDate";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

export default function RecordInfos({ record, equal }) {

    const { radios } = useContext(_data);
    const [url, setUrl] = useState("");

    useEffect(() => {
        radios.forEach((radio) => {
            if (radio.name === record.source) {
                setUrl(radio.radioUrl);
            }
        });
    }, []);

    return (
        <>
            {
                equal() &&
                <ProgressBar record={record} />
            }
            <p>
                &nbsp;&nbsp;&nbsp;&nbsp;recorded {formattedDate(record.date)} on
                <Link href={url} target="_blank">
                &nbsp;{record.source}
                </Link>{" "}
                by {record.username}
            </p>
        </>
    );
}