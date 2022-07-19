class AnchorLink extends HTMLAnchorElement {
    constructor() {
        super()
        const href = this.getAttribute("href")
        if (href.slice(0, 1) == "#") {
            this.type = "inner"
        } else {
            this.type = "outer"
            this.setAttribute("target", "_blank")
        }
    }
}
customElements.define(
    "anchor-link", AnchorLink,
    { extends: "a" }
)
export default AnchorLink