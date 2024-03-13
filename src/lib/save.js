import blobToBase64  from './blobToBase64.js';
import formatTime from './formatTime.js';

export default async function save({ 
    xo, setColor, setIsRecording, recordedChunks, currentUser, sourceAudio, startTime, setRecorder,
}) {

    setIsRecording(false);

    const duration = formatTime((Date.now() - startTime) / 1000);

    setColor(xo === '#aaa' ? '#aa0000' : '#aaa');

    const blob = new Blob(recordedChunks, { type: 'audio/ogg; codecs=opus' });

    const message = document.getElementById('message');

    try {
        
        message.style.display = 'block';
        message.textContent = 'Saving... May take a few seconds';
    
        const base64 = await blobToBase64(blob);
        const text = document.getElementById('textArea').value;
        const date = new Date();
        const user = currentUser;
        const source = sourceAudio.name;
        const data = { base64, text, date, user, source, duration };

        console.log('Trying to save', data)
    
        const res = await fetch('/api/newMix', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const json = await res.json();
        console.log('Response from server', json)

        if (json.x.message === "New mix created successfully") {
            message.textContent = 'Recording saved in your profile';
            setTimeout(() => {
                message.style.display = 'none';
            }
            , 5000);

            // Create a new audioContext and recorder
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('Just created new audioContext', window.audioContext);

            const audioSource = document.getElementById('audioSource');

            audioSource.sourceNode.disconnect();

            const sourceNode = audioContext.createMediaElementSource(audioSource);
            sourceNode.connect(audioContext.destination);

            const destination = window.audioContext.createMediaStreamDestination();
            console.log('The new audioContext is connected to', destination);

            const mediaRecorder = new MediaRecorder(destination.stream);
            setRecorder(mediaRecorder);
            console.log("I'm setting ", mediaRecorder, " as the new recorder");
        }
        else {
            message.textContent = 'Something went wrong';
        }
        setTimeout(() => {
            message.style.display = 'none';
        }, 5000);

    } catch (error) {
        // Handle any errors that occurred during the process.
        console.error('Error:', error);
        message.textContent = 'Something went wrong';
    }
}