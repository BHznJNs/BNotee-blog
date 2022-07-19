<template>
    <div
        class="floor shadow-1"
        :class="{
            'shadow-3': selected,
            'touch-mode': isTouchMode
        }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <!-- 遮挡右侧阴影 -->
        <div class="mask"></div>

        <template
            v-for="(item, index) in children"
            :key="item.id"
        >
            <floor-block
                v-if="item.NT == 'floor'"
                :children="item.CTS" :level="level + 1"
                :location="location.concat([index])"
            />
            <node-renderer
                v-else
                :nodeObj="item" :level="level"
                :location="location.concat([index])"
            />
        </template>

        <block-controls
            :disabled="!hover"
            :isTouchMode="isTouchMode"
            :selected="selected"
            :location="location"
            :parentType="'floor'"
        />
    </div>
</template>

<script>
import NodeRenderer from "./nodeRenderer"
import BlockControls from "./blockControls"
import blockHoverEvent from "../mixin/blockHoverEvent.js"

export default {
    name: "floor-block",
    components: {
        BlockControls, NodeRenderer
    },
    data() {
        return {
            selected: false,
        }
    },
    props: [
        "level", "location",
        "children",
    ],
    inject: ["isTouchMode"],
    mixins: [blockHoverEvent],
}
</script>