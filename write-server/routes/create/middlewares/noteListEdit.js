const dbWriteErrMsg = globalThis.Status[3]

/**
 * @description 编辑笔记列表
 */
function noteListEdit(req, res, next) {
    const name = req.body.name
    const folder = res.locals.folder
    // 写入笔记列表
    folder.push([ name, [] ])

    const fullname = res.locals.fullname
    globalThis.DB.write(
        true, fullname, "", (err) => {
        if (err) {
            // 数据库写入出错
            console.warn(err)
            res.send(dbWriteErrMsg)
        } else {
            next()
        }
    })
}
module.exports = noteListEdit