<template>
    <div
        class="dark-filter"
        :class="{ 'darken': isDarkMode }"
    ></div>
    <tool-bar :isTouchMode="isTouchMode"/>
    <uploader/>
    <control-balls
        :isDarkMode="isDarkMode"
        :isTouchMode="isTouchMode"
        :isFullscreen="isFullscreen"
        @toggle-darkMode="isDarkMode = !isDarkMode"
        @toggle-touchMode="isTouchMode = !isTouchMode"
        @toggle-fullscreen="isFullscreen = !isFullscreen"
    />
    <msgbar/>
    <note
        :isFullscreen="isFullscreen"
        :isTouchMode="isTouchMode"
    />

    <fixed-components/>

    <anchors/>

    <!-- <window @close="windowDisabled = true" :width="'800px'" :height="'480px'" :disabled="windowDisabled"><h1>This is a window</h1></window> -->
</template>

<script>
import { computed } from "vue"
import ToolBar from "./components/toolBar"
import Note from "./components/note"
import Anchors from "./components/drawers/anchors"
import ControlBalls from "./components/fixed/controlBalls"
import Uploader from "./components/uploader/uploader"
import FixedComponents from "./components/fixed/fixedComponents"
import Msgbar from "./components/fixed/msgbar"
import defaultContent from "./common/defaultContent"

export default {
    name: "App",
    components: {
        Anchors,
        Note, Uploader,
        ControlBalls,
        ToolBar, Msgbar,
        FixedComponents
    },
    data() {
        return {
            windowDisabled: false,
            note: defaultContent,
            selectedNode: {
                loc: null,
                obj: null,
                vnode: null,
                type: null,
            },
            isDarkMode: false,
            isTouchMode: false,
            isFullscreen: false
        }
    },
    provide() {
        return {
            note: this.note,
            selectedNode: this.selectedNode,
            isTouchMode: computed(() => {return this.isTouchMode})
        }
    },
    mounted() {
        this.$nextTick(() => {
            // 移动端 防止 软键盘弹起导致 vh 改变
            const initViewportHeight = () => {
                const meta = document.querySelector("#meta-viewport")
                let height
                if (window) {
                    height = window.outerHeight
                }
                const content = `width=device-width,height=${height},initial-scale=1.0`
                meta.setAttribute("content", content)
            }
            initViewportHeight()

            // 屏幕旋转检测
            addEventListener("orientationchange", () => {
                initViewportHeight()
            })
        })
    }
}
</script>

<style>
    #app {
        background-color: #F5F5F5;
        overflow: hidden;
    }

    .dark-filter {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0; 
        z-index: 10000;
        mix-blend-mode: difference;
        background-color: #e0e0e000;
        pointer-events: none;
        transition: background-color 1.2s;
    }
    .dark-filter.darken {
        background-color: #e0e0e0;
    }
</style>