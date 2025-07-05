import convertDuration from "@/lib/convertDuration";

export function seekToPosition(
    event, canvasRef, sourceAudio, setProgress
){
    
    const canvas = canvasRef.current;
    const audio = document.getElementById("audioSource");
    
    if (!canvas || !audio || !sourceAudio?.duration) return;
    
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickPercentage = (clickX / rect.width) * 100;
    
    const duration = convertDuration(sourceAudio.duration);
    const newTime = (clickPercentage / 100) * duration;
    
    audio.currentTime = newTime;
    setProgress(clickPercentage);
}