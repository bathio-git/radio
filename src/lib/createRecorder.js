export default function createRecorder(sourceNode){

    if (!sourceNode) return;
    //console.log('I am creating a new recorder for', sourceNode, )
    const destination = sourceNode.context.createMediaStreamDestination();
    //console.log('The',sourceNode , 'is connected to', destination)
    sourceNode.connect(destination);
    const mediaRecorder = new MediaRecorder(destination.stream);

    return mediaRecorder;
}