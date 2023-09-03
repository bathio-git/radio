import blobToBase64  from './blobToBase64.js';
import formatTime from './formatTime.js';

export default async function save({ xo, setColor, setIsRecording, recordedChunks, currentUser, sourceAudio, startTime}) {

    setIsRecording(false);

    // get the duration of the recording
    const duration = formatTime((Date.now() - startTime) / 1000);
    console.log(duration);

    setColor(xo === '#aaa' ? '#aa0000' : '#aaa');
    const blob = new Blob(recordedChunks, { type: 'audio/ogg; codecs=opus' });

    try {

        document.getElementById('message').style.display = 'block';
        document.getElementById('message').textContent = 'Saving... May take a few seconds';
    
        const base64 = await blobToBase64(blob);
        const text = document.getElementById('textArea').value;
        const date = new Date();
        const user = currentUser;
        const source = sourceAudio.name;
        const data = { base64, text, date, user, source, duration };
    
        const res = await fetch('/api/newMix', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const json = await res.json();
        document.getElementById('message').style.display = 'block';
        
        if (json.message === 'New mix created successfully') {
            document.getElementById('message').textContent = 'Recording saved in your profile';

            setTimeout(() => {
                document.getElementById('message').style.display = 'none';
            }
            , 5000);
        }
        else {
            document.getElementById('message').textContent = 'Something went wrong';
        }
        setTimeout(() => {
            document.getElementById('message').style.display = 'none';
        }, 5000);

        

    } catch (error) {
        // Handle any errors that occurred during the process.
        console.error('Error:', error);
    }
}