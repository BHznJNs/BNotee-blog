<template>
    <div
        class="details"
        :class="{ 
            'shadow-2': selected,
            'hover': hover,
            'touch-mode': isTouchMode
        }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <summary
            class="summary"
            contenteditable="true"
            ref="summary"
            @blur="finishEdit"
        >{{ summary }}</summary>
        <details>
            <summary
                @contextmenu="$refs.summary.focus()"
                style="line-height: 1.4"
            ></summary>
            <template
                v-for="(item, index) in children"
                :key="item.id"
            >
                <basic-node
                    :tagName="'p'"
                    :content="item.CT"
                    :color="item.CL"
                    :location="location.concat([index])"
                />
            </template>
        </details>
        <block-controls
            :disabled="!hover"
            :isTouchMode="isTouchMode"
            :selected="selected"
            :location="location"
            :parentType="'details'"
        />
    </div>
</template>

<script>
import BasicNode from "./basicNode"
import BlockControls from "./blockControls"
import blockHoverEvent from "../mixin/blockHoverEvent.js"
import getNodeObj from "../mixin/getNodeObj"
import EventBus from "../../common/EventBus"

export default {
    data() {
        return {
            selected: false
        }
    },
    components: {BasicNode, BlockControls},
    mixins: [getNodeObj, blockHoverEvent],
    inject: ["isTouchMode"],
    props: [
        "children", "summary",
        "location",
    ],
    methods: {
        finishEdit(e) {
            const obj = e.target
            const newSum = obj.innerText
            EventBus.emit("add-history", {
                loc: this.location,
                prop: "SUM",
                before: this.getThisObj.SUM,
                after: newSum
            })
            this.getThisObj.SUM = newSum
        }
    }
}
</script>
<style scoped>
.details:not(.touch-mode).hover .controls {
    margin-top: 6px;
}
</style>