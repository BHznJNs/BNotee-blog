<!-- 列表块组件，其中仅允许加入 列表块、列表项节点 -->
<template>
    <div
        class="list"
        :class="{ 
            'shadow-2': selected,
            'hover': hover,
            'empty': !children.length,
            'touch-mode': isTouchMode,
            'nested': isNested
         }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <!-- 遮挡右侧阴影 -->
        <div class="mask"></div>

        <list-child :ordered="isOrdered">
            <template
                v-for="(item, index) in children"
                :key="item.id"
            >
                <list-block
                    v-if="item.NT == 'list'"
                    :isOrdered="item.OL"
                    :children="item.CTS"
                    :location="location.concat([index])"
                    @mouse-in-child="onMouseLeave"
                />
                <basic-node
                    v-else
                    :tagName="'li'"
                    :content="item.CT"
                    :color="item.CL"
                    :location="location.concat([index])"
                />
            </template>
        </list-child>

        <block-controls
            :disabled="!hover"
            :isTouchMode="isTouchMode"
            :selected="selected"
            :location="location"
            :parentType="'list'"
        >
            <div
                class="btn btn-normal tool-btn-in-block"
                @click="addListBlock"
            >
                <i class="material-icons">playlist_add</i>
            </div>
            <div
                class="btn btn-normal tool-btn-in-block"
                @click="toggleOrdered"
            >
                <i class="material-icons" v-show="isOrdered">format_list_bulleted</i>
                <i class="material-icons" v-show="!isOrdered">format_list_numbered</i>
            </div>
        </block-controls>
    </div>
</template>

<script>
import EventBus from "../../common/EventBus"
import BasicNode from "./basicNode"
import BlockControls from "./blockControls"
import getNodeObj from "../mixin/getNodeObj"
import blockHoverEvent from "../mixin/blockHoverEvent.js"
import { h } from "vue"

export default {
    name: "list-block",
    data() {
        return {
            selected: false,
            isNested: null,
        }
    },
    components: {
        BasicNode, BlockControls,
        listChild: {
            props: ["ordered"],
            render() {
                return h(
                    this.ordered ? "ol" : "ul",
                    this.$slots.default()
                )
            }
        }
    },
    props: [
        "children", "isOrdered",
        "location",
    ],
    inject: ["isTouchMode"],
    mixins: [getNodeObj, blockHoverEvent],
    methods: {
        addListBlock() {
            const CTS = this.getThisObj.CTS
            CTS.push({
                NT: "list",
                OL: false,
                CTS: [
                    {
                        NT: "li",
                        CT: "",
                        CL: "#333",
                    }
                ]
            })
            // 添加历史对象
            const loc = Object.create(this.location)
            loc.push(CTS.length - 1)
            EventBus.emit("add-history", {
                loc,
                prop: "IST"
            })
        },
        toggleOrdered() {
            this.getThisObj.OL = !this.getThisObj.OL
        }
    },
    mounted() {
        // 是否为嵌套列表
        const parentNode = this.$el.parentNode
        this.isNested = (
            parentNode.tagName == "OL" ||
            parentNode.tagName == "UL"
        )
    }
}
</script>