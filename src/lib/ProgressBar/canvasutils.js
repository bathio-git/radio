export function drawWaveform(
    canvas, 
    { waveformData, progress, isHovering, hoverPosition }
){

    if (!waveformData.length || !canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate dimensions
    const barWidth = width / waveformData.length;
    const progressPosition = (progress / 100) * width;
    const hoverLinePosition = (hoverPosition / 100) * width;

    // Draw waveform bars
    drawWaveformBars(ctx, {
        waveformData,
        barWidth,
        height,
        progress,
        isHovering,
        hoverLinePosition,
        progressPosition
    });

    // Draw progress line
    drawProgressLine(ctx, progressPosition, height);

    // Draw hover line
    if (isHovering) {
        drawHoverLine(ctx, hoverLinePosition, height);
    }
}

function drawWaveformBars(
    ctx, 
    { waveformData, barWidth, height, progress, isHovering, hoverLinePosition, progressPosition }
){
  
    waveformData.forEach((amplitude, index) => {
        const barHeight = amplitude * height * 0.8;
        const x = index * barWidth;
        const y = (height - barHeight) / 2;

        const barProgress = ((index + 1) / waveformData.length) * 100;
        const isPassed = barProgress <= progress;
        const isHovered = isHovering && x < hoverLinePosition && x >= progressPosition;
        
        let fillColor = '#aaa'; // Default remaining color
        if (isPassed) {
        fillColor = '#333'; // Played portion
        } else if (isHovered) {
        fillColor = '#666'; // Hover preview color
        }
        
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, Math.max(1, barWidth - 1), barHeight);
    });
}

function drawProgressLine(ctx, progressPosition, height) {
  
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(progressPosition, 0);
    ctx.lineTo(progressPosition, height);
    ctx.stroke();
}

function drawHoverLine(ctx, hoverLinePosition, height) {

    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(hoverLinePosition, 0);
    ctx.lineTo(hoverLinePosition, height);
    ctx.stroke();
    ctx.setLineDash([]);
}