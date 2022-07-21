/**
 * @description 当笔记为新时，加入 noteList
 */
function pushNewNote(req, res, next) {
    const isNew = res.locals.isNew
    //        --------- server ver without --------
    if (isNew && (req.body.noteName != "__INDEX__")) {
        const noteName = req.body.noteName
        const folder = res.locals.folder
// server ver: push
        folder.unshift(noteName)
    }
    next()
}
module.exports = pushNewNote