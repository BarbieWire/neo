const navbar = document.querySelector("#navbar")

function handleClicks(event) {
    const element = event.target.parentElement
    if (!element.dataset.drop) return
    element.classList.toggle("active")
}

navbar.addEventListener('click', handleClicks)