const { readFileSync } = require("fs")
const ini = require("ini")

const conf = readFileSync("config.ini", "utf-8")
globalThis.Config = ini.parse(conf)