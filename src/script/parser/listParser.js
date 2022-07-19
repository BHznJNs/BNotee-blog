import h from "./createElement"

/**
 * @description Generate list node
 * @param {obj[]} contentList 
 * @param {boolean} isOrdered 
 * @returns {string} ListNode
 */
function listParser(contentList, isOrdered) {
    let listNodeContent = ""
    // 判断 有序列表/无序列表
    const listType = isOrdered ? "ol" : "ul"

    for (const item of contentList) {
        const tagName = item.NT
        const content = item.CT

        if (tagName == "list") {
            listNodeContent += listParser(item.CTS, item.OL)
        } else if (tagName == "li") {
            listNodeContent += h("li", content, ["inline-style"])
        } else {
            console.error("Unknown tagName type '" + tagName + "'")
        }
    }
    return h(listType, listNodeContent)
}
export default listParser