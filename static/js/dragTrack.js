

class DragTrack {
    constructor() {
        this.track = document.querySelector("#track");
        this.track.style.display = "flex"

        this.gap = 30
        this.track.style.gap = `${this.gap}px`

        this.nodes = document.querySelectorAll(".flex-option");

        this.point = 0;
        this.dragX = 0;
        this.colorize();
        this.onMouseMove = this.onMouseMove.bind(this);
        this.trackLenght = this.resizeTrack();

        this.track.style.width = this.trackLenght + "px"

        this.isMobile = window.detectMobile();
        if (this.trackLenght > window.innerWidth / 2) {
            this.trackInitialize();
        }
    }

    trackInitialize() {
        if (this.isMobile) {
            this.track.parentElement.style.overflowX = "scroll"
            this.track.parentElement.style.width = "100%"
        }

        this.track.style.cursor = "grab"
        this.track.addEventListener('mousedown', e => {
            e.preventDefault()
            this.track.style.cursor = "grabbing"
            const pageX = e.pageX
            this.dragX <= -100 ? this.point = 0 : this.point = this.dragX + pageX
            this.track.addEventListener('mousemove', this.onMouseMove)
        })
        window.addEventListener('mouseup', e => {
            e.preventDefault()
            this.track.removeEventListener('mousemove', this.onMouseMove)
            this.track.style.cursor = "grab"
        })
    }

    colorize() {
        const prefix = "008"
        let color = 744
        const nodes = document.querySelectorAll(".upper-tab")
        nodes.forEach(el => {
            el.style.backgroundColor = "#" + prefix + color
            color += 10
        })
    }

    resizeTrack() {
        const trackLength = (this.nodes[0].getBoundingClientRect().width * this.nodes.length) + this.gap * this.nodes.length - 1
        this.track.style.width = `${trackLength}px`
        return trackLength
    }

    onMouseMove(event) {
        const startPoint = this.dragX
        const Xclient = this.isMobile ? event.touches[0].clientX : event.clientX
        this.dragX = this.point - Xclient

        const leftOffset = this.dragX > 0
        const rightOffset = this.track.getBoundingClientRect().right > (window.innerWidth / 1.3)

        if ((leftOffset && rightOffset) || (!rightOffset && this.dragX < startPoint)) {
            this.track.style.transform = `translate3d(${-this.dragX}px, 0, 0)`
        } else {
            this.dragX = startPoint
        }
    }
}

new DragTrack()