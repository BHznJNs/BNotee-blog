const { writeFileSync } = require("fs")

// 保存笔记列表数据
function saveNoteList() {
    try {
        const noteList = JSON.stringify(globalThis.NoteList)
        const latest = JSON.stringify(globalThis.Latest)
        writeFileSync("../noteList.json", noteList)
        writeFileSync("../builder/latest.json", latest)
    } catch(err) {
        console.log("\nJSON 文件保存失败！")
        console.error(err)
    }
}

module.exports = saveNoteList