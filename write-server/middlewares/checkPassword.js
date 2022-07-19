const rightPassword = globalThis.Config.password

// {"code":1,"msg":"密码错误！"}
const passwordErrMsg = globalThis.Status[1]

function checkPassword(req, res, next) {
    const clientPassword = req.body.password

    const isPasswordRight = (clientPassword == rightPassword)
    if (isPasswordRight) {
        next()
    } else {
        res.send(passwordErrMsg)
    }
}

module.exports = checkPassword