import { styled } from '@mui/system';
import { _data } from "@/Context/Context";
import { useEffect, useState, useContext } from 'react';
import RecordInterface from './RecordInterface';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import createRecorder  from '@/lib/createRecorder';

export default function Record() {

    const { sourceNode, currentUser, sourceAudio, setMenu } = useContext(_data);
    
    const [color, setColor] = useState('#aaa');
    const [recorder, setRecorder] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [showSave, setShowSave] = useState('hidden');
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const RedRadioButton = styled(RadioButtonCheckedOutlinedIcon)` color: ${color};`;

    useEffect(() => {
        isRecording 
            ? (
                //console.log('User wants to record'),
                setShowSave('showSave') ,setColor('#aa0000'),
                setMenu(false)
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

            recorder.ondataavailable = async (e) => {
                //console.log(e.data)
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