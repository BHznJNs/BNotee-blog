<script>
import { h } from "vue"
import getNodeObj from "../mixin/getNodeObj"
import selectEvent from "../mixin/nodeSelectEvent"
import EventBus from "../../common/EventBus"

export default {
    data() {
        return {
            selected: false,
            initialContent: "",
            editing: false,
            dbRightClick: false,
        }
    },
    inject: ["selectedNode"],
    mixins: [getNodeObj, selectEvent],
    props: [
        "tagName", "content",
        "location", "color",
        "href"
    ],
    render() {
        return h(this.tagName, {
            contentEditable: true,
            href: this.href,
            target: "_blank",
            class: {
                "selected": this.selected,
                "editing": this.editing,
                "inline-style": true
            },
            style: {
                "color": this.color
            },
            onClick: (e) => {
                e.preventDefault()
                window.open(this.href)
                this.$el.blur()
            },
            onContextmenu: (e) => {
                e.preventDefault()
                // 右键双击，选择节点
                if (this.dbRightClick) {
                    this.selectEvent()
                    return
                }
                this.dbRightClick = true
                setTimeout(() => {
                    this.dbRightClick = false
                }, 300)
                // 右键单击，开始编辑
                if (!this.editing) {
                    this.initialContent = e.target.innerText
                }
                this.editing = true
            },
            onBlur: (e) => {
                const resultContent = e.target.innerText
                // 若节点中文本发生改变
                if (resultContent != this.initialContent) {
                    // 修改 this.note 中对应对象数据
                    this.getThisObj.CT = resultContent
                    EventBus.emit("add-history", {
                        loc: this.location,
                        prop: "CT",
                        before: this.initialContent,
                        after: resultContent
                    })
                    this.initialContent = resultContent
                }
                this.editing = false
            }
        }, this.content)
    }
}
</script>