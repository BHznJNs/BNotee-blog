const checker = require("../scripts/checker")
const getTargetInfo = require("../scripts/getTargetInfo")

const fileNotFound = globalThis.Status[5]
// Usage: Object.assign({}, fileNoteFound)

/**
 * @description 校验文件夹数据是否相同
 */
function checkData(req, res, next) {
    if (res.locals.next) {
        // 直接到下一中间件
        next(); return
    }

    const clientInfo = res.locals.clientInfo
    const location = res.locals.location
    // 获取服务器端对应数据
    const serverInfo = getTargetInfo(location)
    // 校验数据是否相同
    const isDataEqual = checker(serverInfo, clientInfo)

    // 数据不相同时，发送服务器端数据
    if (!isDataEqual) {
        const status = Object.assign({}, fileNotFound)
        // 服务器端 笔记列表
        status.noteList = globalThis.NoteList
        res.send(status)
    } else {
        res.locals.serverInfo = serverInfo
        next()
    }
}
module.exports = checkData