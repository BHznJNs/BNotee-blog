// 标识字符数组
const keyTermArray = [
    "#",
    "`",
    "_",
    "/",
    "-",
    ":",
]
// 标识字符 对应 HTML 标签 对照
const keyToken_tagName_map = {
    "##": "strong",
    "``": "code",
    "__": "u",
    "//": "i",
    "--": "del",
    "::": "span",
}

/**
 * @description Tokenize the raw text
 * @param text {string} raw text
 * @returns {[]} termArray
 */
function tokenizer(text) {
    const termArray = []
    let textTerm = ""
    let keyTerm = ""

    for (let t of text) {
        if (keyTermArray.includes(t)) {
            // 标识字符 `#`
            if (t == keyTerm) {
                // 重复标识字符 `##`

                termArray.push({
                    type: "text",
                    content: textTerm.slice(0, -1)
                })
                termArray.push({
                    type: "key",
                    content: t.repeat(2)
                })

                keyTerm = ""
                textTerm = ""
            } else {
                textTerm += t
                keyTerm = t
            }
        } else {
            // 若 keyTerm 不为空字符串
            if (keyTerm.length) {
                keyTerm = ""
            }
            textTerm += t
        }
    }
    // 加入末尾 term
    if (textTerm.length) {
        termArray.push({
            type: "text",
            content: textTerm
        })
    }

    return termArray
}

/**
 * @param {[]} termArray 
 * @returns {[]} tokenArray
 */
 function analyser(termArray) {
    const tokenArray = []
    let token = ""

    let status = ""
    let statusContent = ""

    for (let termObj of termArray) {
        const termContent = termObj.content
        token += termContent

        if (termObj.type == "key") {
            // 标识字符
            if (status == "key") {
                if (termContent != statusContent) {
                    // 若与 起始标识符 不对应 如：`some ##bold text//`
                    continue
                }
                const tagName = keyToken_tagName_map[termContent]
                tokenArray.push({
                    tagName,
                    content: token,
                })
                status = ""
                token = ""
            } else {
                status = "key"
                statusContent = termContent
            }

        } else {
            // 普通字符
            if (status != "key") {
                tokenArray.push({
                    tagName: "text",
                    content: token,
                })
                token = ""
            }
        }
    }
    // 加入末尾 token
    if (token.length) {
        const arrayLastEl = tokenArray[tokenArray.length - 1]
        arrayLastEl.content += token
    }

    return tokenArray
}

/**
 * @param {string} tagName 
 * @param {string} content 
 * @returns {string} HTML
 */
function createElement(tagName, content) {
    return `<${tagName}>${content}</${tagName}>`
}

/**
 * @param {[]} tokenArray 
 * @returns {[]} nodeArray
 */
function generator(tokenArray) {
    const nodeArray = []

    for (let token of tokenArray) {
        if (token.tagName == "text") {
            nodeArray.push(token.content)
        } else {
            nodeArray.push(createElement(
                token.tagName,
                token.content,
            ))
        }
    }

    return nodeArray
}

/**
 * @param {string} rawText 
 * @param {string} type "HTML"
 * @returns 
 */
function outputer(rawText) {
    if (!rawText) {
        return null
    }
    const termArray = tokenizer(rawText)
    const tokenArray = analyser(termArray)

    let nodeArray

    nodeArray = generator(tokenArray)
    const outputHTML = nodeArray.join("")
    return outputHTML
}
/**
 * @description Init the inline style of every node.
 */
async function init() {
    const nodeArray = document.getElementsByClassName("inline-style")
    for (let node of nodeArray) {
        const rawText = node.textContent
        if (!rawText) {
            continue
        }

        const outputHTML = outputer(rawText, "HTML")
        node.innerHTML = outputHTML
    }
}

export default {
    outputer, init
}
