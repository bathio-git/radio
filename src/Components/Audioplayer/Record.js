import { styled } from '@mui/system';
import { _data } from "@/Context/Context";
import save  from '@/lib/save';
import { useEffect, useState, useContext } from 'react';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';

export default function Record() {

    const { sourceNode, currentUser, sourceAudio, setMenu } = useContext(_data);
    
    const [xo, setColor] = useState('#aaa');
    const [recorder, setRecorder] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [showSave, setShowSave] = useState('hidden');
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const RedRadioButtonCheckedOutlinedIcon = styled(RadioButtonCheckedOutlinedIcon)` color: ${xo};`;

    useEffect(() => {
        isRecording 
        ? (
            setShowSave('showSave') ,
            setColor('#aa0000'),
            setMenu(false)
        ):(
            setShowSave('displayNone'),
            setColor('#aaa'),
            setRecordedChunks([])
        )
    }, [isRecording])

    useEffect(() => {

        if (!sourceNode) return;
        
        const destination = sourceNode.context.createMediaStreamDestination();
        sourceNode.connect(destination);
        const mediaRecorder = new MediaRecorder(destination.stream);
        setRecorder(mediaRecorder);

    }, [sourceNode])

    useEffect(() => {
        
        if (isRecording && recorder) {
            recorder.start(1000);

            // save the start time of the recording
            setStartTime(Date.now());

            recorder.ondataavailable = async (e) => {
                /* console.log(e.data) */
                setRecordedChunks(prevChunks => [...prevChunks, e.data]);
            }
            recorder.onerror = (event) => {
                console.error("MediaRecorder error: ", event.error);
            };
        }

        return () => {
            recorder ? recorder.stop() : null;
        }

    }, [isRecording]) 

    
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
                <RedRadioButtonCheckedOutlinedIcon />
            </button>
            <div className={showSave}>
                <textarea 
                    className="textArea w-[200px] h-[80px] md:w-[300px] md:h-[120px]"
                    id={'textArea'} 
                    placeholder="title" 
                    maxLength="240" 
                />
                <button
                    className="ml-[8rem] md:ml-[14rem] mt-[2rem]"
                    onClick={
                        () => {
                                save({ 
                                    xo, setColor, setIsRecording, recordedChunks, currentUser, sourceAudio, startTime
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