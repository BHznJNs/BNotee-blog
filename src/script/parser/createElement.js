/**
 * @description Generate html node by string type
 * @param {string} tagName 
 * @param {string} content 
 * @param {string[]} classList
 * @param {boolean} tagOmission
 * @returns {string} html node
 */
function h(tagName, content, classList=[], color, tagOmission=false) {
    let node = `<${tagName}`
    // 颜色样式
    if (color) {
        node += ` style="color: ${color} !important"`
    }
    // 类
    if (classList.length) {
        const classStr = classList.join(" ")
        node += ` class="${classStr}"`
    }
    node += ">" + content
    // 去除闭合标签
    if (tagOmission) {
        // 无闭合标签
        return node
    }
    node += `</${tagName}>`
    return node
}
export default h