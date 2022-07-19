/**
 * @descriction 校验客户端与服务端数据是否相同
 */
function checkData(req, res, next) {
    const name = req.body.name
    const type = req.body.type

    res.locals.location = req.body.location
    res.locals.clientInfo = { name, type }
    next()
}
module.exports = checkData