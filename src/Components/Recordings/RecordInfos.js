import { _data } from "../../Context/Context";
import formattedDate from "../../lib/formattedDate";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

export default function RecordInfos({ record, equal }) {

    const { radios, setBurgerContent, setBurgerUser } = useContext(_data);
    const [url, setUrl] = useState("");

    useEffect(() => {
        radios.forEach((radio) => {
            if (radio.name === record.source) {
                setUrl(radio.radioUrl);
            }
        });
    }, []);

    return (
        <div className="ml-10 mb-2 ">
            {
                equal() &&
                <ProgressBar record={record} />
            }
            <p>
                recorded {formattedDate(record.date)} on
                <Link href={url} target="_blank">
                &nbsp;{record.source}
                </Link>{" "}
                <button 
                    className="whitespace-nowrap"
                    onClick={()=> {
                            setBurgerContent('user')
                            setBurgerUser(record.username)
                        }
                    }
                
                >
                    by {record.username}
                </button>
            </p>
        </div>
    );
}