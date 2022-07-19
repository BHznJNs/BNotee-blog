import style from "../style/controlballs.css"

const html = 
`<div class="block">
<div class="mask"></div>
<i class="material-icons">apps</i>
</div>
<!-- 打开笔记概要 -->
<div class="ball">
<i class="material-icons anchors">subtitles</i>
</div>
<!-- 打开笔记列表窗口 -->
<div class="ball">
<i class="material-icons note-list">format_list_bulleted</i>
</div>
<!-- 黑暗模式切换 -->
<div class="ball">
<i class="material-icons dark-mode">brightness_2</i>
</div>`

class ControlBalls extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: "closed" })
        const styleNode = document.createElement("style")
        styleNode.textContent = style
        shadow.innerHTML = html
        shadow.appendChild(styleNode)

        this.elements = {
            darkMode: shadow.querySelector(".dark-mode"),
            noteList: shadow.querySelector(".note-list"),
            anchors: shadow.querySelector(".anchors"),
        }
    }

    connectedCallback() {
        const els = this.elements
        // 切换 黑暗模式
        els.darkMode.addEventListener("click", (e) => {
            const isDarken = globalThis.DarkMask.toggle()
            const el = e.target
            el.innerText = (isDarken) ? "wb_sunny" : "brightness_2"
        })
        els.anchors.addEventListener("click", () => {
            globalThis.Anchors.toggle()
        })
        els.noteList.addEventListener("click", () => {
            globalThis.NoteList.toggle()
        })
    }
}
customElements.define("control-balls", ControlBalls)
export default ControlBalls