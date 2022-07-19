function checkData(req, res, next) {
    const folderName = req.body.folderName
    const folderLoc = req.body.folderLoc

    if (folderLoc && folderName) {
        // 若选择了文件夹
        res.locals.location = folderLoc
        res.locals.clientInfo = {
            name: folderName,
            type: "folder"
        }
    } else {
        // 若未选择文件夹
        res.locals.next = true
        res.locals.topLevel = true
        res.locals.serverInfo = {
            target: globalThis.NoteList,
            name: req.body.name,
        }
    }
    next()
}
module.exports = checkData