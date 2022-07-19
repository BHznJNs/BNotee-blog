<template>
    <div>
        <drawer
            :title="'笔记摘要'"
            :disabled="drawerDisabled"
            @close-drawer="drawerDisabled = true"
        >
            <anchors-view :list="anchorList"/>
        </drawer>
    </div>
</template>

<script>
import { h } from "vue"
import Drawer from "./drawer"
import EventBus from "../../common/EventBus"

export default {
    data() {
        return {
            drawerDisabled: true,
            anchorList: [],
            timeout: null
        }
    },
    components: {
        Drawer,
        AnchorsView: {
            props: ["list"],
            render() {
                let childrenList =
                    this.list.map((item) => {
                        return h(
                            "a", {
                                level: item.level,
                                href: "#" + item.href
                            }, item.content
                        )
                    })

                return h("div", childrenList)
            }
        }
    },
    inject: ["note"],
    methods: {
        // 方法：返回笔记内所有锚点元素
        getAnchors() {
            const anchors = document.querySelectorAll(".heading")
            let anchorList = []
            for (let a of anchors) {
                anchorList.push({
                    level: a.tagName,
                    href: a.id,
                    content: a.innerText
                })
            }

            return anchorList
        },
        close() {
            this.drawerDisabled = true
        }
    },
    mounted() {
        EventBus.on("open-anchors", () => {
            this.drawerDisabled = false
        })
        // 当标题元素被创建，获取标题元素
        EventBus.on("anchor-mounted", () => {
            // 节流
            if (this.timeout) {
                clearTimeout(this.timeout)
                this.timeout = null
            }
            this.timeout = setTimeout(() => {
                this.anchorList = this.getAnchors()
            })
        })
    }
}
</script>