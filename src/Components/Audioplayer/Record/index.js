import { _data } from "@/Context/Context";
import timeLimit from '@/lib/timeLimit';
import RecordInterface from './RecordInterface';
import createRecorder  from '@/lib/createRecorder';
import { useEffect, useState, useContext } from 'react';

export default function Record() {

    const [recorder, setRecorder] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const { sourceNode, setMenu } = useContext(_data);


    // So this useEffect explain what happen when you click the record button
    // Look at useSave to see what happen when you click save
    // RecordInterface is the explaination of the ui / interaction 
    useEffect(() => {
        let timeoutId = null;

        if(!window.audioContext) return;//console.log(isRecording, recorder)
        
        if (isRecording && recorder) { //console.log('I am starting the recorder')
            recorder.start(1000); //console.log('recorder.start')
            setStartTime(Date.now()); // save the start time of the recording

            //update ui
            setMenu(false)
            
            recorder.onstart = () => { // after 10 minutes stop the recording and ask the user to save
                timeoutId = timeLimit({recorder, setIsRecording, setStartTime});
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
            setIsRecording={setIsRecording}
            recordedChunks={recordedChunks}
            startTime={startTime}
            isRecording={isRecording}
        />
    )
}