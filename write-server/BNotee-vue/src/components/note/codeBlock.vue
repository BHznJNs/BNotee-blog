<template>
    <highlightjs
        :code="code"
        :language="language"
        :autodetect="false"
        @focusout="render"
        @contextmenu="select"
        v-once tabindex="0"
    />
</template>

<script>
import hljs from "highlight.js/lib/common"
import hljsVuePlugin from "@highlightjs/vue-plugin"
import getNodeObj from "../mixin/getNodeObj.vue"
import nodeSelectEvent from "../mixin/nodeSelectEvent"
import codeInput from "../mixin/codeInput"
import EventBus from "../../common/EventBus"

export default {
    data() {
        return {
            tagName: "code",
            codeNode: null,
            selected: false
        }
    },
    components: {
        highlightjs: hljsVuePlugin.component
    },
    mixins: [getNodeObj, nodeSelectEvent, codeInput],
    inject: ["selectedNode"],
    props: ["language", "code", "location"],
    watch: {
        code(newVal) {
            this.codeNode.innerHTML = newVal
            hljs.highlightElement(this.codeNode)
        }
    },
    methods: {
        render() {
            let code = this.codeNode.innerText
            // < &lt; | > &gt;
            code = code.replace(/</g, "&lt;").replace(/>/g, "&gt;")
            
            const beforeCode = this.getThisObj.CT
            const afterCode = code
            if (afterCode != beforeCode) {
                EventBus.emit("add-history", {
                    loc: this.location,
                    prop: "CT",
                    before: this.getThisObj.CT,
                    after: code,
                })
                this.getThisObj.CT = code
            }
        },
        select() {
            this.selectEvent()
            this.codeNode
                .classList
                .toggle("selected", this.selected)
        }
    },
    mounted() {
        this.codeNode = this.$el.querySelector("code")
        this.codeNode.contentEditable = true
        this.codeNode.addEventListener("keydown", this.codeInput)
        // 防止直接显示 html 实体
        this.$nextTick(() => {
            this.codeNode.innerHTML = this.code
            hljs.highlightElement(this.codeNode)
        })
    }
}
</script>

<style>
    pre {
        outline: none;
    }
    pre code.hljs {
        font-size: 18px;
        outline: none;
        border-radius: 8px;
        transition: box-shadow .4s, background-color .2s;
    }
    pre code.hljs.selected {
        box-shadow: var(--shadow-4);
    }
    pre code.hljs:focus {
        background-color: rgba(0, 0, 0, 0.09)
    }
</style>