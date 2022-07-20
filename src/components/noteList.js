import Drawer from "./drawer"
import {NoteListFile, NoteListFolder} from "./noteListItem"
import style from "../style/noteList.css"

const releasePath = "../release/"

function noteListInit(parent, noteList) {
    for (const item of noteList) {
        let childNode
        if (typeof item == "string") {
            childNode = new NoteListFile(item)
            childNode.setAttribute(":location", item)
            
        } else {
            childNode = new NoteListFolder(item[0])
            childNode.setAttribute(":location", item[0])
            childNode.setList(item[1])
        }
        childNode.slot = "content"
        parent.appendChild(childNode)
    }
}

class NoteList extends Drawer {
    constructor() {
        super()

        this.setAttribute(":title", "博客列表")
        globalThis.NoteList = this
        const styleNode = document.createElement("style")
        const downloadFab = document.createElement("button")
        styleNode.textContent = style
        downloadFab.slot = "content"
        downloadFab.disabled = true
        downloadFab.classList.add("fab")
        downloadFab.classList.add("material-icons")
        downloadFab.innerText = "file_download"
        this.shadowRoot.appendChild(styleNode)
        this.appendChild(downloadFab)

        downloadFab.addEventListener("click", () => {
            this.download()
        })
        
        this.elements.fab = downloadFab
    }
    init() {
        fetch("../noteList.json")
        .then(res => res.json())
        .then(data => {
            noteListInit(this, data)
        }).catch((err) => {
            console.error(err)
            this.init()
        })
    }
    
    __selectedNode = null
    get selectedNode() {
        return this.__selectedNode
    }
    set selectedNode(value) {
        this.__selectedNode = value
        if (value) {
            this.elements.fab.disabled = false
        } else {
            this.elements.fab.disabled = true
        }
    }

    download() {
        const selectedNode = this.__selectedNode
        if (!selectedNode) {
            alert("未选择博客，无法下载。")
            return
        }
        const loc = selectedNode.getAttribute(":location")
        location.hash = "/" + loc
    }
}
customElements.define("note-list", NoteList)
export default NoteList