const { readFileSync } = require("fs")
//             server ver: config.json
const conf = readFileSync("../config.json", "utf-8")
const confObj = JSON.parse(conf)
//             server ver: ------
globalThis.Config = confObj.write