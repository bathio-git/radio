import { useState, useEffect, useContext } from 'react';
import { _data } from "../../Context/Context"
import Link from 'next/link';


const TextChanger = () => {

    const context = useContext(_data);
    const [text, setText] = useState(`${context.sourceAudio.name}`);
    const texts = [
        `${context.sourceAudio.name}`, 
        /* `${context.sourceAudio.slogan}`,
        '...' */
    ]

    useEffect(() => {
        const interval = setInterval(() => {
        setText(texts[Math.floor(Math.random() * texts.length)]);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return( 
        <div className="flex">
            {text} &nbsp;
            <Link href={context.sourceAudio.radioUrl} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-broadcast typewriter" viewBox="0 0 16 16">
                    <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                </svg>
            </Link>
        </div>
    )
};

export default TextChanger;