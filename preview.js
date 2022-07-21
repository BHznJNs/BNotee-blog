const fs = require("fs")
const express = require("express")
const app = express()

const conf = fs.readFileSync("config.json")
const confObj = JSON.parse(conf)
const port = confObj.blog.port

app.use("/", express.static("./"))
app.listen(port, () => {
    console.log(`http://localhost:${port}/dist/`)
})