import h from "./createElement"
import tableParser from "./tableParser"
import listParser from "./listParser"

/**
 * @description Generate floor node by string
 * @param {obj[]} contentList 
 * @param {number} level 
 * @returns {string} Floor node string
 */
function floorParser(contentList, level) {
    let floorNodeContent = ""
    for (const item of contentList) {
        floorNodeContent += returner(item, level)
    }
    return h("div", floorNodeContent)
}

function returner(item, level) {
    const tagName = item.NT
    const content = item.CT
    const contentList = item.CTS
    const color = item.CL

    let result
    switch (tagName) {
        case "h":
            result = h(("h" + level), content, ["inline-style", "heading"], color)
            break
        case "p":
            result = h("p", content, ["inline-style"], color)
            break
        case "img":
            const imgNode = `<img src="./imgs/${item.SRC}" alt="${content}">`
            result = h("div", imgNode + h("p", content))
            break
        case "link":
            result = `<a is="anchor-link" href="${item.SRC}">${content}</a>`
            break
        case "hr":
            result = h("hr", "", [], null, true)
            break
        case "floor":
            // 判断 level，level 等于 5 时不增加
            const newLevel = (level == 5) ? level : level+1
            result = floorParser(contentList, newLevel)
            break
        case "list":
            result = listParser(contentList, item.OL)
            break
        case "table":
            result = tableParser(contentList)
            break
        case "details":
            let detailsNodeContent = ""
            detailsNodeContent += h("summary", item.SUM)
            for (const pNode of contentList) {
                detailsNodeContent += h("p", pNode.CT, ["inline-style"])
            }
            result = h("details", detailsNodeContent)
            break
        case "code":
            result = h(
                "pre",
                h("code", content, ["hljs", "language-"+item.LG])
            )
    }
    return result
}

function parser(raw) {
    let result = ""
    for (const item of raw) {
        result += returner(item, 1)
    }
    return result
}
export default parser