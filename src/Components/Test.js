export default function Test() {


    return (
        <div>
            <h1>Test Audio</h1>
            <audio controls>
                <source 
                    src="http://localhost:3000/api/getMixStream?id=64b6c2d66aefcf0568226755" 
                    type="audio/ogg; codecs=opus" />
            </audio>
        </div>
    );
}