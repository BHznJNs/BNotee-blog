<template>
    <transition name="slide">
    <div
        class="textfield-group fixed-component fixed"
        v-show="!disabled"
    >
        <select
            class="selector" ref="selector"
            v-show="!isFromNestedList"
        >
            <option value="h">标题</option>
            <option value="p">段落</option>
            <option value="hr">割线</option>
            <option value="floor">层次</option>
            <option value="ol">序列</option>
            <option value="ul">乱列</option>
            <option value="code">代码</option>
            <option value="table">表格</option>
            <option value="details">详情</option>
        </select>
        <select
            class="selector" ref="selector4List"
            v-show="isFromNestedList"
        >
            <option value="li">列项</option>
            <option value="ol">序列</option>
            <option value="ul">乱列</option>
        </select>

        <div
            class="textfield" ref="inputer"
            contenteditable="true"
            @keydown.enter="onEnter"
        ></div>
        <div
            class="textfield-closer closer"
            @click="closeTextfield"
        >
            <i class="material-icons">close</i>
        </div>
    </div>
    </transition>
</template>

<script>
import EventBus from "../../common/EventBus"
import nodeObjReturner from "../../common/nodeObjReturner"

export default {
    data() {
        return {
            commandFrom: ""
        }
    },
    props: ["disabled"],
    inject: ["selectedNode"],
    computed: {
        // 判断是否来自嵌套列表或列表内
        isFromNestedList() {
            return this.commandFrom == "list" || 
                   ["li", "nestedList"]
                   .includes(this.selectedNode.type)
        }
    },
    mounted() {
        EventBus.on("textfield-open", (from) => {
            this.commandFrom = from
        })
    },
    methods: {
        // 同时按下 alt 和 enter 时
        onEnter(e) {
            if (e.altKey) {
                e.preventDefault()
                this.closeTextfield()
            }
        },
        // 方法：关闭文本框，并将值返回给父节点
        closeTextfield() {
            this.$emit("close", "textfieldGroup")
            // 获取对应数据
            const tagName = !this.isFromNestedList ?
                            this.$refs.selector.value :
                            this.$refs.selector4List.value
            const content = this.$refs.inputer.innerText
            // 定义返回对象
            const returnObj = nodeObjReturner(tagName, content)
            // 传值
            EventBus.emit("textfield-return-" + this.commandFrom, returnObj)

            this.$refs.inputer.blur()
            this.$refs.inputer.innerText = ""
        }
    }
}
</script>