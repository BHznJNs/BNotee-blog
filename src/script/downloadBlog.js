function downloadBlog(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        globalThis.Init(data)
        document.title = `${data.NM} -- BNotee` // Set title
    }).catch((err) => {
        console.error(err)
        alert("博客下载错误，请重试。")
    })
}
export default downloadBlog