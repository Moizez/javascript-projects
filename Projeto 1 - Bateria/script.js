document.body.addEventListener('keyup', event => {
    playSound(event.code.toLocaleLowerCase())
    console.log(event.code)
})

document.querySelector('.composer button').addEventListener('click', () => {
    let song = document.querySelector('#input').value

    if (song) {
        let songArray = song.split('')
        playComposition(songArray)
    }

})

const playSound = sound => {
    let audioElement = document.querySelector(`#s_${sound}`)
    let keyElement = document.querySelector(`div[data-key="${sound}"]`)

    if (audioElement) {
        audioElement.currentTime = 0
        audioElement.play()
    }

    if (keyElement) {

        let color = colorGenerate()
        keyElement.classList.add('active')
        keyElement.style.border = `2px solid ${color}`
        keyElement.style.color = color
        setTimeout(() => {
            keyElement.classList.remove('active')
            keyElement.style.border = '2px solid #FFF'
            keyElement.style.color = '#FFF'
        }, 300);
    }
}

const playComposition = (songArray) => {
    let wait = 0
    for (let songItem of songArray) {

        setTimeout(() => {
            playSound(`key${songItem}`)
        }, wait);
        wait += 250
    }
}

const colorGenerate = () => {
    return '#' + parseInt((Math.random() * 0xFFFFFF))
        .toString(16)
        .padStart(6, '0')
}
