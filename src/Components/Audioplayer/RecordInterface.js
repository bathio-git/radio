import useSave  from '@/lib/useSave';
import RedButton from './RedButton';


export default function RecordInterface(
    { color,setColor, setIsRecording, recordedChunks, startTime, isRecording, showSave}
){

    const save = useSave({ setColor, setIsRecording, recordedChunks, startTime })

    return (<>
        <RedButton 
             color={color}
             setIsRecording={setIsRecording} 
             isRecording={ isRecording} 
        />
        <div className={showSave}>
            <textarea 
                className="textArea w-[200px] h-[80px] md:w-[300px] md:h-[120px] mt-[4rem]"
                id={'textArea'} 
                placeholder="title" 
                maxLength="240" 
            />
                <button
                    className="ml-[8rem] md:ml-[14rem] mt-[2rem]"
                    onClick={save}
                >
                    save
                </button>
        </div>
    </>)
}