import { useEffect, useState } from "react";
import convertDuration from "@/lib/convertDuration";

export function useAudioProgress(sourceAudio) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!sourceAudio || !sourceAudio.duration) return;
    
    const audio = document.getElementById("audioSource");
    const duration = convertDuration(sourceAudio.duration);
    
    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      const timeProgress = Math.min(100, (currentTime / duration) * 100);
      setProgress(timeProgress);
    };
    
    const handleEnded = () => {
      setProgress(100);
    };
    
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [sourceAudio]);

  return { progress, setProgress };
}