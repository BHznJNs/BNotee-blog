import style from "../style/drawer.css"

const html = 
`<div class="mask"></div>
<div class="drawer">
    <div class="titlebar shadow-4">
        <div class="closer">
            <i class="material-icons arrow-forward">arrow_forward</i>
            <i class="material-icons arrow-upward">arrow_upward</i>
        </div>
        <h1></h1>
    </div>

    <div class="drawer-view">
        <slot name="content"></slot>
    </div>
</div>`

class Drawer extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: "open" })
        const styleNode = document.createElement("style")
        styleNode.textContent = style
        shadow.innerHTML = html
        shadow.appendChild(styleNode)

        this.elements = {
            main: shadow.querySelector(".drawer"),
            mask: shadow.querySelector(".mask"),
            title: shadow.querySelector("h1"),
            closer: shadow.querySelector("div.closer"),
        }
    }
    toggle() {
        const els = this.elements
        this.classList.toggle("active")
        els.main.classList.toggle("active")
        els.mask.classList.toggle("active")
    }
    connectedCallback() {
        const els = this.elements
        els.title.innerText = this.getAttribute(":title") // 设置标题
    
        els.closer.addEventListener("click", () => {this.toggle()})
        els.mask.addEventListener("click", () => {this.toggle()})
    }
}
export default Drawer