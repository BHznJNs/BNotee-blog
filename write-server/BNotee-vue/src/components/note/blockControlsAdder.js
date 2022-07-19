import EventBus from "../../common/EventBus"
export default {
    methods: {
        tableAdder(CTS) {
            // 获取当前表格行数，列数
            const rowNum = CTS.length
            const colNum = CTS[0].length
            // 新行
            let newRow = []
            for (let i = 0; i < colNum; i++) {
                newRow.push("")
            }
            // 插入新行
            CTS.push(newRow)
            EventBus.emit("add-history", {
                loc: this.location,
                prop: "ROW",
                before: rowNum,
                after: rowNum + 1
            })
        },
        detailAdder(CTS) {
            // 为 详情 组件，直接添加 子段落元素
            CTS.push({
                CT: "",
                CL: "#333",
            })
            // 添加历史对象
            const loc = Object.create(this.location)
            loc.push(CTS.length - 1)
            EventBus.emit("add-history", {
                loc,
                prop: "IST"
            })
        },
        listAdder(CTS) {
            // 为 列表 组件，直接添加 子段落元素
            CTS.push({
                NT: "li",
                CT: "",
                CL: "#333",
            })
            // 添加历史对象
            const loc = Object.create(this.location)
            loc.push(CTS.length - 1)
            EventBus.emit("add-history", {
                loc,
                prop: "IST"
            })
        },
        floorAdder(CTS){
            // 添加事件监听
            EventBus.off("textfield-return-" + this.parentType)
            EventBus.on("textfield-return-" + this.parentType, (obj) => {
                // 向父元素添加节点
                if (obj) {
                    CTS.push(obj)
                }
                // 添加历史对象
                const loc = Array.from(this.location)
                loc.push(CTS.length - 1)
                EventBus.emit("add-history", {
                    loc,
                    prop: "IST",
                })
                // 移除事件监听
                EventBus.off("textfield-return-" + this.parentType)
            })

            EventBus.emit("textfield-open", this.parentType)
        },
        // 方法：添加节点
        addNode() {
            const CTS = this.getThisObj.CTS

            switch (this.parentType) {
                case "table":
                    this.tableAdder(CTS)
                    break
                case "details":
                    this.detailAdder(CTS)
                    break
                case "list":
                    this.listAdder(CTS)
                    break
                case "floor":
                    this.floorAdder(CTS)
            }
        }
    }
}