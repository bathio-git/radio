export default function timeLimit({recorder, setIsRecording, setStartTime}) {
    
	const timeoutId = setTimeout(() => {

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
            setIsRecording(false);
        }
        messageElement.appendChild(cancelButton);

        setStartTime('10min')

        //make some noise to get the user's attention
        const context = window.audioContext;
        const oscillator = context.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(220, context.currentTime);
        oscillator.connect(context.destination);
        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
        }, 500);
    }, 600000);

    return timeoutId;
}
