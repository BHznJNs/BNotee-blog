const { accessSync, constants, writeFileSync, mkdirSync } = require("fs")

/**
 * @description 判断 文件/文件夹 是否存在，
 *              不存在则创建
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
const dataDirPath = "./data"
const noteListPath = "./data/notes.json"
const configPath = "./config.ini"
const configDefaultContent = 
`# Default \`User\`
username = "User"

# Default 123456
# maxLength --> 10
password = 123456

# Default 3030
port = 3030`

createFile(dataDirPath, null, "folder")
createFile(noteListPath, "[]", "file")
createFile(configPath, configDefaultContent, "file")