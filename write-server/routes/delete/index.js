const express = require("express")
const router = express.Router()
const path = "/api/delete"

router.use(path, require("./middlewares/checkData"))
router.use(path, require("../../middlewares/checkData"))
router.use(path, require("./middlewares/dbDelete"))
router.use(path, require("./middlewares/noteListEdit"))
router.delete(path, (req, res) => {
    const status = Object.assign({}, globalThis.Status[0])
    status.noteList = globalThis.NoteList
    res.send(status)
})

module.exports = router