const fs = require("fs")

const releasePath = "./release"
const noteListPath = "./noteList.json"

// 递归获取文件夹内容
function readFolder(path) {
    const result = []
    const folderContent = fs.readdirSync(path)
    for (const item of folderContent) {
        const currentPath = path + "/" + item
        const stat = fs.statSync(currentPath)
        if (stat.isDirectory()) {
            result.push([item, readFolder(currentPath)])
        } else {
            result.push(item)
        }
    }
    return result
}

const releaseContent = readFolder(releasePath)
fs.writeFileSync(
    noteListPath,
    JSON.stringify(releaseContent)
)