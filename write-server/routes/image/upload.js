const express = require("express")
const multer  = require("multer")

const storage = multer.diskStorage({
    // 用来配置文件上传的位置
    destination: (req, file, cb) => {
        // 调用 cb 即可实现上传位置的配置
//   server ver: "./imgs/"
        cb(null, "../imgs/")
    },
    // 用来配置上传文件的名称（包含后缀）
    filename: (req, file, cb) => {
        // 防止中文文件名乱码
        const fileName = Buffer
        .from(file.originalname, "latin1")
        .toString("utf8")
        cb(null, fileName)
    }
})

const router = express.Router()
const upload = multer({ storage })

router.post("/img-upload/", upload.single("image"), (req, res) => {
    res.send(globalThis.Status[0])
})

module.exports = router