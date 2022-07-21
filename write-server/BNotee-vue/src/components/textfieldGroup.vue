<template>
    <div
        class="textfield-group shadow-2"
        :class="{ 'disabled': !isAdding }"
    >
        <select class="selector" ref="selector">
            <option value="h">标题</option>
            <option value="p">段落</option>
            <option value="link">链接</option>
            <option value="hr">割线</option>
            <option value="floor">层次</option>
            <option value="ol">序列</option>
            <option value="ul">乱列</option>
            <option value="code">代码</option>
            <option value="table">表格</option>
            <option value="details">详情</option>
        </select>
        <div
            class="textfield"
            contenteditable="true"
            ref="inputter"
            @keydown.enter.prevent="enter"
        ></div>
        <div
            class="textfield-closer closer"
            @click="closeNodeAdder()"
        >
            <i class="material-icons">close</i>
        </div>
    </div>
</template>

<script>
import nodeObjReturner from "../common/nodeObjReturner"

export default {
    props: ["isAdding"],
    inject: ["note"],
    methods: {
        focus() {
            const textfield = this.$refs.inputter
            textfield.focus()
        },
        enter() {
            this.closeNodeAdder()
        },
        // 方法：关闭文本框，并将值返回给父节点
        closeNodeAdder() {
            const selector = this.$refs.selector
            const textfield = this.$refs.inputter

            const tagName = selector.value
            const content = textfield.innerText
            // 返回对象
            const returnObj = nodeObjReturner(tagName, content)

            this.$emit("return-node", returnObj)
            
            textfield.blur()
            textfield.innerText = ""
        }
    }
}
</script>