import useSave  from '@/lib/useSave';
import RedButton from './RedButton';
import ClockAnimation from '../ClockAnimation';
import { useState } from 'react';
import SavingAnimation from '../SavingAnimation'

export default function RecordInterface({ 
    message, setMessage,
    isRecording,setIsRecording, 
    recordedChunks, startTime,  showSave
}){

    const save = useSave({ setIsRecording, recordedChunks, startTime })
    const [isSaving, setIsSaving] = useState(false)

    const x = 'allo'

    return (<>
        <RedButton 
             setIsRecording={setIsRecording} 
             isRecording={ isRecording} 
        />
        <div className={showSave}>
            <textarea 
                className="textArea w-[200px] h-[80px] md:w-[300px] md:h-[120px] mt-[4rem]"
                id='textArea' 
                placeholder="title" 
                maxLength="240" 
            />
            <button
                className="ml-[8rem] md:ml-[14rem] mt-[2rem]"
                onClick={save}
            >
                save
            </button>
            <ClockAnimation isRecording={isRecording} />
            {/* <SavingAnimation 
                isSaving={isSaving}
                className=''
            /> */}
            <p>{x}</p>
        </div>
    </>)
}