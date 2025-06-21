export default function playARecord(record, context, isPlaying) {

    const audio = context.getAudio();
                            
    //console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/stream?id=${record._id}`)
    if (audio.src === `${process.env.NEXT_PUBLIC_API_URL}/api/stream?id=${record._id}`) {
        isPlaying ? audio.pause() : audio.play();
    } else {
        context.setLoadingRadio(true)
        audio.addEventListener('playing', () => {
            context.setLoadingRadio(false)
        }
        , { once: true })
        const x = {
        name: record.text,
        slogan: "",
        stream: `${process.env.NEXT_PUBLIC_API_URL}/api/stream?id=${record._id}`,
        radioUrl: "",
        id: record._id,
        duration: record.duration,
        user: record.username,
        };
        context.setSourceAudio(x);
        audio.oncanplaythrough = () => {
            audio.play();
            //console.log(x.stream)
        };
    }
}