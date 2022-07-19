/**
 * @param {string | object} data 
 * @returns {string} name of inputted data
 */
function getName(data) {
    let name
    if (typeof data == "string") {
        name = data // 类型为 文件
    } else {
        name = data[0] // 类型为 文件夹
    }
    return name
}

export default {
    methods: {
        /**
         * @returns {string} the name of target item
         */
        getTargetName() {
            const location = this.selected.loc
            const nodeList = this.noteList
            let result

            if (location.length == 1) {
                // 顶层目录
                const index = location[0]
                const item = nodeList[index]
                result = getName(item)
            } else {
                result = []
                let item
                for (let i in location) {
                    const index = location[i]
                    if (i == 0) {
                        // 顶层目录
                        item = nodeList[index]
                    } else {
                        // 文件夹中
                        item = item[1][index]
                    }

                    const itemName = getName(item)
                    result.push(itemName)
                }
                result = result.join("/")
            }

            return result
        }
    }
}