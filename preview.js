const express = require("express")
const app = express()

app.use("/", express.static("./"))
app.listen(3060, () => {
    console.log("http://localhost:3060/dist/")
})