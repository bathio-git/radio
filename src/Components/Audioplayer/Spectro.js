import { useContext, useEffect, useState } from "react"
import { _data } from "../../Context/Context"


export default function  Spectro ({size}) {

    const context = useContext(_data)
    const [ positionStyle, setPositionStyle ] = useState(null)

    useEffect(() => {
        
        size.width > 640 ? setPositionStyle('fixed') : setPositionStyle('absolute')
    }, [size])

    useEffect(() => {

        if (context.sourceNode) {

            const analyser = window.audioContext.createAnalyser();
            context.sourceNode.connect(analyser);
            analyser.fftSize = 512;

            const bufferLength = analyser.frequencyBinCount;
            const timeData = new Uint8Array(bufferLength);
            
            drawTimeData(timeData)

            function drawTimeData(timeData) {

                const WIDTH = window.innerHeight; 
                const HEIGHT = 350; 
                
                const canvas = document.querySelector('canvas');
                canvas.width = WIDTH;
                canvas.height = HEIGHT;
                
                analyser.getByteTimeDomainData(timeData);
                
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, WIDTH, HEIGHT);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#AAA';
                ctx.beginPath();
                const sliceWidth = WIDTH / bufferLength;
                
                //

                let x = 0;
                
                timeData.forEach((data, i) => {
                    const v = data / 256
                    const y = (v * HEIGHT)
                    ctx.lineTo(x, y )
                    x += sliceWidth
                });

                //

                ctx.stroke();
                requestAnimationFrame(() => drawTimeData(timeData));
            }
        }

    }, [context.sourceNode]);

    return(
        <div 
            style={{
                position: positionStyle,
                top: `0`, 
                left: '100vw',
                transform: `rotate(90deg)`,
                transformOrigin: `top left`,
                display: positionStyle === 'fixed' ? 'block' : 'none',
            }}
            className="z-0 md:z-20"
        >
                <canvas ></canvas>
        </div>
    )
}