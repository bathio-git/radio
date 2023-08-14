export default function shuffle({context}) {

    let audio = document.getElementById('audioSource')
    let x = Math.floor(Math.random() * context.radios.length)
    context.setSourceAudio(context.radios[x])

    setTimeout(() => {
        audio.play()
    }
    , 1000)
}