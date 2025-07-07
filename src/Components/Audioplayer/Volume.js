import React, { useState, useRef, useCallback } from 'react';

export default function Volume() {
  const [volume, setVolume] = useState(50); // Volume from 0 to 125
  const [isDragging, setIsDragging] = useState(false);
  const triangleRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    updateVolume(e);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      updateVolume(e);
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const updateVolume = (e) => {
    if (triangleRef.current) {
      const rect = triangleRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = Math.max(0, Math.min(100, (x / width) * 100));
      
      // Map percentage to volume scale (0-125)
      const newVolume = Math.round((percentage / 100) * 125);
      setVolume(newVolume);
      
      // Update audio element volume
      const audio = document.getElementById('audioSource');
      if (audio) {
        // Convert volume (0-125) to audio volume (0-1)
        // Standard audio volume is 0-1, but we can allow boost up to 1.25
        const audioVolume = Math.min(newVolume / 100, 1.25);
        audio.volume = Math.min(audioVolume, 1); // Browser limit is 1.0
        
        // For volumes above 100, you might want to apply additional gain
        // This would require Web Audio API for actual boost beyond 1.0
        if (newVolume > 100 && window.AudioContext) {
          // Optional: Implement Web Audio API gain for boost
          console.log(`Boost volume requested: ${newVolume}% (${audioVolume})`);
        }
      }
    }
  };

  // Convert volume to percentage for positioning
  const volumePercentage = (volume / 125) * 100;

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Initialize audio volume when component mounts
  React.useEffect(() => {
    const audio = document.getElementById('audioSource');
    if (audio) {
      const audioVolume = Math.min(volume / 100, 1);
      audio.volume = audioVolume;
    }
  }, []);

  return (
    <div className="flex items-center justify-center bg-black grayscale">
      <div className="relative">
        {/* Triangle Fader */}
        <div
          ref={triangleRef}
          className="border border-gray-500 cursor-pointer relative"
          style={{
            width: '72px',
            height: '8px',
            border: '3px solid #000',
            background: 'linear-gradient(to right, #007802 0%, #00CE72 30%, #FFD100 60%, #FFD100 68%, #DE1B1B 100%)'
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Volume indicator line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg transition-all duration-75"
            style={{
              left: `${volumePercentage}%`,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
            }}
          />
          {/* Volume indicator handle */}
          <div
            className="absolute w-2 h-2 bg-white rounded-full border border-gray-300 shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
            style={{
              left: `${volumePercentage}%`,
              top: '50%',
              boxShadow: isDragging ? '0 0 15px rgba(255, 255, 255, 1)' : '0 0 8px rgba(255, 255, 255, 0.6)'
            }}
          />
        </div>
      </div>
    </div>
  );
}