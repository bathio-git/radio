import { useEffect, useState, useContext } from "react";
import { _data } from "../../Context/Context";


export function useWaveform() {

    const [waveformData, setWaveformData] = useState([]);
    const [isLoadingWaveform, setIsLoadingWaveform] = useState(false);
    const context = useContext(_data);
    
    useEffect(() => {
        if (!context.sourceAudio || !context.sourceAudio.duration) return;
        generateWaveform(setIsLoadingWaveform, setWaveformData, context);
    }, [context.sourceAudio]);
        
    return { waveformData, isLoadingWaveform };
}
    
async function generateWaveform( setIsLoadingWaveform, setWaveformData, context ){

     function generateFallbackWaveform() {

        const duration = 60; // Default to 60 seconds if unknown
        const samplesPerSecond = 20;
        const samples = Math.max(50, Math.min(400, Math.floor(duration * samplesPerSecond)));
        
        const fallbackWaveform = Array.from({ length: samples }, () => {
            // Generate more realistic waveform pattern
            return Math.random() * 0.3 + 0.1 + Math.sin(Math.random() * 10) * 0.2;
        });
        
        setWaveformData(fallbackWaveform);
        setIsLoadingWaveform(false);
    }
    
    setIsLoadingWaveform(true);
    const audio = context.getAudio();
    if (audio && audio.src) {
    try {
      
        const audioContext = window.audioContext
        const response = await fetch(audio.src);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        // Analyze audio data - samples based on duration for proper density
        const channelData = audioBuffer.getChannelData(0);
        const duration = audioBuffer.duration;
        // Calculate samples based on duration to maintain proper visual density
        // More samples for longer tracks, fewer for shorter tracks
        const samplesPerSecond = 20; // Base density: 20 samples per second
        const samples = Math.max(50, Math.min(400, Math.floor(duration * samplesPerSecond)));
        const totalSamples = channelData.length;
        const samplesPerBar = totalSamples / samples;
        const waveform = [];

        for (let i = 0; i < samples; i++) {

            let sum = 0;
            let count = 0;
            const startSample = Math.floor(i * samplesPerBar);
            const endSample = Math.floor((i + 1) * samplesPerBar);
            for (let j = startSample; j < endSample && j < totalSamples; j++) {
            sum += Math.abs(channelData[j]);
            count++;
            }
            waveform.push(count > 0 ? sum / count : 0);
        }

        // Normalize waveform data
        const maxVal = Math.max(...waveform);
        const normalizedWaveform = waveform.map(val => val / maxVal);
        setWaveformData(normalizedWaveform);
        setIsLoadingWaveform(false);
    } catch (error) {
        console.error('Error generating waveform:', error);
        // Fallback to demo waveform
        generateFallbackWaveform();
    }
    } else {
        // Generate demo waveform
        generateFallbackWaveform()
    }
};