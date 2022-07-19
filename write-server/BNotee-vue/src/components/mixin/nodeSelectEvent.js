import EventBus from "../../common/EventBus"

export default {
    methods: {
        // 方法：右键节点时，触发选择节点事件
        selectEvent() {
            if (this.selected) {
                // 关闭全局组件
                EventBus.emit("fixedComponents-close")
                // 如果节点已被选择，取消选择
                this.selectedNode.loc = null
                this.selectedNode.vnode = null
                this.selectedNode.obj = null
                this.selectedNode.type = null
                this.selected = false
            } else {
                // 如果已有节点被选择
                if (this.selectedNode.loc) {
                    // 选取已被选择节点并取消选择
                    this.selectedNode.vnode.selected = false
                }
                this.selectedNode.loc = this.location
                this.selectedNode.vnode = this
                this.selectedNode.obj = this.getThisObj
                this.selectedNode.type = this.tagName
                this.selected = true
            }
        }
    }
}