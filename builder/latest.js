const fs = require("fs")

const latestPath = "builder/latest.json"
const dcPath = "src/defaultContent.js"

const latestContent = fs.readFileSync(latestPath, "utf-8")
const latest = JSON.parse(latestContent)

const defaultFile = fs.readFileSync(dcPath, "utf-8")
const defaultContent = defaultFile.slice(15)
const defaultContentObj = JSON.parse(defaultContent)

// 若没有最近更新
if (defaultContentObj.CTS.slice(-1)[0].comment == "latest") {
    defaultContentObj.CTS.pop()
}

const latestBlock = {
    NT: "floor",
    comment: "latest",
    CTS: [{
        NT: "h",
        CT: "最近更新",
        CL: "#333",
    }]
}

if (latest.length) {
    for (const item of latest) {
        const itemPath = item.replace("../", "")
        const itemContent = fs.readFileSync(itemPath, "utf-8")
        const itemObj = JSON.parse(itemContent)
        const title = itemObj.CTS[0].CT
        latestBlock.CTS.push({
            NT: "link",
            CT: title,
            SRC: item.replace("../release", "#")
        })
    }
} else {
    latestBlock.CTS.push({
        NT: "p",
        CT: "暂无更新",
        CL: "#333",
    })
}

defaultContentObj.CTS.push(latestBlock)
newDefaultContent = "export default " + JSON.stringify(defaultContentObj)

fs.writeFileSync(dcPath, newDefaultContent)
fs.writeFileSync("dist/assets/defaultContent.js", newDefaultContent)