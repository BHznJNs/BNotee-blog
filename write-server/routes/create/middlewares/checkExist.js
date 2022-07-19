const folderExist = globalThis.Status[4]
const dbReadErrMsg = globalThis.Status[2]

/**
 * @decription 检测文件夹是否位于顶层目录
 */
function checkTopLevel(resObj, folderObj) {
    if (resObj.locals.topLevel) {
        resObj.locals.folder = folderObj.target
    } else {
        resObj.locals.folder = folderObj.target[1]
    }
}
/**
 * @description 根据是否顶层目录判断文件夹全名
 */
function getFullname(resObj, name, folderName) {
    let fullname
    if (resObj.locals.topLevel) {
        fullname = folderName + "/"
    } else {
        fullname = `${folderName}/${name}/`
    }
    resObj.locals.fullname = fullname
}
/**
 * @description 通过读取数据库判断文件夹是否存在
 * @param {string} name
 * @returns {boolean}
 */
function dbRead(name) {
    return new Promise((resolve, reject) => {
        globalThis.DB.read(name, (err, content) => {
            if (err) {
                // 数据库读取出错
                console.warn(err)
                reject("DB-read-error")
            }
            resolve(Boolean(content))
        })
    })
}
/**
 * @description 检测文件夹是否存在
 */
function checkExist(req, res, next) {
    const name = req.body.name
    const serverInfo = res.locals.serverInfo
    checkTopLevel(res, serverInfo)
    getFullname(res, name, serverInfo.name)

    dbRead(res.locals.fullname)
    .then((val) => {
        if (val) {
            // 文件夹存在
            res.send(folderExist)
        } else {
            next()
        }
    }).catch((err) => {
        console.warn(err)
        res.send(dbReadErrMsg)
    })
}
module.exports = checkExist