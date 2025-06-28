import useSave  from '@/lib/useSave';
import RedButton from './RedButton';
import ClockAnimation from '../ClockAnimation';

export default function RecordInterface(
    { setIsRecording, recordedChunks, startTime, isRecording, showSave}
){

    const save = useSave({ setIsRecording, recordedChunks, startTime })

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
            <ClockAnimation size={30} isRecording={isRecording} />
        </div>
    </>)
}