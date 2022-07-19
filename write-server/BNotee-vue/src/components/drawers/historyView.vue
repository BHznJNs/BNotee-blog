<template>
    <div
        class="history-block"
        v-for="(item, index) in list"
        :key="item.id"
        ref="historyBlock"
    >
        <div>
            <span class="history-prop">位置：</span>
            <span class="loc">{{ item.loc }}</span>
        </div>
        <div>
            <span class="history-prop">属性：</span>
            <span class="prop">{{ propsDict[item.prop] }}</span>
        </div>
        <div v-show="item.before">
            <span class="history-prop">改前：</span>
            <span class="text" :title="item.before">{{ item.before }}</span>
        </div>
        <div v-show="item.after">
            <span class="history-prop">改后：</span>
            <span class="text" :title="item.after">{{ item.after }}</span>
        </div>
        
        <div
            class="btn btn-shallow"
            @click="doSome"
        >
            <i class="material-icons" :data-index="index">check</i>
        </div>
    </div>
</template>

<script>
export default {
    props: ["list", "index"],
    data() {
        return {
            propsDict: {
                CT: "内容", CL: "颜色", SUM: "题目",
                ROW: "行数", COL: "列数",
                IST: "插入", DEL: "删除"
            }
        }
    },
    methods: {
        doSome(e) {
            const obj = e.target
            const index = obj.dataset["index"]
            const historyParent = this.$parent.$parent
            historyParent.doSome(index)
        }
    },
    watch: {
        index(newVal, oldVal) {
            const parentNode = this.$el.parentNode
            const newTargetNode = parentNode.children[newVal]
            const oldTargetNode = parentNode.children[oldVal]

            if (newVal > -1) {
                newTargetNode.classList.add("selected")
            }
            if (oldVal > -1) {
                oldTargetNode.classList.remove("selected")
            }
        }
    }
}
</script>

<style scoped>
    .history-block {
        position: relative;
        margin: 0 12px 16px;
        padding: 8px;
        background-color: #fff;
        border-radius: 2px;
        line-height: 1.5;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        overflow: hidden;
        -webkit-box-shadow: var(--shadow-2);
                box-shadow: var(--shadow-2);
        -webkit-transition: background .3s;
                transition: background .3s;
    }
    .history-block.selected {
        background-color: #EEE;
    }

    /* History Block Content */
    .history-prop {
        user-select: none;
        padding-left: 2px;
        border-left: solid #90A4AE 0;
        transition: border-width .2s;
    }
    div:hover > .history-prop {
        border-width: 4px;
    }
    .loc, .prop {
        user-select: none;
    }
    .loc, .prop, .text {
        font-family: sans-serif;
        padding: 1px 6px;
        border-radius: 6px;
    }
    .loc {
        background-color: #E8F5E9;
    }
    .prop {
        background-color: #E1F5FE;
    }
    .text {
        background-color: #EEE;
    }
    /* History Block Content End */

    .btn {
        width: 148px;
        height: 0;
        margin: 0 auto 0;
        transition: all .2s,
                    height .2s .2s,
                    margin .2s;
    }
    .history-block:hover .btn {
        height: 36px;
        margin-top: 8px;
    }
</style>