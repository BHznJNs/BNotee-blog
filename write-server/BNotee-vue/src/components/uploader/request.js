import axios from "axios"
import getTargetName from "./getTargetName"
import EventBus from "../../common/EventBus"

export default {
    mixins: [getTargetName],
    methods: {
        // 方法：上传当前笔记
        // 注：文件夹内文件上传前必须选择对应文件夹
        upload() {
            const noteName = this.note.NM

            let folderLoc, folderName
            if ( // 若选择文件夹
                this.selected.obj &&
                this.selected.type == "folder"
            ) {
                folderLoc = this.selected.loc
                folderName = this.getTargetName()
            }

            const noteContent = {
                NM: this.note.NM,
                CTS: this.note.CTS,
            }
            // 上传
            axios.put("/api/upload", {
                note: JSON.stringify(noteContent),
                folderLoc, folderName, noteName,
                password: this.password,
            }).then((res) => {

                // 若返回码为 0
                if (!res.data.code) {
                    // 若为新笔记
                    if (res.data.isNew) {
                        // 更新笔记列表
                        this.noteList = res.data.noteList
                    }

                    EventBus.emit("show-msg", "笔记上传成功。")
                } else { // 若返回码不为 0
                    EventBus.emit("show-msg", res.data.msg)
                }
            }).catch((err) => {
                console.warn(err)
                EventBus.emit("show-msg", "笔记上传请求失败。")
            })
        },
        // 方法：下载服务器中笔记
        download() {
            // 若未选择文件
            if (!this.selected.obj) {
                alert("请选择文件！")
                return
            }
            
            const type = this.selected.type
            // 若选择文件夹
            if (type == "folder") {
                alert("不能下载文件夹。")
                return
            }

            const loc = this.selected.loc
            const name = this.getTargetName()

            axios.post("/api/download", {
                location: loc, name, type,
                password: this.password
            }).then((res) => {
                // 若返回码为 0
                if (!res.data.code) {
                    EventBus.emit("show-msg", "笔记下载成功。")
                    // 询问是否继续
                    let toChange = confirm("将覆盖当前笔记，是否继续？")
                    if (toChange) {
                        const resJsonStr = res.data.noteContent
                        const resNote = JSON.parse(resJsonStr)
                        this.note.NM = resNote.NM
                        this.note.CTS = resNote.CTS
                        EventBus.emit("note-loaded")
                        // Set Title
                        document.title = `${resNote.NM} -- BNotee`
                    }
                } else if (res.data.code == 5) {
                        this.noteList = res.data.noteList
                        EventBus.emit("show-msg", res.data.msg)
                } else { // 若返回码不为 0
                    EventBus.emit("show-msg", res.data.msg)
                }
            }).catch((err) => {
                console.warn(err)
                EventBus.emit("下载文件请求错误！")
            })
        },
        // 方法：创建文件夹
        creatFolder(obj) {
            this.addingFolder = false
            // 若输入为空
            if (!obj) { return }
            const name = obj.CT

            let folderLoc, folderName
            if ( // 若有文件夹被选择
                this.selected.obj &&
                this.selected.type == "folder"
            ) {
                folderLoc = this.selected.loc
                folderName = this.getTargetName()
            }

            axios.post("/api/create-folder", {
                folderName, folderLoc, name,
                password: this.password
            }).then((res) => {
                // 若返回码为 0
                if (!res.data.code) {
                    EventBus.emit("show-msg", "文件夹创建成功。")
                    // 更新笔记列表
                    this.noteList = res.data.noteList
                } else { // 若返回码不为 0
                    EventBus.emit("show-msg", res.data.msg)
                }
            }).catch((err) => {
                console.warn(err)
                EventBus.emit("创建文件夹请求错误。")
            })
        },
        // 方法：删除文件或文件夹
        deleteFile() {
            const toContinue = confirm("此操作无法撤销，你确定吗？")
            if (toContinue) {
                if (this.selected.obj) {
                    // 已选择文件或文件夹
                    const name = this.getTargetName()
                    const type = this.selected.type
                    const loc = this.selected.loc
                    
                    axios.delete("/api/delete", {
                        data: {
                        name, type,
                        location: loc,
                        password: this.password,
                    }}).then((res) => {
                        if (!res.data.code) {
                            // 若返回码为 0
                            this.noteList = res.data.noteList
                            EventBus.emit("show-msg", "文件删除成功。")
                        } else if (res.data.code == 5) {
                            // 文件不存在
                            this.noteList = res.data.noteList
                            EventBus.emit("show-msg", res.data.msg)
                        } else {
                            // 其它错误
                            EventBus.emit("show-msg", res.data.msg)
                        }
                    }).catch((err) => {
                        console.warn(err)
                        EventBus.emit("删除文件请求错误。")
                    })
                } else {
                    alert("请选择文件或文件夹。")
                }
            }
        }
    }
}