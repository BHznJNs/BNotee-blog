const express = require("express")
const router = express.Router()
const path = "/api/create-folder"

router.use(path, require("./middlewares/checkData"))
router.use(path, require("../../middlewares/checkData"))
router.use(path, require("./middlewares/checkExist"))
router.use(path, require("./middlewares/noteListEdit"))
router.post(path, (req, res) => {
    const status = Object.assign({}, globalThis.Status[0])
    status.noteList = globalThis.NoteList
    res.send(status)
})

module.exports = router