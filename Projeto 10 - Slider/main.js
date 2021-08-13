let slides = document.querySelectorAll('.slider--item').length
let height = `${document.querySelector('.slider').clientHeight}px`
let currentSlide = 0

console.log(height)

document.querySelector('.slider--width').style.width = `calc(100vw * ${slides})`
document.querySelector('.slider--controls').style.height = height


const goPrev = () => {
    currentSlide--
    if (currentSlide < 0) {
        currentSlide = slides - 1
    }
    updateMargin()
}


const goNext = () => {
    currentSlide++
    if (currentSlide > (slides - 1)) {
        currentSlide = 0
    }
    updateMargin()
}

const updateMargin = () => {

    let width = document.querySelector('.slider--item').clientWidth

    let newMargin = (currentSlide * width)
    document.querySelector('.slider--width').style.marginLeft = `-${newMargin}px`
}

setInterval(goNext, 4000)