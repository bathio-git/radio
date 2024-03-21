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
        
        if(!window.audioContext || isRecording === false) return

        
        
        if (isRecording && recorder) {
            //console.log('I am starting the recorder')
            recorder.start(1000);

            // save the start time of the recording
            setStartTime(Date.now());

            // after 10 minutes stop the recording and ask the user to save
            timeoutId = setTimeout(() => {
                setColor('#aaa')
                if (recorder.state === "active") recorder.pause();
                document.getElementById('message').style.display = 'block';
                document.getElementById('message').innerHTML = "It's been 10min... Recording stopped. Click save to save the recording";
                document.getElementById('message').appendChild(document.createElement('br'));
                
                // create a cancel button
                const cancelButton = document.createElement('button');
                cancelButton.textContent = "I don't want to save";
                cancelButton.style.cursor = 'pointer';
                cancelButton.onmouseover = () => {
                    cancelButton.style.textDecoration = 'underline';
                }
                cancelButton.onclick = () => {
                    document.getElementById('message').style.display = 'none';
                    setShowSave('displayNone');
                    setIsRecording(false);
                }
                document.getElementById('message').appendChild(cancelButton);

                setStartTime('10min')

                //make some noise to get the user's attention
                const context = window.audioContext;
                const oscillator = context.createOscillator();
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(440, context.currentTime);
                oscillator.connect(context.destination);
                oscillator.start();
                setTimeout(() => {
                    oscillator.stop();
                }, 500);
            }
            , 10000);

            recorder.ondataavailable = async (e) => {
                //console.log(e.data)
                setRecordedChunks(prevChunks => [...prevChunks, e.data]);
            }
            recorder.onerror = (event) => {
                console.error("The mediaRecorder had ", event.error);
            };
        }

        return () => {
            //console.log('I am cleaning up')
            recorder ? recorder.stop() : null;
            setRecordedChunks([]);
            setRecorder(null);
            const mediaRecorder = createRecorder(sourceNode);
            setRecorder(mediaRecorder);
            clearTimeout(timeoutId);
            //document.getElementById('message').style.display = 'none';
            /* document.getElementById('message').style.display = 'block';
            document.getElementById('message').innerHTML = "Recording cancelled";
            setTimeout(() => {
                document.getElementById('message').style.display = 'none';
            }
            , 5000) */
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
            setShowSave={setShowSave}
        />
    )
}


/*

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
        
        if(!window.audioContext) return

        if (isRecording && recorder) {
            //console.log('I am starting the recorder')
            recorder.start(1000);

            // save the start time of the recording
            setStartTime(Date.now());

            // after 15 minutes stop the recording and ask the user to save
            setTimeout(() => {
                setColor('#aaa')
                recorder.pause();
                document.getElementById('message').style.display = 'block';
                document.getElementById('message').innerHTML = "It's been 15min... Recording stopped. Click save to save the recording";
                //make some noise to get the user's attention
                const context = window.audioContext;
                const oscillator = context.createOscillator();
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(440, context.currentTime);
                oscillator.connect(context.destination);
                oscillator.start();
                setTimeout(() => {
                    oscillator.stop();
                }, 500);
            }
            , 900000);

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
            setIsRecording(false);
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
            setShowSave={setShowSave}
        />
    )
}


*/