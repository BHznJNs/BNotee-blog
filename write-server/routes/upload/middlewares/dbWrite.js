const dbWriteErrMsg = globalThis.Status[3]

function dbWrite(req, res, next) {
    const noteContent = req.body.note
    const noteName = req.body.noteName
    const isNew = res.locals.isNew
    const folderFullName = res.locals.folderFullName

    const noteFullName = folderFullName + noteName

    globalThis.DB.write(
        isNew, noteFullName, noteContent, (err) => {
        if (err) {
            // 数据库写入出错
            console.warn(err)
            res.send(dbWriteErrMsg)
        } else {
            next()
        }
    })
}
module.exports = dbWrite