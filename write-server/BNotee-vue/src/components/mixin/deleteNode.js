export default {
    methods: {
        // 方法：删除被选择节点
        deleteNode(location) {
            if (this.selectedNode.vnode) {
                // Avoid error: `Cannot set property 'loc' of undefined`
                this.selectedNode.loc = null
                this.selectedNode.type = ""
                this.selectedNode.vnode = null
                this.selectedNode.obj = null
            }
            
            let nodeObj
            this.getNodeObj({
                location,
                callback: (nodeArray, index) => {
                    nodeObj = nodeArray[index]
                    // 删除节点
                    nodeArray.splice(index, 1)
                }
            })
            return nodeObj
        }
    }
}