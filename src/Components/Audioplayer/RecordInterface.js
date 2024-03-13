import save  from '@/lib/save';

export default function RecordInterface({ RedRadioButton, color, setColor, setIsRecording, recordedChunks, currentUser, sourceAudio, startTime, setMenu, isRecording, showSave}) {

    return (
        <>
            <button 
                className='mr-4 flex items-center zAudioPlayer '
                onClick={() => { 
                    if (currentUser === null){
                        setMenu(false);
                        document.getElementById('message').style.display = 'block';
                        document.getElementById('message').innerHTML = 'You must be logged in to record';
                        setTimeout(() => {
                            document.getElementById('message').style.display = 'none';
                        }
                        , 5000)
                        return;
                    }
                    setIsRecording(!isRecording)
                }}
            >
                <RedRadioButton />
            </button>
            <div className={showSave}>
                <textarea 
                    className="textArea w-[200px] h-[80px] md:w-[300px] md:h-[120px] mt-[4rem]"
                    id={'textArea'} 
                    placeholder="title" 
                    maxLength="240" 
                />
                <button
                    className="ml-[8rem] md:ml-[14rem] mt-[2rem]"
                    onClick={
                        () => {
                                save({ 
                                    color, setColor, setIsRecording, recordedChunks, currentUser, sourceAudio, startTime
                            })
                        }
                    }
                >
                    save
                </button>
            </div>
        </>
    )
}