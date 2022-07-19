const express = require("express")
const router = express.Router()

const path = "/api/upload"
const dbWriteErrMsg = globalThis.Status[3]

router.use(path, require("./middlewares/checkData"))
router.use(path, require("./middlewares/checkIsNew"))
router.use(path, require("./middlewares/dbWrite"))
router.use(path, require("./middlewares/pushNewNote"))

// api：上传笔记数据
router.put(path, (req, res) => {
    const isDBWriteErr = res.locals.isDBWriteErr
    if (isDBWriteErr) {
        res.send(dbWriteErrMsg)
        return
    }

    const status = Object.assign({}, globalThis.Status[0])
    status.isNew = res.locals.isNew
    if (status.isNew) {
        status.noteList = globalThis.NoteList
    }
    res.send(status)
})

module.exports = router