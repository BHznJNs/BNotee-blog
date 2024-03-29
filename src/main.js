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
globalThis.ImageList = null

function defaultContentDownloader(times=0) {
    if (times > 10) {
        // 重试次数超过十次
        alert("加载首页内容失败，请稍后再试。")
        return
    }

    import("./defaultContent.js")
    .then(res => {
        const data = res.default
        globalThis.Init(data)
    }).catch(e => {
        console.error(e)
        // 加载失败，重试
        defaultContentDownloader(times + 1)
    })
}

/**
 * @description Hash change event function
 */
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

window.onload = () => {
    hashEvent()
    globalThis.NoteList.init()
}
// 添加路由变化监听
window.addEventListener("hashchange", hashEvent)

// 点击图片时，在新窗口打开图片
document.querySelector("main.note")
.addEventListener("click", (e) => {
    const target = e.target
    if (target.tagName == "IMG") {
        window.open(target.src)
    }
})