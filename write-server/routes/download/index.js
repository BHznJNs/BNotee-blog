const express = require("express")
const router = express.Router()
const path = "/api/download"

router.use(path, require("./middlewares/checkData"))
router.use(path, require("../../middlewares/checkData"))
router.use(path, require("./middlewares/dbRead"))
router.post(path, (req, res) => {
    const status = Object.assign({}, globalThis.Status[0])
    status.noteContent = res.locals.noteContent
    res.send(status)
})
module.exports = router