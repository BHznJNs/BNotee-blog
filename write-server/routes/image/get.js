const { accessSync, constants } = require("node:fs")
const { resolve, join } = require("node:path")
const express = require("express")
const router = express.Router()

//        server ver: join(resolve(), "imgs/")
const imgFolderPath = join(resolve("../"), "imgs/")

router.get("/imgs/:imgName", (req, res) => {
    const imgName = req.params["imgName"]
    try {
        const imgPath = imgFolderPath + imgName
        accessSync(imgPath, constants.R_OK)
        // resolve() == current absolute path
        res.sendFile(imgPath)
    } catch {
        const status = globalThis.Status[5] // 文件不存在
        res.send(status)
    }
})

module.exports = router