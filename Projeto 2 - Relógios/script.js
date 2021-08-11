let digitalElement = document.querySelector('.digital')
let segElement = document.querySelector('.p_s')
let minElement = document.querySelector('.p_m')
let horElement = document.querySelector('.p_h')

const updateClock = () => {

    let now = new Date()

    let second = now.getSeconds()
    let minute = now.getMinutes()
    let hour = now.getHours()

    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`

    let segDeg = ((360 / 60) * second) - 90
    let minDeg = ((360 / 60) * minute) - 90
    let houDeg = ((360 / 12) * hour) - 90

    segElement.style.transform = `rotate(${segDeg}deg)`
    minElement.style.transform = `rotate(${minDeg}deg)`
    horElement.style.transform = `rotate(${houDeg}deg)`

}

const fixZero = time => time < 10 ? `0${time}` : time

setInterval(updateClock, 1000)
updateClock()
