const { accessSync, constants, writeFileSync, mkdirSync } = require("fs")

/**
 * @description 判断 文件/文件夹 是否存在，不存在则创建
 * @param {string} path
 * @param {string | null} content 若 `type` 为文件夹则为 `null`
 * @param {string} type "file" || "folder"
 */
function createFile(path, content, type) {
    try {
        accessSync(path, constants.R_OK | constants.W_OK)
    } catch {
        if (type == "file") {
            writeFileSync(path, content)
        } else if (type == "folder") {
            mkdirSync(path)
        }
    }
}
// 初始文件路径
const releaseDirPath = "../release"
const noteListPath = "../noteList.json"
const noteListContent = "[]"
const configPath = "../config.js"
const configDefaultContent = 
`module.exports = {
    write: {
        password: "",
        // Write server port
        port: 3031,
    },
    blog: {
        // Preview server port
        port: 3032,
    },
    latest: {
        maximum: 10,
    }
}`

createFile(releaseDirPath, null, "folder")
createFile(noteListPath, noteListContent, "file")
createFile(configPath, configDefaultContent, "file")