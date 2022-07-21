<script>
import { h } from "vue"
import Heading from "./heading"
import BasicNode from "./basicNode"
import AnchorLink from "./anchorLink"
import ListBlock from "./listBlock"
import TableBlock from "./tableBlock"
import DetailBlock from "./detailBlock"
import CodeBlock from "./codeBlock.vue"

export default {
    props: [
        "nodeObj", "level",
        "location",
    ],
    render() {
        let nodeProps = {
            location: this.location
        }
        let nodeType
        switch (this.nodeObj.NT) {
            case "h":
                nodeType = Heading
                nodeProps.level = this.level
                nodeProps.content = this.nodeObj.CT
                nodeProps.color = this.nodeObj.CL
                break
            case "link":
                nodeType = AnchorLink
                nodeProps.tagName = "a"
                nodeProps.content = this.nodeObj.CT
                nodeProps.color = this.nodeObj.CL
                nodeProps.href = this.nodeObj.HF
                break
            case "list":
                nodeType = ListBlock
                nodeProps.isOrdered= this.nodeObj.OL
                nodeProps.children= this.nodeObj.CTS
                break
            case "table":
                nodeType = TableBlock
                nodeProps.children= this.nodeObj.CTS
                break
            case "details":
                nodeType = DetailBlock
                nodeProps.summary = this.nodeObj.SUM
                nodeProps.children = this.nodeObj.CTS
                break
            case "code":
                nodeType = CodeBlock
                nodeProps.language = this.nodeObj.LG
                nodeProps.code = this.nodeObj.CT
                break
            default:
                nodeType = BasicNode
                nodeProps.tagName = this.nodeObj.NT
                nodeProps.content = this.nodeObj.CT
                nodeProps.color = this.nodeObj.CL
        }
        return h(
            nodeType,
            nodeProps
        )
    }
}
</script>