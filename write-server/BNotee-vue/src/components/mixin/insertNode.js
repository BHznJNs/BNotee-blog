export default {
    methods: {
        // 方法：插入节点
        insertNode(obj, loc) {
            if (!obj) {
                return
            }
            // 如果未选择节点
            if (!loc) {
                return
            }
            this.getNodeObj({
                location: loc,
                callback: (nodeArray, index) => {
                    nodeArray.splice(index + 1, 0, obj)
                }
            })
        }
    }
}