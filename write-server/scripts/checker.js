/**
 * @description 输入服务器数据&客户端数据，返回数据是否相同
 * @param {object} serverFileInfo
 * @param {object} clientFileInfo
 * @returns {boolean} isDataEqual
 */
function checker(serverInfo, clientInfo) {
    return (
        clientInfo.type == serverInfo.type &&
        clientInfo.name == serverInfo.name
    )
}
module.exports = checker