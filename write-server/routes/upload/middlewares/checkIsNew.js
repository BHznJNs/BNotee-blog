/**
 * @description 检查是否为新笔记
 */
function checkIsNew(req, res, next) {
    const noteName = req.body.noteName
    const folder = res.locals.folder
    const isNew = !folder.includes(noteName)
    res.locals.isNew = isNew
    next()
}

module.exports = checkIsNew