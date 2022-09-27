const track = document.querySelector("#track")
const nodes = document.querySelectorAll(".flex-option")


let point = 0
let dragX = 0


function colorize() {
    const prefix = "008"
    let color = 744
    const nodes = document.querySelectorAll(".upper-tab")
    nodes.forEach(el => {
        el.style.backgroundColor = "#" + prefix + color
        color += 10
    })
}

function resizeTrack() {
    const margin = 30
    nodes.forEach((node, index) => {
        if (index === 0) return
        node.style.marginLeft = `${margin}px`
    })

    const trackLength = (nodes[0].getBoundingClientRect().width * nodes.length) + margin * nodes.length + margin
    track.style.width = `${trackLength}px`
    return trackLength
}

function onMouseMove(event) {
    const startPoint = dragX
    dragX = point - event.clientX

    const leftOffset = dragX > 0
    const rightOffset = track.getBoundingClientRect().right > (window.innerWidth / 1.3)

    if ((leftOffset && rightOffset) || (!rightOffset && dragX < startPoint)) {
        track.style.transform = `translate3d(${-dragX}px, 0, 0)`
    } else {
        dragX = startPoint
    }
}

function trackInit() {
    const trackLen = resizeTrack()
    if (trackLen > window.innerWidth) {
        track.style.cursor = "grab"
        track.addEventListener('mousedown', e => {
            e.preventDefault()
            if (dragX <= -100) point = 0
            else point = dragX + e.pageX
            track.addEventListener('mousemove', onMouseMove)
            track.style.cursor = "grabbing"
        })

        window.addEventListener('mouseup', e => {
            e.preventDefault()
            track.removeEventListener('mousemove', onMouseMove)
            track.style.cursor = "grab"
        })
    }
}

colorize()
trackInit()