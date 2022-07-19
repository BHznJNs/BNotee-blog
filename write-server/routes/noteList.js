const express = require("express")
const router = express.Router()

router.get("/note-list", (req, res) => {
    let status = Object.assign({}, globalThis.Status[0])
    status.noteList = globalThis.NoteList
    res.send(status)
})

module.exports = router