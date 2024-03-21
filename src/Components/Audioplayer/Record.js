import { styled } from '@mui/system';
import { _data } from "@/Context/Context";
import timeLimit from '@/lib/timeLimit';
import RecordInterface from './RecordInterface';
import createRecorder  from '@/lib/createRecorder';
import { useEffect, useState, useContext } from 'react';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';

export default function Record() {

    const [color, setColor] = useState('#aaa');
    const [recorder, setRecorder] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [showSave, setShowSave] = useState('hidden');
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const { sourceNode, currentUser, sourceAudio, setMenu } = useContext(_data);
    
    const RedRadioButton = styled(RadioButtonCheckedOutlinedIcon)` color: ${color};`;

    useEffect(() => {
        
        let timeoutId = null;

        isRecording 
            ? (
                //console.log('User wants to record'),
                setShowSave('showSave') ,setColor('#aa0000'),
                setMenu(false),

                document.getElementById('message').style.display = 'block',
                document.getElementById('message').innerHTML = "Recording... Click save to save the recording. Click the red button to cancel",
                setTimeout(() => {
                    document.getElementById('message').style.display = 'none';
                }
                , 6000)

            ):(
                setShowSave('displayNone'),
                setColor('#aaa')
            )
        
        if(!window.audioContext) return

        //console.log(isRecording, recorder)
        
        if (isRecording && recorder) {
            //console.log('I am starting the recorder')
            recorder.start(1000);

            // save the start time of the recording
            setStartTime(Date.now());
            
            recorder.onstart = () => {
                // after 10 minutes stop the recording and ask the user to save
                timeoutId = timeLimit({recorder, setColor, setShowSave, setIsRecording, setStartTime});
            }

            recorder.ondataavailable = async (e) => {
                setRecordedChunks(prevChunks => [...prevChunks, e.data]);
            }
            recorder.onerror = (event) => {
                console.error("The mediaRecorder had ", event.error);
            };
        }

        return () => {
            recorder ? recorder.stop() : null;
            setRecordedChunks([]);
            setRecorder(null);
            const mediaRecorder = createRecorder(sourceNode);
            setRecorder(mediaRecorder);
            clearTimeout(timeoutId);
        }
    }, [isRecording])

    useEffect(() => {
        const mediaRecorder = createRecorder(sourceNode);
        setRecorder(mediaRecorder);
    }, [sourceNode])

    
    return (
        <RecordInterface 
            RedRadioButton={RedRadioButton}
            color={color}
            setColor={setColor}
            setIsRecording={setIsRecording}
            recordedChunks={recordedChunks}
            currentUser={currentUser}
            sourceAudio={sourceAudio}
            startTime={startTime}
            setMenu={setMenu}
            isRecording={isRecording}
            showSave={showSave}
        />
    )
}