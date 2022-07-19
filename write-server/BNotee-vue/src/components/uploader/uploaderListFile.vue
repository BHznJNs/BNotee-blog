<template>
    <!-- 列表项 -->
    <li
        class="item"
        :class="{ selected }"
        @click="select"
    >
        <i class="item-avatar material-icons">assignment</i>
        <span class="item-name">{{ name }}</span>
    </li>
</template>

<script>
import selectEvent from "./selectEvent"

export default {
    props: ["location", "name"],
    mixins: [selectEvent],
    data() {
        return {
            type: "file"
        }
    }
}
</script>