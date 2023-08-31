//function that converts the duration from string to seconds

export default function convertDuration(duration) {
    
    const timeParts = duration.split(':');
    const minutes = parseInt(timeParts[0], 10);
    const seconds = parseInt(timeParts[1], 10);
    const durationInSeconds = minutes * 60 + seconds;
    return durationInSeconds;
}