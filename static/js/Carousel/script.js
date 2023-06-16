class Carousel {
    constructor(root, params = {initialSlide: 0, gap: 20, dots: true}) {
        this.element = root
        this.children = root.childElementCount
        this.current = params.initialSlide
        this.gapBetween = params.gap

        this.moveOneStep = this.moveOneStep.bind(this)
        this.moveLeft = this.moveLeft.bind(this)
        this.moveRight = this.moveRight.bind(this)

        this.dragStop = this.dragStop.bind(this)
        this.dragStart = this.dragStart.bind(this)
        this.dragMove = this.dragMove.bind(this)
        this.setPositioning = this.setPositioning.bind(this)

        this.addAdditionalStyling = this.addAdditionalStyling.bind(this)
        this.removeAdditionalStyling = this.removeAdditionalStyling.bind(this)

        this.manageHTML()
        this.setParams()
        this.setEvents()

        if (params.dots) {
            this.drawDots = this.drawDots.bind(this)
            this.drawDots()
        }
    }

    setParams() {
        this.width = this.element.getBoundingClientRect().width

        this.track.style.width = `${this.width * this.children + (this.children - 1) * this.gapBetween}px`
        this.track.style.display = "flex"
        this.track.style.gap = this.gapBetween + "px"

        this.track.style.overflow = "hidden"

        this.NodesArr.forEach((slide) => {
            slide.style.width = this.width + "px"
        })
        this.xPosition = -this.width * this.current
        this.xMax = -(this.children - 1) * this.width
        this.setPositioning(this.xPosition)
    }

    setEvents() {
        window.addEventListener("resize", e => this.setParams(e))

        // mouse events
        this.track.addEventListener("mousedown", e => this.dragStart(e))
        window.addEventListener("mouseup", e => this.dragStop(e))

        // touch events
        this.track.addEventListener("touchstart", e => this.dragStart(e))
        window.addEventListener("touchend", e => this.dragStop(e))
    }

    dragStart(event) {
        // prevents any text highlights
        // and other default browser actions
        event.preventDefault()

        const touchType = event.type === "touchstart"
        if (touchType)
            this.click = event.touches[0].clientX
        else
            this.click = event.pageX
        this.startX = this.xPosition

        this.addAdditionalStyling()
        if (touchType) {
            window.addEventListener("touchmove", this.dragMove)
            return
        }
        window.addEventListener("mousemove", this.dragMove)
    }

    dragStop(e) {
        e.type === "touchend"
            ? window.removeEventListener("touchmove", this.dragMove)
            : window.removeEventListener("mousemove", this.dragMove)

        const gap = this.xPosition - this.startX
        if (gap > 150 && this.current > 0) {
            this.current -= 1
        } else if (gap < -150 && (this.current <= this.NodesArr.length - 2)) {
            this.current += 1
        }

        this.xPosition = -this.width * this.current

        this.removeAdditionalStyling()
        this.setPositioning(this.xPosition)
    }

    dragMove(e) {
        if (e.type === "touchmove")
            this.DragX = e.touches[0].clientX
        else
            this.DragX = e.pageX

        const shift = this.DragX - this.click
        const easing = shift / 5

        this.xPosition = Math.max(Math.min(shift + this.startX, easing), this.xMax + easing)
        this.setPositioning(this.xPosition)
    }

    setPositioning(pixels) {
        pixels -= this.gapBetween * this.current
        this.track.style.transform = `translate3d(${pixels}px, 0, 0)`
    }

    manageHTML() {
        this.element.classList.add("carousel__wrapper")
        this.element.innerHTML = `
            <div class="carousel-track">
               ${this.element.innerHTML}
            </div>
        `
        this.track = this.element.querySelector(".carousel-track")

        this.NodesArr = Array.from(this.track.children).map((child) => {
            return this.wrapChild({
                element: child,
                classname: "carousel-slide"
            })
        })
    }

    wrapChild({element, classname}) {
        const wrapper = document.createElement('div')
        wrapper.classList.add(classname)

        element.parentNode.insertBefore(wrapper, element)
        wrapper.appendChild(element)

        return wrapper
    }

    addAdditionalStyling() {
        this.track.style.transition = null
        this.track.style.cursor = "grabbing"
    }

    removeAdditionalStyling() {
        this.track.style.cursor = 'grab'
        this.track.style.transition = '0.3s ease-out all'
    }

    moveLeft() {
        if (this.current > 0) {
            this.current -= 1
            this.xPosition = -this.width * this.current
            this.setPositioning(this.xPosition)
        }
    }

    moveRight() {
        if (this.current < this.children - 1) {
            this.current += 1
            this.xPosition = -this.width * this.current
            this.setPositioning(this.xPosition)
        }
    }

    moveOneStep(directionString) {
        directionString === "right"
            ? this.moveRight()
            : this.moveLeft()
    }

    drawDots() {
        const dotsWrapper = document.createElement('div')
        dotsWrapper.classList.add('dots-wrapper')

        for (let i = 0; i < this.children; i++) {
            const dot = document.createElement('div')
            dot.classList.add("dot")
            dot.addEventListener("click", () => {
                this.current = i
                this.xPosition = -this.width * this.current
                this.setPositioning(this.xPosition)
            })
            dotsWrapper.appendChild(dot)
        }

        this.element.after(dotsWrapper)
    }
}


const gallery = document.querySelector("#gallery")

const buttonRight = document.querySelector("[data-direction=right]")
const buttonLeft = document.querySelector("[data-direction=left]")
const buttons = [buttonLeft, buttonRight]

const instance = new Carousel(gallery)

buttons.forEach(buttonElem => {
    buttonElem.addEventListener("click", e => {
        instance.moveOneStep(e.target.dataset.direction)
    })
})