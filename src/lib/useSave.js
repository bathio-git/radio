import blobToBase64  from './blobToBase64.js';
import formatTime from './formatTime.js';
import handleSavingResult from './handleSavingResult.js';
import { useContext } from 'react';
import { _data } from "@/Context/Context";
import postMan from './postMan.js';

export default function useSave({ 
    setIsRecording, recordedChunks, startTime, setIsSaving, setResult 
}){
    
    const {
       currentUser, sourceAudio, setUserRecords, setAllRecords
    } = useContext(_data);

    return async function save() {

        setIsRecording(false);

        let duration
        if (startTime === '10min')  duration = '10:00'
        else duration = formatTime((Date.now() - startTime) / 1000);

        const blob = new Blob(recordedChunks, { type: 'audio/ogg; codecs=opus' });

        try {
            setIsSaving(true)
        
            const base64 = await blobToBase64(blob); //console.log('Base64:', base64.length, 'characters');
            const text = document.getElementById('textArea').value;
            const date = new Date();
            const user = currentUser;
            const source = sourceAudio.name;
            const data = { base64, text, date, user, source, duration };

            const jsonString = JSON.stringify(data);
            const sizeInBytes = new Blob([jsonString]).size;
            const sizeInMegabytes = sizeInBytes / 1024 / 1024;
            console.log('Size of request body:', sizeInMegabytes, 'MB');

            if(sizeInMegabytes < 3) {
        
                const json = await postMan('/api/newMix', data);

                handleSavingResult(
                    json, setUserRecords, setAllRecords, setResult, setIsSaving 
                )

            } else { // one of the limitations of the free version of Vercel is that the request body size is limited to 4MB

                const chunkSize = 3 * 1024 * 1024; // 3MB in bytes
                const chunkSizeBase64 = Math.floor(chunkSize * 4 / 3); // Each base64 character encodes 6 bits, so each byte is represented by 4/3 base64 characters
                
                let chunks = [];
                for (let i = 0; i < base64.length; i += chunkSizeBase64) {
                    chunks.push(base64.substring(i, i + chunkSizeBase64));
                }//console.log(chunks);

                let id;

                for (let index = 0; index < chunks.length; index++) {
                    const base64 = chunks[index];

                    if (index === 0) {
                        const firstData = { base64, text, date, user, source, duration };
                        const json = await postMan('/api/newMix', firstData);
                        id = json.x.id;
                    }
                    else {
                        const data = { base64, id }
                        const json = await postMan('modifyBase64', data);
                    }
                }
                handleSavingResult(
                    0, setUserRecords, setAllRecords, setResult, setIsSaving
                )
            }

        } catch (error) {
            console.error('Error:', error);
            setIsSaving(false)
        }
    }
}