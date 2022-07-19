<template>
    <transition name="slide">
    <div
        class="table-setter fixed-component"
        v-show="!disabled"
    >
        <div class="input-group">
            <i class="hint material-icons">view_headline</i>
            <input
                class="inputter" type="text"
                placeholder=" > 0 "
                v-model="row"
            >
        </div>
        
        <div class="input-group">
            <i class="hint material-icons">view_column</i>
            <input
                class="inputter" type="text"
                placeholder=" > 0 " maxlength="3"
                v-model="col"
            >
        </div>

        <div
            class="closer"
            @click="tableSet"
        >
            <i class="material-icons">check</i>
        </div>

        <div
            class="closer"
            @click="$emit('close', 'tableSetter')"
        >
            <i class="material-icons">close</i>
        </div>
    </div>
    </transition>
</template>
<script>
import EventBus from "../../common/EventBus"
import getNodeObj from "../mixin/getNodeObj"

export default {
    data() {
        return {
            row: 1,
            col: 1,
            targetNode: null,
            targetNodeLoc: [],
            timeout: null,
        }
    },
    props: ["disabled"],
    mixins: [getNodeObj],
    mounted() {
        const nameDict = {
            "ROW": "row",
            "COL": "col"
        }

        EventBus.on("table-location", (loc) => {
            this.tableGet(loc)
        })

        // 历史记录 修改 需要
        EventBus.on("table-edit", ({
                historyObj, resultValue
            }) => {
            this.tableGet(historyObj.loc)

            const targetProp = nameDict[historyObj.prop] // row || col
            this[targetProp] = historyObj[resultValue]
            this.tableSet(false)
        })
    },
    methods: {
        eventListen(e) {
            const keyName = e.key
            if (keyName == "Enter") {
                this.tableSet(true)
            }
        },
        tableGet(location) {
            // 获取目标表格节点
            if (location) {
                this.targetNodeLoc = location
                this.getNodeObj({
                    location,
                    callback: (nodeArray, index) => {
                        this.targetNode = nodeArray[index]
                    }
                })
            }
            
            // 获取目标行数、列数
            this.row = this.targetNode.CTS.length
            this.col = this.targetNode.CTS[0].length
        },
        tableSet(toAddHistory) {
            // 目标节点行数、列数 (初始行数、列数)
            const initialRow = this.targetNode.CTS.length
            const initialCol = this.targetNode.CTS[0].length
            // 计算差值
            const rowDiff = Math.abs(this.row - initialRow)
            const colDiff = Math.abs(this.col - initialCol)

            // 若列数改变
            if (this.col != initialCol) {
                if (toAddHistory) {
                    EventBus.emit("add-history", {
                        loc: this.targetNodeLoc,
                        prop: "COL",
                        before: initialCol,
                        after: this.col
                    })
                }

                if (this.col > initialCol) {
                    // 若列数增加
                    for (let row of this.targetNode.CTS) {
                        
                        for (let i = 0; i < colDiff; i++) {
                            row.push("")
                        }
                    }
                } else {
                    // 若列数减少
                    for (let row of this.targetNode.CTS) {
                        // 计算差值
                        for (let i = 0; i < colDiff; i++) {
                            row.pop()
                        }
                    }
                }
            }
            // 若行数改变
            if (this.row != initialRow) {
                if (toAddHistory) {
                    EventBus.emit("add-history", {
                        loc: this.targetNodeLoc.loc,
                        prop: "ROW",
                        before: initialRow,
                        after: this.row
                    })
                }
                
                if (this.row > initialRow) {
                    // 若行数增加
                    let singleRow = [] // 单独表格行
                    for (let i = 0; i < this.col; i++) {
                        singleRow.push("")
                    }
                    for (let i = 0; i < rowDiff; i++) {
                        this.targetNode.CTS.push([...singleRow])
                    }
                } else {
                    // 若行数减少
                    for (let i = 0; i < rowDiff; i++) {
                        this.targetNode.CTS.pop()
                    }
                }
            }
            
        }
    },
    watch: {
        disabled(newVal) {
            if (!newVal) {
                // 激活时
                addEventListener("keydown", this.eventListen)
            } else {
                // 未激活时
                this.targetNode = null
                this.targetNodeLoc = []
                removeEventListener("keydown", this.eventListen)
            }
        },
        row(newVal) {
            if (newVal < 1) {
                this.timeout = setTimeout(() => {
                    this.row = 1
                }, 1000)
            } else {
                clearTimeout(this.timeout)
            }
        },
        col(newVal) {
            if (newVal < 1) {
                this.timeout = setTimeout(() => {
                    this.col = 1
                }, 1000)
            } else {
                clearTimeout(this.timeout)
            }
        }
    }
}
</script>

<style scoped>
    /* Table Setter */
    .table-setter {
        display: flex;
        padding-left: 8px;
        background-color: white;
    }
    .input-group {
        margin-left: 8px;
        margin-right: 8px;
    }
    .inputter {
        width: 3em !important;
    }
    .hint {
        font-size: 24px;
    }
    .closer {
        width: auto;
        height: 100%;
        line-height: 54px;
        color: var(--default-text-color);
    }
</style>