<template>
    <tr>
        <td v-for="(content, index) in children"
            :key="content.id"
            @click="edit" @contextmenu="edit"
            @blur="finishEdit($event, index)"
            contenteditable="true"
        >{{ content }}</td>
    </tr>
</template>

<script>
import getNodeObj from "../mixin/getNodeObj"

export default {
    mixins: [getNodeObj],
    props: ["children", "location"],
    methods: {
        // 方法：编辑表格单元格
        edit(e) {
            let el = e.target
            el.classList.add("editing")
        },
        // 方法：表格单元格完成编辑
        finishEdit(e, i) {
            let el = e.target
            el.classList.remove("editing")
            // 将数据同步到 this.note
            let finalCT = el.innerText // Final Content
            this.getThisObj[i] = finalCT
        }
    }
}
</script>