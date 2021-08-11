let areas = {
    a: null,
    b: null,
    c: null
}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
})

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver)
    area.addEventListener('dragleave', dragLeave)
    area.addEventListener('drop', drop)
})

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral)
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral)
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral)

//Functions Item
function dragStart(e) {
    e.currentTarget.classList.add('dragging')
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging')
}

//Functions Area

// Quando passa por uma área dropavel
function dragOver(e) {
    if (e.currentTarget.querySelector('.item') === null) {
        e.preventDefault()
        e.currentTarget.classList.add('hover')
    }
}

//Quando sai de uma área dropavel    
function dragLeave(e) {
    e.currentTarget.classList.remove('hover')
}

//Quando solta no local dropavel   
function drop(e) {
    e.currentTarget.classList.remove('hover')

    if (e.currentTarget.querySelector('.item') === null) {
        let dragItem = document.querySelector('.item.dragging')
        e.currentTarget.appendChild(dragItem)
        updateAreas()
    }
}

//Functions Neutral Area
function dragOverNeutral(e) {
    e.preventDefault()
    e.currentTarget.classList.add('hover')
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover')
}

function dropNeutral(e) {
    e.currentTarget.classList.remove('hover')
    let dragItem = document.querySelector('.item.dragging')
    e.currentTarget.appendChild(dragItem)
    updateAreas()
}

// Logic Functions
function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        let areaName = area.getAttribute('data-name')

        if (area.querySelector('.item') !== null) {
            areas[areaName] = area.querySelector('.item').innerHTML
        } else {
            areas[areaName] = null
        }

    })

    if (areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct')
    }else{
        document.querySelector('.areas').classList.remove('correct')
    }

}