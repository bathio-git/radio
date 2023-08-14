import formattedDate from "@/lib/formattedDate";
import Link from "next/link";
import { _data } from "@/Context/Context";
import { useContext, useEffect, useState } from "react";
import XSign from "./XSign";

export default function PlayARecord({record, setSourceAudio, onDelete, edits}) {
    
    const {radios } = useContext(_data);
    const [ url, setUrl ] = useState('')

    useEffect(() => {

        radios.forEach(radio => {
            if(radio.name === record.source) {
                setUrl(radio.radioUrl)
            }
        })
    }, [])

    return (
        <>
            <button
                className="" 
                
                onClick={() => {
                    const x = {
                        name: record.text,
                        slogan: '',
                        stream: record.base64,
                        radioUrl: '',
                    }
                    setSourceAudio( x )

                    document.getElementById('audioSource').oncanplaythrough = () => {
                        document.getElementById('audioSource').play()
                    };
                }}
            >   
                <p>
                    &nbsp;&nbsp;{record.text}
                    &nbsp;&nbsp;{record.duration}
                </p>
            </button >
            <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;recorded {formattedDate(record.date)} on 
                    <Link
                        href={url}
                        target="_blank"
                    >
                        &nbsp;{record.source}
                    </Link> by {record.username}
                    <br />
                    {
                        edits &&
                        <XSign 
                            mixId={record._id} 
                            onDelete={onDelete}
                        />
                    }

            </p>
            <br />
        </>
    )
}