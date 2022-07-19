<template>
    <div
        class="note-outer shadow-4"
        :class="{ 'fullscreen': isFullscreen }"
    >
        <div class="note" ref="note" @contextmenu.prevent="">
            <template
                v-for="(item, index) in note.CTS"
                :key="item.id"
            >
                <floor-block
                    v-if="item.NT == 'floor'"
                    :children="item.CTS"
                    :level="2"
                    :location="[index]"
                />
                <node-renderer
                    v-else :level="1"
                    :nodeObj="item"
                    :location="[index]"
                />
            </template>

            <textfield-group
                id="note-textfield-group"
                ref="textfield"
                :isAdding="isNodeAdding"
                @return-node="closeNodeAdder"
            />
            <!-- 新增节点 按键 -->
            <div
                class="btn-fab adder-btn"
                :class="{
                    'disabled': isNodeAdding,
                    'fullscreen': isFullscreen,
                }"
                @click="openNodeAdder"
            >
                <i class="material-icons">add</i>
            </div>
        </div>
    </div>
</template>

<script>
import compiler from "../common/compiler"
import EventBus from "../common/EventBus"
import FloorBlock from "./note/floorBlock"
import NodeRenderer from "./note/nodeRenderer"
import TextfieldGroup from "./textfieldGroup"

export default {
    components: {
        FloorBlock, NodeRenderer,
        TextfieldGroup
    },
    data() {
        return {
            isNodeAdding: false,
        }
    },
    props: ["isFullscreen"],
    inject: ["note"],
    created() {
        // 设置按键事件监听
        addEventListener("keydown", (e) => {
            const altKey = e.altKey
            const keyName = e.key
            // 按下 alt + a 时触发
            if (altKey && keyName == "a") {
                e.preventDefault()
                this.openNodeAdder()
            }
        })
    },
    mounted() {
        this.$nextTick(() => {
            compiler.init()
        })
        EventBus.on("note-loaded", () => {
            this.$nextTick(() => {
                compiler.init()
            })
        })
    },
    methods: {
        // 方法：打开插入文本框
        openNodeAdder() {
            location.href = "#note-textfield-group"
            this.isNodeAdding = true
            this.$nextTick(() => {
                this.$refs.textfield.focus()
            })
        },
        // 方法：关闭插入文本框
        closeNodeAdder(obj) {
            this.isNodeAdding = false
            const noteCTS = this.note.CTS
            if (obj) {
                noteCTS.push(obj)
            }

            // 添加历史对象
            const loc = [noteCTS.length - 1]
            EventBus.emit("add-history", {
                loc,
                prop: "IST"
            })
        }
    },
    watch: {
        // 监听：当切换全屏状态时，隐藏 note
        isFullscreen(newVal, oldVal) {
            if (newVal != oldVal) {
                this.$refs.note.style.display = "none"
                setTimeout(() => {
                    this.$refs.note.style.display = "block"
                }, 1200)
            }
        }
    }
}
</script>

<style scoped>
    .note-outer {
        position: absolute;
        right: 0;
        display: inline-block;
        width: calc(100vw - 108px);
        height: calc(100vh - 128px);
        margin-top: 56px;
        border-radius: 15px 0 0 15px;
        -webkit-border-radius: 15px 0 0 15px;
        background-color: white;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        transition: height .6s, width 1s, margin-top 1s,
                    border-radius .3s 1s, -webkit-border-radius .3s 1s;
        overflow: hidden;
        contain: content;
    }

    .note-outer.fullscreen {
        width: 100vw;
        height: 100vh;
        margin-top: 0;
        border-radius: 0;
        -webkit-border-radius: 0;
    }
    @media screen and (max-height: 500px) {
        .note-outer {
            margin-top: 48px;
        }
        @media screen and (max-height: 450px) {
            .note-outer {
                height: 72vh;
            }
        }
    }

    .note {
        position: relative;
        height: 100%;
        padding: 20px 0 20px 24px;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        overflow: auto;
        /* Firefox */
        scrollbar-width: thin !important;
        scrollbar-color: #666;
    }
    
    .fullscreen .note {
        padding-top: 64px;
    }

    /* ------ */

    .adder-btn {
        color: white !important;
        background-color: #546E7A;
    }
    .adder-btn.fullscreen {
        margin-bottom: 60px;
    }
    .adder-btn.disabled {
        opacity: 0;
        pointer-events: none;
    }
</style>