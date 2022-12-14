function init(data) {
    const content = globalThis.HTMLParser(data.CTS)
    document.querySelector("main.note").innerHTML = content
    globalThis.HLJS.highlightAll()
    globalThis.Compiler.init()
    globalThis.Anchors.init()
    setTimeout(() => {
        globalThis.ImageList = document.querySelectorAll("img")
    }, 0)
}
export default init