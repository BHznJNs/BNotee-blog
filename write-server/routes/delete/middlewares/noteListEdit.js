/**
 * @description 删除笔记列表中对应项目
 */
function noteListEdit(req, res, next) {
    const folder = res.locals.serverInfo.folder
    const location = req.body.location
    const index = location[location.length - 1]

    if (location.length == 1) {
        // 顶层目录时
        folder.splice(index, 1)
    } else {
        // 文件夹内时
        folder[1].splice(index, 1)
    }
    next()
}
module.exports = noteListEdit