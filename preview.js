const config = require("./config.js")
const express = require("express")
const app = express()

const port = config.blog.port

app.use("/", express.static("./"))
app.listen(port, () => {
    console.log(`http://localhost:${port}/dist/`)
})