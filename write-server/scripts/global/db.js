const saveJSON = require("../saveJSON")
const fs = require("fs")

const basePath = "../release/"
const latestData = fs.readFileSync("../builder/latest.json", "utf-8")
globalThis.Latest = JSON.parse(latestData)

/**
 * @description 检查文件是否存在，是否可读写
 * @param {string} path 
 */
function access(path) {
    try {
        fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK)
        return true
    } catch(err) {
        return false
    }
}

function write(isNew, path, data, callback) {
    if (path == "__INDEX__") {
        // 写入默认笔记
        path = "../dist/assets/defaultContent.js"
        data = "export default " + data
        write(false, "../src/defaultContent.js", data, () => {})
    } else {
        path = basePath + path
    }
    try {
        if (path.slice(-1) == "/") {
            // 若为文件夹
            fs.mkdirSync(path)
        } else {
            fs.writeFileSync(path, data)
            if (isNew && path != "../dist/assets/defaultContent.js") {
                globalThis.Latest.unshift(path)
                // 控制数量为 5 个
                if (globalThis.Latest.length > 5) {
                    globalThis.Latest.pop()
                }
            }
        }
        callback(null)
    } catch(err) {
        callback(err)
    }
}
function read(path, callback) {
    path = basePath + path
    try {
        const isFolder = (path.slice(-1) == "/")
        const isExist = isFolder ?
                        access(path.slice(0, -1)) :
                        access(path)
        let data
        if (isFolder && isExist) {
            data = true
        } else if (!isFolder && isExist) {
            data = fs.readFileSync(path, "utf-8")
        } else if (!isExist) {
            data = null
        }
        callback(null, data)
        // return data
    } catch(err) {
        callback(err, null)
    }
}
function del(type, path, callback) {
    path = basePath + path
    try {
        if (type == "file") {
            fs.unlinkSync(path)
            const latest = globalThis.Latest
            if (latest.includes(path)) {
                latest.splice(latest.indexOf(path), 1)
            }
        } else { //            删除非空文件夹
            fs.rmdirSync(path, { recursive: true })
        }
        callback(null)
    } catch(err) {
        callback(err)
    }
}

// 程序关闭时运行
process.on("SIGTERM", shutDown)
process.on("SIGINT", shutDown)
function shutDown() {
    saveJSON()
    console.log("shutdown")
    process.exit(0)
}

globalThis.DB = {
    write, read,
    delete: del
}