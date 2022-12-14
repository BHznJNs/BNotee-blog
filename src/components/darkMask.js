const darkMaskStyle = 
`position: absolute;
top: 0; bottom: 0;
left: 0; right: 0;
z-index: 10000;
mix-blend-mode: difference;
background-color: rgba(224, 224, 224, 0);
pointer-events: none;
transition: background-color 1.2s;`

class DarkMask extends HTMLDivElement {
    constructor() {
        super()

        this.style = darkMaskStyle
        globalThis.DarkMask = this
    }
    #isDarken = false
    toggle() {
        this.classList.toggle("darken")
        this.#isDarken = !this.#isDarken

        for (const imgNode of globalThis.ImageList) {
            imgNode.classList.toggle("reverse", this.#isDarken)
        }
        return this.#isDarken
    }
}
customElements.define(
    "dark-mask", DarkMask,
    {extends: "div"}
)
export default DarkMask