<!-- 编辑历史，最大存储20个 -->
<template>
    <transition name="slide">
    <div class="history fixed-component" v-show="!disabled">
        <div
            class="btn btn-shallow"
            :class="{ 'disabled': historyIndex == note.HT.length - 1 }"
            @click="doit('undo')"
        >
            <i class="material-icons">undo</i>
        </div>
        <div
            class="btn btn-shallow"
            :class="{ 'disabled': historyIndex < 0 }"
            @click="doit('redo')"
        >
            <i class="material-icons">redo</i>
        </div>
        <div
            class="btn btn-shallow"
            :class="{ 'disabled': !note.HT.length }"
            @click="drawerDisabled = false"
        >
            <i class="material-icons">menu</i>
        </div>
    </div>
    </transition>
    
    <drawer
        :title="'编辑历史'"
        :disabled="drawerDisabled"
        @close-drawer="drawerDisabled = true"
    >
        <history-view
            :list="note.HT"
            :index="historyIndex"
        />
    </drawer>
</template>

<script>
import EventBus from "../../common/EventBus"
import getNodeObj from "../mixin/getNodeObj"
import insertNode from "../mixin/insertNode.js"
import deleteNode from "../mixin/deleteNode.js"
import Drawer from "./drawer"
import HistoryView from "./historyView"

export default {
    data() {
        return {
            drawerDisabled: true,
            historyIndex: -1
        }
    },
    components: { Drawer, HistoryView },
    props: ["disabled"],
    inject: ["note", "selectedNode"],
    mixins: [getNodeObj, insertNode, deleteNode],
    methods: {
        // 方法：撤销 || 恢复
        doit(type) {
            // 取历史修改索引
            const index = (type == "undo") ?
                       ++this.historyIndex :
                       this.historyIndex--
            // 取历史修改对象
            let historyObj = this.note.HT[index]
            // undo -> before || redo -> after
            const resultValue = (type == "undo") ?
                                "before" : "after"

            switch (historyObj.prop) {
                case "CT":
                case "CL":
                case "SUM":
                    this.getNodeObj({
                        location: historyObj.loc,
                        callback: (nodeArray, index) => {
                            const obj = nodeArray[index]
                            obj[historyObj.prop] = historyObj[resultValue]
                        }
                    })
                    break
                case "ROW":
                case "COL":
                    EventBus.emit("table-edit", {
                        historyObj, resultValue
                    })
                    break
                case "IST": {
                    const loc = historyObj.loc
                    const nodeObj = this.deleteNode(loc)

                    // console.log(this.note.HT.shift())
                    historyObj.prop = "DEL"
                    historyObj.loc[historyObj.loc.length - 1] -= 1
                    historyObj.nodeObj = nodeObj
                    // this.note.HT.unshift(historyObj)
                    break
                }
                case "DEL": {
                    const nodeObj = historyObj.nodeObj
                    const loc = historyObj.loc
                    this.insertNode(nodeObj, loc)

                    // this.note.HT.shift()
                    historyObj.prop = "IST"
                    historyObj.loc[historyObj.loc.length - 1] += 1
                    // this.note.HT.unshift(historyObj)
                    break
                }
            }
        },
        // 根据索引批量操作
        doSome(index) {
            const diff = index - this.historyIndex
            const diffAbs = Math.abs(diff)
            let type
            if (diff > 0) {
                // 若需撤销
                type = "undo"
            } else if (diff < 0) {
                type = "redo"
            } else {
                return
            }
            for (let i = 0; i < diffAbs; i++) {
                this.doit(type)
            }
        }
    },
    mounted() {
        // alt + z --> undo
        addEventListener("keydown", (e) => {
            const altKey = e.altKey
            const keyName = e.key
            if (altKey && keyName == "z") {
                this.doit("undo")
            }
        })
        // alt + y --> redo
        addEventListener("keydown", (e) => {
            const altKey = e.altKey
            const keyName = e.key
            if (altKey && keyName == "y") {
                this.doit("redo")
            }
        })

        // 添加编辑历史
        EventBus.on("add-history", (obj) => {
            const historyArray = this.note.HT

            // 限制列表最多容纳 20 个对象
            if (historyArray.length == 20) {
                historyArray.pop()
            }

            if (this.historyIndex < 0) {
                // 未进行撤销
                historyArray.unshift(obj)
            } else {
                // 经过撤销，去除撤销之后所有历史操作
                const times = this.historyIndex + 1
                historyArray.splice(0, times)
                historyArray.unshift(obj)
                this.historyIndex = -1
            }
        })
        EventBus.on("clear-history", () => {
            this.historyIndex = -1
        })
    }
}
</script>

<style scoped>
    .history {
        display: flex;
        align-items: center;
    }
    .btn {
        margin: 0 12px;
    }
    .btn:first-child {
        margin-left: 24px;
    }
    .btn:last-child {
        margin-right: 24px;
    }
</style>