require("./scripts/initFileCreate")
require("./scripts/global/readConfig")
require("./scripts/global/readNoteList")
require("./scripts/global/status")
require("./scripts/global/db")

const bodyParser = require("body-parser")
const express = require("express")
const app = express()

// 静态文件目录 Static File Path
app.use("/", express.static("./BNotee-vue/dist"))
// Post 数据解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 路由引入 Router Import
const router = require("./routes/index")
// 路由设置 Use Routers
app.use(router)

const port = globalThis.Config.port
app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
    console.log(`应用正在监听 ${port} 端口。`)
})