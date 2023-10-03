import { useContext, useEffect, useState } from "react"
import { _data } from "../../Context/Context"


export default function  Spectro ({size}) {

    const context = useContext(_data)
    const [ position, setPosition ] = useState({top: 0, left: 0})
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

    useEffect(() => {

        function getVolumePos(){
            
            if(document.getElementById('volumeUp')){
                const rect = document.getElementById('volumeUp').getBoundingClientRect();
                setPosition({top: rect.bottom, left: rect.left})
            }
        }
        getVolumePos();
        window.addEventListener('resize', getVolumePos);
        return () => window.removeEventListener('resize', getVolumePos)
    }, [])

    return(
        <div 
            style={{
                position: positionStyle,
                top: `0`, 
                left: '100vw',
                transform: `rotate(90deg)`,
                transformOrigin: `top left`,
            }}
            className="z-0 md:z-20"
        >
                <canvas ></canvas>
        </div>
    )
}


function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };
}
