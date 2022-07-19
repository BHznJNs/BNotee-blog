/**
 * @param {string} text 
 * @param {string} direction "start" | "end"
 */
function insertText(text, direction="end") {
    const range = window.getSelection()
    const position = range.getRangeAt(0)
    const textNode = document.createTextNode(text)
    position.insertNode(textNode)

    if (direction == "start") {
        range.collapseToStart()
    } else if (direction == "end") {
        range.collapseToEnd()
    } else {
        console.warn("Unknown direction type!")
    }
}

function tabInput(e) {
    e.preventDefault()
    insertText("    ")
}

const bracketsDist = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
    [">", "<"],
])
const xmlLang = [
    "html", "xml",
    "xhtml", "svg",
    "rss",
]
/**
 * @description input types of pair of signals
 * @param {string} type ")" | "]" | "}"
 * @param {boolean} autoEnter
 */
function pairInput(type, autoEnter) {
    setTimeout(() => {
        if (autoEnter) {
            insertText(`${bracketsDist.get(type)}
    `)
            insertText(`
${type}`, "start")
        } else {
            insertText(type, "start")
        }
    }, 150)
}

export default {
    methods: {
        codeInput(e) {
            switch (e.keyCode) {
                case 9:
                    tabInput(e)
                    break
                case 57:
                    if (e.shiftKey) {
                        pairInput(")", e.altKey)
                    }
                    break
                case 219:
                    if (e.shiftKey) {
                        pairInput("}", e.altKey)
                    } else {
                        pairInput("]", e.altKey)
                    }
                    break
                case 188:
                    // 若是 xml 语言
                    if (xmlLang.includes(this.language)) {
                        pairInput(">")
                    }
                    break
                case 222:
                    if (e.shiftKey) {
                        pairInput(`"`)
                    } else {
                        pairInput(`'`)
                    }
                    break
                case 192:
                    pairInput("`", e.altKey)
                    break
            }
        }
    }
}