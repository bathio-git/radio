export default function shuffle({context}) {

    let audio = document.getElementById('audioSource')

    context.setLoadingRadio(true)
    audio.addEventListener('playing', () => {
        context.setLoadingRadio(false)
    } , { once: true })   
    
    let x = Math.floor(Math.random() * context.radios.length)
    context.setSourceAudio(context.radios[x])

    setTimeout(() => {
        audio.play()
    }
    , 1000)
}