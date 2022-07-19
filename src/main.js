import "./style/style.css"
import "highlight.js/styles/github.css"

import "./components/controlballs"
import "./components/darkMask"
import "./components/anchors"
import "./components/anchorLink"

import NoteListClass from "./components/noteList"
import hljs from "highlight.js/es/common"
import htmlParser from "./script/parser/index"
import compiler from "./script/compiler"
import init from "./script/init"
import downloadBlog from "./script/downloadBlog"

globalThis.HLJS = hljs
globalThis.HTMLParser = htmlParser
globalThis.Compiler = compiler
globalThis.Init = init

function defaultContentDownloader() {
    import("./defaultContent.js")
    .then(res => {
        const data = res.default
        globalThis.Init(data)
    }).catch(e => {
        console.error(e)
        contentInit(times + 1)
    })
}

function hashEvent() {
    if (location.hash) { // 是否存在 hash
        const hash = location.hash.slice(1)
        if (hash.slice(0, 1) == "/") {
            downloadBlog("../release" + hash)
        }
    } else {
        defaultContentDownloader()
    }
}
window.addEventListener("hashchange", hashEvent)

window.onload = () => {
    (function contentInit(times) {
        if (times > 10) { // 重试次数大于 10
            alert("加载首页内容失败！")
            return
        }
        hashEvent()
    })(0)
    globalThis.NoteList.init()
}