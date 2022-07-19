<template>
    <div
        class="controls"
        :class="{
            'disabled': disabled && !isTouchMode,
            'touch-mode': isTouchMode
        }"
    >
        <div
            class="btn btn-normal tool-btn-in-block"
            @click="addNode"
        >
            <i class="material-icons">add</i>
        </div>
        <slot></slot>
        <label class="checkbox">
            <input
                type="checkbox"
                ref="checkbox"
                :checked="selected"
                @change="selectEvent"
            />
            <i
                class="checkbox-icon"
                @touchstart="_touchstart"
                @touchend="_touchend"
            ></i>
        </label>
    </div>
</template>

<script>
import getNodeObj from "../mixin/getNodeObj"
import blockControlsAdder from "./blockControlsAdder"

export default {
    data() {
        return {
            timeout: null,
        }
    },
    props: [
        "isTouchMode", "parentType",
        "disabled", "location", "selected",
    ],
    inject: ["selectedNode"],
    mixins: [getNodeObj, blockControlsAdder],
    methods: {
        _touchstart() {
            this.timeout = setTimeout(() => {
                this.addNode()
            }, 1000)
        },
        _touchend() {
            clearTimeout(this.timeout)
        },
        selectEvent() {
            // 返回对象是否 checked
            const checked = this.$refs.checkbox.checked
            this.$parent.selected = checked

            // 若被选择
            if (checked) {
                // 如果已有节点被选择
                if (this.selectedNode.loc) {
                    // 选取已被选择节点并取消选择
                    this.selectedNode.vnode.selected = false
                }

                this.selectedNode.loc = this.location
                this.selectedNode.vnode = this.$parent
                this.selectedNode.type = this.parentType
                // 若父组件为列表
                if (this.parentType == "list") {
                    this.selectedNode.type =
                        (this.$parent.isNested) ?
                            "nestedList" :
                            "notNestedList"
                }
            } else { // 若取消选择
                this.selectedNode.loc = null
                this.selectedNode.vnode = null
                this.selectedNode.type = null
            }
        }
    }
}
</script>

<style scoped>
    /* Controls */
    .controls {
        display: flex;
        height: 32px;
        -webkit-box-sizing: border-box;
            box-sizing: border-box;
        transition: height .3s;
    }
    .controls.disabled {
        height: 0 !important;
        margin: 0;
    }
    
    /* Touch Mode */
    .touch-mode {
        position: absolute;
        top: 0;
        left: -44px;
    }
</style>
<style>
    .controls.disabled * {
        display: none;
    }
</style>