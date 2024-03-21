import save  from '@/lib/save';

export default function RecordInterface({ RedRadioButton, color, setColor, setIsRecording, recordedChunks, currentUser, sourceAudio, startTime, setMenu, isRecording, showSave, setShowSave}) {

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
                {/* <div className="flex"> */}
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
                    {/* <button
                        className="ml-[8rem] md:ml-[14rem] mt-[2rem]"
                        onClick={
                            () => {
                                setIsRecording(!isRecording)
                                setColor('#aaa')
                                setShowSave('displayNone')
                            }
                        }
                    >
                        cancel
                    </button> */}
                {/* </div> */}
            </div>
        </>
    )
}


/*

import save  from '@/lib/save';

export default function RecordInterface({ RedRadioButton, color, setColor, setIsRecording, recordedChunks, currentUser, sourceAudio, startTime, setMenu, isRecording, showSave, setShowSave}) {

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
                    else if (isRecording === false){
                    setIsRecording(!isRecording)
                    setShowSave('showSave')
                    setColor('#aa0000')
                    setMenu(false);
                        document.getElementById('message').style.display = 'block';
                        document.getElementById('message').innerHTML = "Recording... Click save to save the recording. Click the button again to cancel";
                        setTimeout(() => {
                            document.getElementById('message').style.display = 'none';
                        }
                        , 9000)
                    }
                    else {
                        setIsRecording(!isRecording)
                        document.getElementById('message').style.display = 'block';
                        document.getElementById('message').innerHTML = "Recording stopped";
                        setShowSave('displayNone'),
                        setColor('#aaa')
                        setTimeout(() => {
                            document.getElementById('message').style.display = 'none';
                        }
                        , 5000)
                    }
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
                                    color, setColor, setIsRecording, recordedChunks, currentUser, sourceAudio, startTime, setShowSave
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


*/