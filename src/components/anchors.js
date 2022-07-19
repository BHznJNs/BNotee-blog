import Drawer from "./drawer";
import style from "../style/anchors.css"

function anchorNodeCreate(level, href, content) {
    const anchorNode = document.createElement("a")
    anchorNode.setAttribute("level", level)
    anchorNode.setAttribute("href", "#" + href)
    anchorNode.setAttribute("slot", "content")
    anchorNode.innerText = content
    return anchorNode
}

function anchorsInit(parentNode) {
    while (parentNode.hasChildNodes()) {
        // 清除所有子元素
        parentNode.removeChild(parentNode.lastChild)
    }

    const headings = document.querySelectorAll(".heading")

    headings.forEach((item, index) => {
        const level = item.tagName
        const content = item.textContent
        item.setAttribute("id", index)
        const anchorNode = anchorNodeCreate(level, index, content)
        parentNode.appendChild(anchorNode)
    })
}

class Anchors extends Drawer {
    constructor() {
        super()

        this.setAttribute(":title", "博客概要")
        globalThis.Anchors = this
        const styleNode = document.createElement("style")
        styleNode.textContent = style
        this.shadowRoot.appendChild(styleNode)
    }
    init() {
        anchorsInit(this)
    }
}
customElements.define("anchors-view", Anchors)
export default Anchors