export default function connectAudio(element) {

    //console.log("I'm trying to connect", element , "to audioContext")

    if(window.audioContext){
        //console.log(window.audioContext, 'already exists, reusing it')
    }

    if (element.isConnectedToNode) {
        //console.log(element, 'already connected to audioContext')
        return element.sourceNode
    }
    

    if (!window.audioContext) {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        //console.log('Just created ', window.audioContext)
    }

    if (!element.sourceNode) {
        element.sourceNode = window.audioContext.createMediaElementSource(element);
        element.sourceNode.connect(window.audioContext.destination);
        element.isConnectedToNode = true;
        //console.log('Just connected audioContext to', element )
    } 

    return element.sourceNode
}