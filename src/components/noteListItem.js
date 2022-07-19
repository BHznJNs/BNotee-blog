class NoteListFile extends HTMLLIElement {
    constructor(name) {
        super()
        this.classList.add("item")
        this.slot = "content"
        this.innerHTML =
        `<i class="item-avatar material-icons">assignment</i>
        <span class="item-name">${name}</span>`
        this.addEventListener("click", () => {
            this.select()
        })
    }
    select() {
        if (this.classList.value.includes("selected")) {
            // 已被选择
            this.classList.remove("selected")
            globalThis.NoteList.selectedNode = null
        } else {
            this.classList.add("selected")
            if (globalThis.NoteList.selectedNode) {
                // 若已有被选择元素
                globalThis.NoteList.selectedNode.classList.remove("selected")
                globalThis.NoteList.selectedNode = this
            } else {
                globalThis.NoteList.selectedNode = this
            }
        }
    }
}
customElements.define(
    "notelist-file", NoteListFile,
    { extends: "li" }
)

class NoteListFolder extends HTMLLIElement {
    constructor(name) {
        super()
        const folderTemplate =
        `<div class="item">
        <i class="item-avatar material-icons">folder_open</i>
        <span class="item-name">${name}</span>
        </div><ul class="folder"></ul>`
        this.innerHTML = folderTemplate
        this.classList.add("folder-item")

        this.elements = {
            folder: this.querySelector(".folder"),
            name: this.querySelector(".item-name"),
        }
        this.querySelector("div.item")
        .addEventListener("click", () => {
            this.toggle()
        })
    }

    setList(list) {
        const location = this.getAttribute(":location")
        for (const item of list) {
            let childNode, loc
            if (typeof item == "string") {
                childNode = new NoteListFile(item)
                loc = location + "/" + item
                childNode.setAttribute(":location", loc)
            } else {
                childNode = new NoteListFolder(item[0])
                loc = location + "/" + item[0]
                childNode.setAttribute(":location", loc)
                childNode.setList(item[1])
            }
            this.elements.folder.appendChild(childNode)
        }
    }
    #collapsed = true
    toggle() {
        const folder = this.elements.folder
        if (this.#collapsed) {
            folder.style.display = "block"
        } else {
            folder.style.display = "none"
        }
        this.#collapsed = !this.#collapsed
    }
}
customElements.define(
    "notelist-folder", NoteListFolder,
    { extends: "li" }
)

export { NoteListFile }
export { NoteListFolder }