/**
 * @description 根据输入返回 名称
 * @param {string | object} data 
 * @returns {object} name
 */
 function getName(data) {
    let name
    if (typeof data == "string") {
        name = data
    } else {
        name = data[0]
    }
    return name
}
/**
 * @description 根据输入返回 名称
 * @param {string | object} data 
 * @returns {object} type
 */
function getType(data) {
    let type
    if (typeof data == "string") {
        type = "file"
    } else {
        type = "folder"
    }
    return type
}

/**
 * @description 根据输入 `location` 获取 目标类型&名称
 * @param {number[]} location 
 * @returns {object} { name, type, target }
 */
function getTargetInfo(location) {
    const nodeList = globalThis.NoteList
    let name, type, target, folder

    if (location.length == 1) {
        // 顶层目录
        const index = location[0]
        const item = nodeList[index]
        name = getName(item)
        type = getType(item)
        target = item
        folder = NoteList
    } else {
        const nameArray = []
        let item
        for (let i in location) {
            const index = location[i]
            if (i == 0) {
                // 顶层目录
                item = nodeList[index]
                if (i == (location.length - 2)) {
                    folder = item
                }
            } else if (i == (location.length - 2)) {
                item = item[1][index]
                folder = item
            } else {
                // 文件夹中
                item = item[1][index]
                if (i == (location.length - 1)) {
                    // 最后一次遍历, 获取类型
                    type = getType(item)
                }
            }

            target = item
            const itemName = getName(item)
            nameArray.push(itemName)
        }
        name = nameArray.join("/")
    }

    return { name, type, target, folder }
}

module.exports = getTargetInfo