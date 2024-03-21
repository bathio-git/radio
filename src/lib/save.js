import blobToBase64  from './blobToBase64.js';
import formatTime from './formatTime.js';

export default async function save({  color, setColor, setIsRecording, recordedChunks, currentUser, sourceAudio, startTime }) {

    setIsRecording(false);

    let duration
    if (startTime === '10min')  duration = '10:00'
    else duration = formatTime((Date.now() - startTime) / 1000);

    setColor('#aaa');

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

        const jsonString = JSON.stringify(data);
        const sizeInBytes = new Blob([jsonString]).size;
        const sizeInMegabytes = sizeInBytes / 1024 / 1024;
        //console.log('Size of request body:', sizeInMegabytes, 'MB');

        if(sizeInMegabytes < 3) {
    
            const res = await fetch('/api/newMix', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const json = await res.json();
            //console.log('Response from server', json)

            if (json.x.message === "New mix created successfully") {
                message.textContent = 'Recording saved in your profile';
                setTimeout(() => {
                    message.style.display = 'none';
                }
                , 5000);
            }

            else {
                message.textContent = 'Something went wrong';
            }
            setTimeout(() => {
                message.style.display = 'none';
            }, 5000);
        }

        else { // one of the limitations of the free version of Vercel is that the request body size is limited to 4MB

            const chunkSize = 3 * 1024 * 1024; // 3MB in bytes
            const chunkSizeBase64 = Math.floor(chunkSize * 4 / 3); // Each base64 character encodes 6 bits, so each byte is represented by 4/3 base64 characters
            
            let chunks = [];
            for (let i = 0; i < base64.length; i += chunkSizeBase64) {
                chunks.push(base64.substring(i, i + chunkSizeBase64));
            }
            console.log(chunks);

            let id;

            for (let index = 0; index < chunks.length; index++) {
                const base64 = chunks[index];

                if (index === 0) {
                    const firstData = { base64, text, date, user, source, duration };
                    const res = await fetch('/api/newMix', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(firstData)
                    });
                    const json = await res.json();
                    id = json.x.id;
                }
                else {
                    const data = { base64, id }

                    const res = await fetch('/api/modifyBase64', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });

                    const json = await res.json();
                    console.log('Response from server', json)
                }
            }

            message.textContent = 'Recording saved in your profile';
            setTimeout(() => { message.style.display = 'none';} , 5000);
        }

    } catch (error) {
        console.error('Error:', error);
        message.textContent = error;
    }
}