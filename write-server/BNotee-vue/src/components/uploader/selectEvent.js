export default {
    data() {
        return {
            selected: false
        }
    },
    inject: ["selectedItem"],
    methods: {
        select() {
            if (this.selected) {
                // 节点取消选择
                this.selected = false
                this.selectedItem.loc = []
                this.selectedItem.type = ""
                this.selectedItem.obj = null
            } else {
                // 节点被选择
                this.selected = true
                if (this.selectedItem.obj) {
                    // 若已有被选择节点
                    this.selectedItem.obj.selected = false
                }
                this.selectedItem.loc = this.location
                this.selectedItem.type = this.type
                this.selectedItem.obj = this
            }
        }
    }
}