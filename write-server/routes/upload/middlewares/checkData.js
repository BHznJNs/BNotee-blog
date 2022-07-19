const checker = require("../../../scripts/checker")
const getTargetInfo = require("../../../scripts/getTargetInfo")

const fileNotFound = globalThis.Status[5]
// Usage: Object.assign({}, fileNoteFound)

/**
 * @description 校验文件夹数据是否相同
 */
function checkFolderEqual(req, res, next) {
    const folderName = req.body.folderName
    const folderLoc = req.body.folderLoc

    // 若 `folderName` 为空，即文件位于顶层
    if (!folderName) {
        res.locals.folder = globalThis.NoteList
        res.locals.folderFullName = ""
        next()
        return
    }

    const targetFolderInfo = getTargetInfo(folderLoc)
    const clientFolderInfo = {
        type: "folder",
        name: folderName,
    }
    
    const isDataEqual = checker(targetFolderInfo, clientFolderInfo)
    if(isDataEqual) {
        res.locals.folder = targetFolderInfo.target[1]
        res.locals.folderFullName = targetFolderInfo.name + "/"
        next()
    } else {
        // 数据不相同时，发送服务器端数据
        const status = Object.assign({}, fileNotFound)
        status.nodeList = globalThis.NoteList
        res.send(status)
    }
}

module.exports = checkFolderEqual