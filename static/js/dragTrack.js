class DragTrack {
    constructor() {
        this.track = document.querySelector("#track");
        this.nodes = document.querySelectorAll(".flex-option");
        this.point = 0;
        this.dragX = 0;
        this.colorize();
        this.onMouseMove = this.onMouseMove.bind(this);
        this.trackLenght = this.resizeTrack();
        this.isMobile = window.detectMobile();
        if (this.trackLenght > window.innerWidth) {
            this.trackInitialize();
        }
    }

    trackInitialize() {
        this.track.style.cursor = "grab"
        this.track.addEventListener(this.isMobile ? 'touchstart' : 'mousedown', e => {
            e.preventDefault()
            const pageX = this.isMobile ? e.changedTouches[0].pageX : e.pageX
            this.dragX <= -100 ? this.point = 0 : this.point = this.dragX + pageX
            this.track.addEventListener(this.isMobile ? 'touchmove' : 'mousemove', this.onMouseMove)
            this.track.style.cursor = "grabbing"
        })
        window.addEventListener(this.isMobile ? 'touchend' : 'mouseup', e => {
            e.preventDefault()
            this.track.removeEventListener(this.isMobile ? 'touchmove' : 'mousemove', this.onMouseMove)
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
        const margin = 30
        this.nodes.forEach((node, index) => {
            if (index === 0) return
            node.style.marginLeft = `${margin}px`
        })

        const trackLength = (this.nodes[0].getBoundingClientRect().width * this.nodes.length) + margin * this.nodes.length + margin
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