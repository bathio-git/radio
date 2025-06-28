import { useState, useEffect } from "react";

export default function ClockAnimation({ size = 80, isRecording }) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const totalSeconds = 600; // 10 minutes

    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
        let interval;
        if (isRecording && secondsElapsed < totalSeconds) {
            interval = setInterval(() => {
                setSecondsElapsed(prev => prev + 1);
            }, 1000);
        }
        if (!isRecording) {
            setSecondsElapsed(0); // Reset when not recording
        }
        return () => clearInterval(interval);
    }, [isRecording, secondsElapsed, totalSeconds]);

    const secondsLeft = Math.max(0, totalSeconds - secondsElapsed);
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const timeLeft = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    const [hover, setHover] = useState(false);

    return (
        <div
            className="clock-animation"
            style={{ width: size, height: size, position: "relative" }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <svg width={size} height={size} viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#eee"
                    strokeWidth="12"
                    fill="none"
                />
                {/* Progress circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#aa0000"
                    strokeWidth="15"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - secondsElapsed / totalSeconds)}
                    className="progress-ring"
                    
                />
            </svg>
            {hover && (
                <div
                    className="clock-tooltip"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -120%)",
                        background: "#222",
                        color: "#fff",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "1rem",
                        pointerEvents: "none",
                        whiteSpace: "nowrap",
                        zIndex: 10,
                    }}
                >
                    {timeLeft === '10:00'?'00:00': timeLeft} left
                </div>
            )}
            <style jsx>{`
                .clock-animation {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .progress-ring {
                    transform: rotate(-90deg);
                    transform-origin: 50% 50%;
                }
            `}</style>
        </div>
    );
}