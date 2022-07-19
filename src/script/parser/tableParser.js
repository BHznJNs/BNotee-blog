import h from "./createElement"

/**
 * @description Generate table node
 * @param {[]} contentList 
 * @returns {string} tableNode
 */
 function tableParser(contentList) {
    // Generate `tr` node
    function trParser(list, type="td") {
        let trNodeContent = ""
        for (const nodeContent of list) {
            trNodeContent += h(type, nodeContent)
        }
        return h("tr", trNodeContent)
    }

    let tableContent = ""
    for (const i in contentList) {
        if (i == 0) {
            tableContent += trParser(contentList[i], "th")
        } else {
            tableContent += trParser(contentList[i])
        }
    }
    return h("table", tableContent)
}

export default tableParser