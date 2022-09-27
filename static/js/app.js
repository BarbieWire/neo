const navTrack = document.querySelector("#navbar")
const linksArr = document.querySelectorAll(".nav-link:not(.bold)")

const galleryContainer = document.querySelector('#gallery-container')
const gallery = document.querySelector("#gallery")

const exploreButton = document.querySelector('#expl-more-btn')
const mainSection = document.querySelector("#main")
const scrollTop = document.querySelector("#scrollTop")


function trackScrollbar() {
    if (window.scrollY > 230) {
        navTrack.classList.add("active")
        scrollTop.classList.add("active")
        linksArr.forEach((node) => node.classList.add('color'))
    } else if (window.scrollY < 230 && navTrack.classList.contains('active')) {
        navTrack.classList.remove("active")
        scrollTop.classList.remove("active")
        linksArr.forEach((node) => node.classList.remove('color'))
    }
}


function main() {
    const carousel = new Carousel(gallery)
    galleryContainer.addEventListener('click', (event) => {
        if (event.target.dataset && event.target.dataset?.direction) {
            event.target.dataset.direction === 'left'
                ? carousel.moveLeft()
                : carousel.moveRight()
        }
    })

    window.addEventListener("scroll", trackScrollbar)
    exploreButton.addEventListener("click", () => mainSection.scrollIntoView())
    scrollTop.addEventListener("click", () => scrollTo(0, 0))
}


main()