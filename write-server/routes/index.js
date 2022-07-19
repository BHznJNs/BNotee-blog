const express = require("express")
const router = express.Router()

// api 路由需检查 密码        检查密码中间件 // /(\/api\/)(.*)/
router.all(/(\/api\/)(.*)/, require("../middlewares/checkPassword"))

router.use(require("./upload/index"))
router.use(require("./download/index"))
router.use(require("./create/index"))
router.use(require("./delete/index"))
router.use(require("./noteList"))

module.exports = router