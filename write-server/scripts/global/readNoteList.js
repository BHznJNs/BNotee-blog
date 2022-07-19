const { readFileSync } = require("fs")

// 读取笔记列表
const noteList = readFileSync("../noteList.json", "utf-8")
globalThis.NoteList = JSON.parse(noteList)