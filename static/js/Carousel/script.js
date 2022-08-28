class Carousel {
    constructor(root, params = {initialSlide: 0}) {
        this.element = root
        this.children = root.childElementCount
        this.current = params.initialSlide


        this.dragStop = this.dragStop.bind(this)
        this.dragStart = this.dragStart.bind(this)
        this.dragMove = this.dragMove.bind(this)
        this.setPositioning = this.setPositioning.bind(this)

        this.addAdditionalStyling = this.addAdditionalStyling.bind(this)
        this.removeAdditionalStyling = this.removeAdditionalStyling.bind(this)

        this.moveLeft = this.moveLeft.bind(this)
        this.moveRight = this.moveRight.bind(this)

        this.manageHTML()
        this.setParams()
        this.setEvents()
    }

    moveLeft() {
        if (this.current > 0) {
            this.current -= 1
            this.setParams()
        }
    }

    moveRight() {
        if (this.current + 1 < this.NodesArr.length) {
            this.current += 1
            this.setParams()
        }
    }

    setParams() {
        this.width = this.element.getBoundingClientRect().width
        this.track.style.width = `${this.width * this.children}px`
        this.NodesArr.forEach((slide) => {
            slide.style.width = this.width + "px"
        })
        this.xPosition = -this.width * this.current
        this.setPositioning(this.xPosition)
    }

    setEvents() {
        window.addEventListener("resize", () => this.setParams())

        this.track.addEventListener("pointerdown", e => this.dragStart(e))
        window.addEventListener("pointerup", () => this.dragStop())
    }

    dragStart(event) {
        // prevents any text highlights
        // and other default browser actions
        event.preventDefault()

        this.click = event.pageX
        this.startX = this.xPosition

        this.addAdditionalStyling()
        window.addEventListener("pointermove", this.dragMove)
    }

    dragStop() {
        window.removeEventListener("pointermove", this.dragMove)

        const gap = this.xPosition - this.startX
        if (gap > 150 && this.current > 0) {
            this.current -= 1
        }
        else if (gap < -150 && (this.current <= this.NodesArr.length - 2)) {
            this.current += 1
        }

        this.xPosition = -this.width * this.current

        this.removeAdditionalStyling()
        this.setPositioning(this.xPosition)
    }

    dragMove(e) {
        this.DragX = e.pageX;
        const shift = this.DragX - this.click

        this.xPosition = shift + this.startX
        this.setPositioning(this.xPosition)
    }

    setPositioning(pixels) {
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
}