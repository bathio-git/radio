import { useState } from "react";

export function useCanvasInteraction() {
    
  const [isHovering, setIsHovering] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(0);

  const handleMouseMove = (event, canvasRef) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const hoverPercentage = (mouseX / rect.width) * 100;
    
    setHoverPosition(hoverPercentage);
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return {
    isHovering,
    hoverPosition,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave
  };
}