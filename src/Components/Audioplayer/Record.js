import { styled } from '@mui/system';
import { _data } from "@/Context/Context";
import save  from '@/lib/save';
import { useEffect, useState, useContext } from 'react';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';

export default function Record() {

    const [xo, setColor] = useState('#aaa');
    const [showSave, setShowSave] = useState('hidden');
    const { sourceNode, currentUser, sourceAudio } = useContext(_data);
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    
    const RedRadioButtonCheckedOutlinedIcon = styled(RadioButtonCheckedOutlinedIcon)` color: ${xo};`;

    const stylee = {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: '50%',
        left: '40%',
        transform: 'translateX(-50%) translateY(-50%)',
    };

    const displayNone = {
        display : 'none'
    }

    useEffect(() => {
        isRecording 
        ? (
            setShowSave(stylee) ,
            setColor('#aa0000')
        ):(
            setShowSave(displayNone),
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
                className='mr-4'
                onClick={() => { 
                    setIsRecording(!isRecording)
                }}
            >
                <RedRadioButtonCheckedOutlinedIcon />
            </button>
            <div style={showSave}>
                <textarea 
                    className="textArea w-[200px] h-[80px] md:w-[300px] md:h-[120px]"
                    id={'textArea'} 
                    placeholder="note" 
                    maxLength="240" 
                />
                <button
                    className="ml-[8rem] md:ml-[14rem] mt-[2rem]"
                    onClick={
                        () => {
                                save({ 
                                    xo, setColor, setIsRecording, recordedChunks, currentUser, sourceAudio 
                            })
                        }
                    }
                >
                    save
                </button>
            </div>
            <p id='message' className="text-[1.5rem] mt-[1.5rem] fixed top-[80vh] left-[20vw]" style={{display:'none'}}> 
            </p>
        </>
    )
}