<script>
import { h } from "vue"
import BasicNode from "./basicNode"
import EventBus from "../../common/EventBus"

export default {
    props: [
        "level", "content",
        "location", "color",
    ],
    components: [BasicNode],
    mounted() {
        this.$nextTick(() => {
            EventBus.emit("anchor-mounted")
        })
    },
    render() {
        let tagName
        // 限制，最大为 h5
        if (this.level < 6) {
            tagName = "h" + this.level
        } else {
            tagName = "h5"
        }

        return h(BasicNode, {
            tagName: tagName,
            id: this.location.join(""),
            class: "heading",
            content: this.content,
            color: this.color,
            location: this.location,
        })
    }
}
</script>
