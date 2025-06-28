export default function timeLimit({recorder, setShowSave, setIsRecording, setStartTime}) {
    
    const timeoutId = setTimeout(() => {
        
        setIsRecording(false);

        if (recorder.state === "active") recorder.pause();
        
        
        const messageElement = document.getElementById('message');
        messageElement.style.display = 'block';
        messageElement.innerHTML = "It's been 10min... Recording stopped";
        messageElement.appendChild(document.createElement('br'));

        // create a cancel button
        const cancelButton = document.createElement('button');
        cancelButton.textContent = "I don't want to save";
        cancelButton.style.cursor = 'pointer';

        cancelButton.onmouseover = () => {
            cancelButton.style.borderBottom = '1px solid';
            cancelButton.style.paddingBottom = '2px'; 
        }
        cancelButton.onmouseout = () => {
            cancelButton.style.borderBottom = 'none';
        }

        cancelButton.onclick = () => {
            messageElement.style.display = 'none';
            setShowSave('displayNone');
        }
        messageElement.appendChild(cancelButton);

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
            setShowSave('showSave')
        }, 500);
    }, 600000);

    return timeoutId;
}