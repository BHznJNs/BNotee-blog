<script>
import { h } from "vue"
import getNodeObj from "../mixin/getNodeObj"
import selectEvent from "../mixin/nodeSelectEvent"
import compiler from "../../common/compiler"
import EventBus from "../../common/EventBus"

export default {
    data() {
        return {
            selected: false,
            initialContent: "",
            editing: false,
            dbTouch: false,
        }
    },
    inject: ["selectedNode"],
    mixins: [getNodeObj, selectEvent],
    props: [
        "tagName", "content",
        "location", "color",
    ],
    watch: {
        content(newVal) {
            this.$nextTick(() => {
                const HTMLOutput = compiler.outputer(newVal)
                this.$el.innerHTML = HTMLOutput
            })
        }
    },
    render() {
        return h(this.tagName, {
            contentEditable: true,
            class: {
                "selected": this.selected,
                "editing": this.editing,
                "inline-style": true
            },
            style: {
                "color": this.color
            },
            onContextmenu: (e) => {
                e.preventDefault()
                if (!this.initialContent) {
                    this.initialContent = e.target.innerText
                }
                this.selectEvent()
            },
            onTouchstart: () => {
                // 双击选择
                if (this.dbTouch) {
                    this.selectEvent()
                }
                this.dbTouch = true
                setTimeout(() => {
                    this.dbTouch = false
                }, 300)
            },
            onClick: () => {
                // 储存修改前节点内容
                if (!this.editing) {
                    this.initialContent = this.$el.innerText
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