import useSave  from '@/lib/useSave';
import RedButton from './RedButton';
import ClockAnimation from '../../ClockAnimation';
import { useEffect, useState } from 'react';
import SavingAnimation from '../../SavingAnimation'

export default function RecordInterface({ 
    isRecording,setIsRecording, 
    recordedChunks, startTime,
}){

    const [isSaving, setIsSaving] = useState(false)
    const [result, setResult] = useState(null)

    useEffect(() => {
        if (result) {
            if (isRecording){
                setResult(null);return
            } 
            setTimeout(() => setResult(null), 7000);
        }
    }, [result, isRecording]);

    
    const save = useSave(
        { setIsRecording, recordedChunks, startTime, setIsSaving, setResult }
    )

    return (<>
        <RedButton 
             setIsRecording={setIsRecording} 
             isRecording={ isRecording} 
        />
        <div className={isRecording?'showSave':'displayNone'}>
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
            <div className='mt-[4rem] flex '> 
                <ClockAnimation isRecording={isRecording} />
                <p className='ml-[2rem]'>
                    {isRecording?"Recording...":""}
                </p>
            </div>
        </div>
        <div className={isSaving?'saveMessage':'displayNone'}>
            Saving
            <SavingAnimation/> 
            May take a few seconds
        </div>
        <div className={result?'saveMessage':'displayNone'}>
            {result}
        </div>
        
    </>)
}

// So it might be interestion make a componnent saving, resut, savaDialog