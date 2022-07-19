const dbWriteErrMsg = globalThis.Status[3]

function dbDelete(req, res, next) {
    const type = req.body.type
    const name = req.body.name

    globalThis.DB.delete(type, name, (err) => {
        if (err) {
            // 数据库写入出错
            console.warn(err)
            res.send(dbWriteErrMsg)
        } else {
            next()
        }
    })
}
module.exports = dbDelete