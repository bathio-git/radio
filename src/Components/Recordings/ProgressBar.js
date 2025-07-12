import { useContext, useRef, useEffect } from "react";
import { _data } from "../../Context/Context";
import LoadingAnimation from "../Animations/LoadingAnimation";
import { useWaveform } from "@/lib/ProgressBar/useWaveform";
import { useAudioProgress } from "@/lib/ProgressBar/useAudioProgress";
import { useCanvasInteraction } from "@/lib/ProgressBar/useCanvasInteraction";
import { drawWaveform } from "@/lib/ProgressBar/canvasutils";
import { seekToPosition } from "@/lib/ProgressBar/audioUtils";

export default function ProgressBar( {record}) {

  const {sourceAudio, sourceNode} = useContext(_data); 
  const canvasRef = useRef(null);

  const { waveformData, isLoadingWaveform } = useWaveform(sourceAudio, sourceNode);

  const { progress, setProgress } = useAudioProgress(sourceAudio);

  const {
        isHovering,hoverPosition, handleMouseMove,handleMouseEnter,handleMouseLeave
  } = useCanvasInteraction();

  function handleCanvasClick (event){

        seekToPosition( event, canvasRef, sourceAudio, setProgress)
  };

  function handleMouseMoveWithRef (event){ handleMouseMove(event, canvasRef) };

  // Draw waveform on canvas
  useEffect(() => {
    drawWaveform(
        canvasRef.current, 
        {
            waveformData,
            progress,
            isHovering,
            hoverPosition
        }
    );}, [waveformData, progress, isHovering, hoverPosition]);

  return (
    <div className="relative my-3 mx-4 w-[50%] h-12 bg-black rounded-md overflow-hidden cursor-pointer">
      {isLoadingWaveform ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          width={400}
          height={48}
          className="w-full h-full"
          style={{ display: 'block' }}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMoveWithRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
      {/*  Add a subtle overlay for better visual depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-transparent opacity-20"></div>
    </div>
  );
}


































// import { _data } from "../../Context/Context";
// import convertDuration from "@/lib/convertDuration";
// import LoadingAnimation from "../LoadingAnimation";
// import { useEffect, useState, useContext, useRef } from "react";

// export default function ProgressBar() {

//   const context = useContext(_data);
  
//   const [progress, setProgress] = useState(0);
//   const [waveformData, setWaveformData] = useState([]);
//   const [isHovering, setIsHovering] = useState(false);
//   const [hoverPosition, setHoverPosition] = useState(0);
//   const [isLoadingWaveform, setIsLoadingWaveform] = useState(false);

//   const canvasRef = useRef(null);

//   // Generate waveform data from audio
//   useEffect(() => {
//     if (!context.sourceAudio || !context.sourceAudio.duration) return;

//     const generateWaveform = async () => {
//       setIsLoadingWaveform(true);
//       const audio = document.getElementById("audioSource");
      
//       if (audio && audio.src) {
//         try {
//           // Create audio context for analysis
//           const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//           const response = await fetch(audio.src);
//           const arrayBuffer = await response.arrayBuffer();
//           const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          
//           // Analyze audio data - samples based on duration for proper density
//           const channelData = audioBuffer.getChannelData(0);
//           const duration = audioBuffer.duration;
          
//           // Calculate samples based on duration to maintain proper visual density
//           // More samples for longer tracks, fewer for shorter tracks
//           const samplesPerSecond = 20; // Base density: 20 samples per second
//           const samples = Math.max(50, Math.min(400, Math.floor(duration * samplesPerSecond)));
          
//           const totalSamples = channelData.length;
//           const samplesPerBar = totalSamples / samples;
//           const waveform = [];
          
//           for (let i = 0; i < samples; i++) {
//             let sum = 0;
//             let count = 0;
//             const startSample = Math.floor(i * samplesPerBar);
//             const endSample = Math.floor((i + 1) * samplesPerBar);
            
//             for (let j = startSample; j < endSample && j < totalSamples; j++) {
//               sum += Math.abs(channelData[j]);
//               count++;
//             }
            
//             waveform.push(count > 0 ? sum / count : 0);
//           }
          
//           // Normalize waveform data
//           const maxVal = Math.max(...waveform);
//           const normalizedWaveform = waveform.map(val => val / maxVal);
//           setWaveformData(normalizedWaveform);
//           setIsLoadingWaveform(false);
//         } catch (error) {
//           console.error('Error generating waveform:', error);
//           // Fallback to demo waveform
//           generateFallbackWaveform();
//         }
//       } else {
//         // Generate demo waveform
//         generateFallbackWaveform();
//       }
//     };

//     const generateFallbackWaveform = () => {
//       const duration = context.sourceAudio?.duration || 60; // Default to 60 seconds if unknown
//       const samplesPerSecond = 20;
//       const samples = Math.max(50, Math.min(400, Math.floor(duration * samplesPerSecond)));
      
//       const fallbackWaveform = Array.from({ length: samples }, () => {
//         // Generate more realistic waveform pattern
//         return Math.random() * 0.3 + 0.1 + Math.sin(Math.random() * 10) * 0.2;
//       });
//       setWaveformData(fallbackWaveform);
//       setIsLoadingWaveform(false);
//     };

//     generateWaveform();
//   }, [context.sourceAudio]);

//   // Handle click to seek
//   const handleCanvasClick = (event) => {
//     const canvas = canvasRef.current;
//     const audio = document.getElementById("audioSource");
    
//     if (!canvas || !audio || !context.sourceAudio?.duration) return;
    
//     const rect = canvas.getBoundingClientRect();
//     const clickX = event.clientX - rect.left;
//     const clickPercentage = (clickX / rect.width) * 100;
    
//     // Calculate the new time position
//     const duration = convertDuration(context.sourceAudio.duration);
//     const newTime = (clickPercentage / 100) * duration;
    
//     // Seek to the new position
//     audio.currentTime = newTime;
//     setProgress(clickPercentage);
//   };

//   // Handle mouse movement for hover effect
//   const handleMouseMove = (event) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
    
//     const rect = canvas.getBoundingClientRect();
//     const mouseX = event.clientX - rect.left;
//     const hoverPercentage = (mouseX / rect.width) * 100;
    
//     setHoverPosition(hoverPercentage);
//   };

//   const handleMouseEnter = () => setIsHovering(true);
//   const handleMouseLeave = () => setIsHovering(false);

//   // Handle audio progress
//   useEffect(() => {
//     if (!context.sourceAudio || !context.sourceAudio.duration) return;
    
//     let audio = document.getElementById("audioSource");
//     const duration = convertDuration(context.sourceAudio.duration);
    
//     function handleTimeUpdate() {
//       const currentTime = audio.currentTime;
//       // Calculate progress as a percentage of the total duration
//       const timeProgress = Math.min(100, (currentTime / duration) * 100);
//       setProgress(timeProgress);
//     }
    
//     function handleEnded() {
//       setProgress(100); // Ensure progress is exactly 100% when audio ends
//     }
    
//     if (audio) {
//       audio.addEventListener("timeupdate", handleTimeUpdate);
//       audio.addEventListener("ended", handleEnded);
//       return () => {
//         audio.removeEventListener("timeupdate", handleTimeUpdate);
//         audio.removeEventListener("ended", handleEnded);
//       };
//     }
//   }, [context.sourceAudio]);

//   // Draw waveform on canvas
//   useEffect(() => {
//     if (!waveformData.length || !canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const width = canvas.width;
//     const height = canvas.height;

//     // Clear canvas
//     ctx.clearRect(0, 0, width, height);

//     // Calculate bar dimensions
//     const barWidth = width / waveformData.length;
//     // Progress position should be proportional to the visual waveform, not just time
//     const progressPosition = (progress / 100) * width;
//     const hoverLinePosition = (hoverPosition / 100) * width;

//     // Draw waveform bars
//     waveformData.forEach((amplitude, index) => {
//       const barHeight = amplitude * height * 0.8; // 80% of canvas height
//       const x = index * barWidth;
//       const y = (height - barHeight) / 2;

//       // Choose color based on progress and hover state
//       // Each bar represents an equal portion of the total audio time
//       const barProgress = ((index + 1) / waveformData.length) * 100;
//       const isPassed = barProgress <= progress;
//       const isHovered = isHovering && x < hoverLinePosition && x >= progressPosition;
      
//       let fillColor = '#aaa'; // Default remaining color
//       if (isPassed) {
//         fillColor = '#333'; // Played portion
//       } else if (isHovered) {
//         fillColor = '#666'; // Hover preview color
//       }
      
//       ctx.fillStyle = fillColor;
      
//       // Draw bar with rounded corners effect
//       ctx.fillRect(x, y, Math.max(1, barWidth - 1), barHeight);
//     });

//     // Draw progress line
//     ctx.strokeStyle = '#333';
//     ctx.lineWidth = 2;
//     ctx.beginPath();
//     ctx.moveTo(progressPosition, 0);
//     ctx.lineTo(progressPosition, height);
//     ctx.stroke();

//     // Draw hover line when hovering
//     if (isHovering) {
//       ctx.strokeStyle = '#666';
//       ctx.lineWidth = 1;
//       ctx.setLineDash([2, 2]);
//       ctx.beginPath();
//       ctx.moveTo(hoverLinePosition, 0);
//       ctx.lineTo(hoverLinePosition, height);
//       ctx.stroke();
//       ctx.setLineDash([]); // Reset dash
//     }

//   }, [waveformData, progress, isHovering, hoverPosition]);

//   return (
//     <>
//       <div className="relative my-3 mx-4 w-[50%] h-12 bg-black rounded-md overflow-hidden cursor-pointer">
//         {isLoadingWaveform ? (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <LoadingAnimation />
//           </div>
//         ) : (
//           <canvas
//             ref={canvasRef}
//             width={400}
//             height={48}
//             className="w-full h-full"
//             style={{ display: 'block' }}
//             onClick={handleCanvasClick}
//             onMouseMove={handleMouseMove}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           />
//         )}
        
//         {/* Optional: Add a subtle overlay for better visual depth */}
//         <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-transparent opacity-20"></div>
//       </div>
//     </>
//   );
// }