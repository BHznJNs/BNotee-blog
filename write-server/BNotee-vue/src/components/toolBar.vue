<template>
    <div class="toolbar shadow-3">
        <info :disabled="!isInfoWindowShow"/>
        <div class="logo shadow-2">
            <div
                class="info-outer"
                @click="isInfoWindowShow = true"
                :class="{ disabled: !isInfoIconShow }"
            >
                <i class="material-icons">info_outline</i>
            </div>
            <div
                class="logo-outer"
                @click="logoClick"
            >
                <i class="material-icons">format_list_bulleted</i>
            </div>
        </div>
        <div class="tools">
            <!-- 插入节点 -->
            <div
                class="tool btn btn-shallow"
                :class="{ 'disabled': !selectedNode.loc }"
                @click="openTextfield"
            >
                <i class="material-icons">add</i>
            </div>
            <!-- 删除节点 -->
            <div
                class="tool btn btn-shallow"
                :class="{ 'disabled': !selectedNode.loc }"
                @click="toDeleteNode"
            >
                <i class="material-icons">remove</i>
            </div>
            <!-- 取消节点选择 -->
            <div
                class="tool btn btn-shallow"
                :class="{ 'disabled': !selectedNode.loc }"
                v-show="isTouchMode"
                @click="nodeCancelSelect"
            >
                <i class="material-icons">indeterminate_check_box</i>
            </div>
            <!-- 节点颜色修改 -->
            <div
                class="tool btn btn-shallow"
                :class="{ 'disabled': !['h1', 'h2', 'h3', 'h4', 'p', 'li'].includes(selectedNode.type) }"
                @click="openColors"
            >
                <i class="material-icons">color_lens</i>
            </div>
            <!-- 清空节点 -->
            <div
                class="tool btn btn-shallow"
                @click="clearNodes"
            >
                <i class="material-icons">clear_all</i>
            </div>
            <!-- 上传笔记 -->
            <div
                class="tool btn btn-shallow"
                @click="openUploader"
                @contextmenu.prevent="saveMarkdown"
            >
                <i class="material-icons">cloud_upload</i>
            </div>
            <!-- 保存笔记 -->
            <div
                class="tool btn btn-shallow"
                @click="saveNote"
            >
                <i class="material-icons">vertical_align_bottom</i>
            </div>
            <!-- 导入笔记 -->
            <div
                class="tool btn btn-shallow"
                @click="readNote"
            >
                <i class="material-icons file">input
                    <input ref="fileUploader" type="file" accept="application/json">
                </i>
            </div>
        </div>
    </div>
</template>

<script>
import Info from "./info.vue"
import getNodeObj from "./mixin/getNodeObj"
import insertNode from "./mixin/insertNode.js"
import deleteNode from "./mixin/deleteNode.js"
import markdownExport from "../common/markdownExport"
import EventBus from "../common/EventBus"
import saveAs from "file-saver"

export default {
    data() {
        return {
            isInfoIconShow: false,
            isInfoWindowShow: false,
        }
    },
    props: ["isTouchMode"],
    inject: ["note", "selectedNode"],
    components: { Info },
    mixins: [getNodeObj, insertNode, deleteNode],
    mounted() {
        const fileUploader = this.$refs.fileUploader
        // 当选择文件
        fileUploader.addEventListener("change", () => {
            // 文件读取
            let reader = new FileReader()
            reader.readAsText(fileUploader.files[0], "uft8")
            // 文件读取完成后，覆盖笔记
            reader.onload = (e) => {
                let result = e.target.result
                this.note.CTS = JSON.parse(result)
                EventBus.emit("note-loaded")
            }
        })

        // 当 textfield 返回插入节点对象
        EventBus.on("textfield-return-toolBar", (nodeObj) => {
            this.toInsertNode(nodeObj)
        })
    },
    methods: {
        // 点击 logo 后一段时间显示 Info 图标
        logoClick() {
            this.isInfoIconShow = true
            setTimeout(() => {
                this.isInfoIconShow = false
            }, 3000)
        },
        // 方法：打开全局输入组
        openTextfield() {
            EventBus.emit("textfield-open", "toolBar")
        },
        // 插入节点前
        toInsertNode(nodeObj) {
            const loc = Array.from(this.selectedNode.loc)
            this.insertNode(nodeObj, loc)
            // 加入历史编辑
            loc[loc.length - 1] += 1 // 数组最后一个元素值 + 1
            EventBus.emit("add-history", {
                loc,
                prop: "IST",
            })
        },
        // 删除节点前
        toDeleteNode() {
            const loc = this.selectedNode.loc
            const nodeObj = this.deleteNode(loc)
            // 加入历史编辑
            loc[loc.length - 1] -= 1 // 数组最后一个元素值 - 1
            EventBus.emit("add-history", {
                loc,
                prop: "DEL",
                nodeObj
            })
        },
        // 方法：触屏模式下，节点取消选择
        nodeCancelSelect() {
            this.selectedNode.vnode.selected = false

            this.selectedNode.loc = null
            this.selectedNode.obj = null
            this.selectedNode.type = null
        },
        // 方法：打开颜色选择器
        openColors() {
            EventBus.emit("fixedComponents-open", "colors")
        },
        // 方法：清空节点
        clearNodes() {
            this.note.CTS = []
            this.note.HT = []
            EventBus.emit("clear-history")
        },
        // 方法：打开笔记上传
        openUploader() {
            EventBus.emit("open-uploader")
        },
        // 方法：保存笔记
        saveNote() {
            let blob = new Blob(
                [JSON.stringify(this.note.CTS)],
                {type: "text/plain;charset=utf-8"}
            )
            const name = this.note.NM || "MyNote"
            saveAs(blob, name + ".json")
        },
        // 方法：markdown 格式导出
        saveMarkdown() {
            const markdown = markdownExport(this.note)
            let blob = new Blob(
                [markdown],
                {type: "text/plain;charset=utf-8"}
            )
            const name = this.note.NM || "MyNote"
            saveAs(blob, name + ".md")
        },
        // 方法：读取本地笔记
        readNote() {
            const fileUploader = this.$refs.fileUploader
            fileUploader.click()
        }
    }
}
</script>

<style scoped>
    .toolbar {
        display: inline-block;
        width: 72px;
        height: 100vh;
        background-color: white;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    }

    /* Logo */
    .logo {
        width: 100%;
        height: 48px;
        padding: 8px 0;
        margin-bottom: 8px;
        color: white;
        background-color: #333;
        text-align: center;
    }
    .logo i {
        display: block;
        font-size: 48px;
        cursor: pointer;
    }
    .logo > .info-outer {
        max-height: 48px;
        overflow: hidden;
        transition: .3s;
    }
    .logo .info-outer.disabled {
        max-height: 0;
        margin-top: -8px;
    }
    .logo .logo-outer {
        margin-top: 8px;
    }
    /* Logo End */

    /* Tools */
    .tools {
        display: flex;
        flex-direction: column;
        height: calc(100% - 72px);
        padding-bottom: 1rem;
        overflow: -moz-scrollbars-none;
        overflow-y: auto;
    }
    .tools::-webkit-scrollbar {
        width: 0 !important
    }

    .tool {
        margin: .6rem auto;
    }
    /* Tools End */

    /* File Uploader */
    i.file input {
        display: none;
    }
</style>