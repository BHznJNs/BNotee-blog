import { markdownTable } from "markdown-table"

function returner(nodeObj, level) {
    // markdown 列表 生成
    function listGenerator(listObj, level) {
        const indent = "    ".repeat(level)
        const isOrdered = listObj.OL
        const listMark = isOrdered ? "1. " : "- "
        const listContents = listObj.CTS

        let result = ""
        
        for (const item of listContents) {
            if (item.NT == "li") {
                result += indent + listMark + item.CT + "\n\n"
            } else {
                result += listGenerator(item, level + 1)
            }
        }
        return result
    }

    const content = nodeObj.CT
    let result

    let isNodeFloorOrList = false
    let isBlock = false
    switch (nodeObj.NT) {
        case "h":
            result = "#".repeat(level) + content
            break
        case "hr":
            result = "* * *"
            break
        case "p":
            result = "  ".repeat(level - 1) + content
            break
        case "link":
            result = `[${content}](${nodeObj.HF})`
            break
        case "floor":
            isNodeFloorOrList = true
            result = parser(nodeObj.CTS, level + 1)
            break
        case "list":
            isNodeFloorOrList = true
            result = listGenerator(nodeObj, 0)
            isBlock = true
            break
        case "table":
            result = markdownTable(nodeObj.CTS)
            isBlock = true
            break
        case "details":
            result = `> ${nodeObj.SUM}`
            for (const item of nodeObj.CTS) {
                result += "\n\n>> " + item.CT
            }
            isBlock = true
            break
        case "code":
            result = `\`\`\`${nodeObj.LG}\n${nodeObj.CT}\n\`\`\``
            break
        default:
            console.log("Unknown node type!")
            return ""
    }
    if (!isNodeFloorOrList) {
        result += "\n\n"
    }
    if (isBlock) {
        result += "\n"
    }
    return result
}

function parser(contents, level) {
    let markdown = ""

    for (const item of contents) {
        markdown += returner(item, level)
    }
    return markdown
}

export default (noteObj) => {
    const contents = noteObj.CTS
    return parser(contents, 1)
}