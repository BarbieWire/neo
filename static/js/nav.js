class Navbar {
    constructor() {
        this.navbar = document.querySelector("#navbar")
        this.navbar.addEventListener('click', this.handleDropdowns)
        this.language = this.parseLang()
        this.alterHrefs()
        this.locationWithinWebsite = location.pathname.split("/").slice(2).join("/")

        if (this.locationWithinWebsite)
            this.navbar.classList.add("active")
        this.handleLinks()
    }

    parseLang() {
        return location.pathname.split("/").slice(0, 2)[1]
    }

    alterHrefs() {
        const links = this.navbar.querySelectorAll("[data-lang]")
        links.forEach(link => link.addEventListener("click", e => this.handleLanguage(e, link)))
    }

    handleLanguage(e, link) {
        e.preventDefault()
        const lang = link.dataset.lang
        location.pathname = `${lang}/${this.locationWithinWebsite}`
    }

    handleDropdowns(event) {
        const element = event.target.parentElement
        if (!element.dataset.drop) return
        element.classList.toggle("active")
    }

    handleLinks() {
        const nodes = this.navbar.querySelectorAll(".nav-link:not([data-drop])")
        nodes.forEach(node => {
            node.href = `/${this.language}${node.getAttribute("href")}`
        })
    }
}

const nav = new Navbar()
