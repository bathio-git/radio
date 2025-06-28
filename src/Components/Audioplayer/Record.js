import { _data } from "@/Context/Context";
import timeLimit from '@/lib/timeLimit';
import RecordInterface from './RecordInterface';
import createRecorder  from '@/lib/createRecorder';
import { useEffect, useState, useContext } from 'react';

export default function Record() {

    const [recorder, setRecorder] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [showSave, setShowSave] = useState('hidden');
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const { sourceNode, setMenu } = useContext(_data);

    useEffect(() => {
        
        let timeoutId = null;

        if(!window.audioContext) return
        //console.log(isRecording, recorder)
        
        if (isRecording && recorder) {
            //console.log('I am starting the recorder')
            recorder.start(1000);

            // save the start time of the recording
            setStartTime(Date.now());

            //update ui
            setShowSave('showSave')
            setMenu(false)
            document.getElementById('message').style.display = 'block',
            document.getElementById('message').innerHTML = "Recording...",
            setTimeout(() => {
                document.getElementById('message').style.display = 'none';
            }, 9000)
            
            recorder.onstart = () => {
                // after 10 minutes stop the recording and ask the user to save
                timeoutId = timeLimit({recorder, setShowSave, setIsRecording, setStartTime});
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
            setShowSave('displayNone')
        }
    }, [isRecording])

    useEffect(() => {
        const mediaRecorder = createRecorder(sourceNode);
        setRecorder(mediaRecorder);
    }, [sourceNode])

    
    return (
        <RecordInterface 
            setIsRecording={setIsRecording}
            recordedChunks={recordedChunks}
            startTime={startTime}
            isRecording={isRecording}
            showSave={showSave}
        />
    )
}