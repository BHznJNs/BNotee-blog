<template>
    <div class="controlballs" :class="{ 'fullscreen': isFullscreen }">
        <div class="block">
            <div class="mask"></div>
            <i class="material-icons">apps</i>
        </div>
        <!-- 打开笔记概要 -->
        <div
            class="ball btn" 
            @click="openAnchors"
        >
            <i class="material-icons">subtitles</i>
        </div>
        <!-- 黑暗模式切换 -->
        <div
            class="ball btn" 
            @click="$emit('toggle-darkMode')"
        >
            <i class="material-icons" v-show="!isDarkMode">brightness_2</i>
            <i class="material-icons" v-show="isDarkMode">wb_sunny</i>
        </div>
        <!-- 触屏模式切换 -->
        <div class="ball btn"
            @click="$emit('toggle-touchMode')"
            :class="{ 'black': isTouchMode }"
        >
            <i class="material-icons">touch_app</i>
        </div>
        <!-- 全屏切换 -->
        <div
            class="ball btn"
            @click="$emit('toggle-fullscreen')"
        >
            <i class="material-icons" v-show="!isFullscreen">fullscreen</i>
            <i class="material-icons" v-show="isFullscreen">fullscreen_exit</i>
        </div>
    </div>
</template>
<script>
import EventBus from "../../common/EventBus"

export default {
    props: [
        "isDarkMode",
        "isTouchMode",
        "isFullscreen"
    ],
    emits: [
        "toggle-darkMode",
        "toggle-touchMode",
        "toggle-fullscreen"
    ],
    methods: {
        openAnchors() {
            EventBus.emit("open-anchors")
        }
    }
}
</script>
<style scoped>
    .controlballs {
        position: absolute;
        right: 0;
        display: inline-block;
        height: 56px;
        -webkit-border-radius: 0 0 0 .4rem;
                border-radius: 0 0 0 .4rem;
    }
    .controlballs.fullscreen {
        background-color: #f5f5f5;
        z-index: 999;
        -webkit-box-shadow: var(--shadow-1);
                box-shadow: var(--shadow-1);
    }
    
    .block {
        width: 72px;
        height: 100%;
        float: right;
        background-color: #333;
    }
    .block .mask {
        display: inline-block;
        width: 16px;
        height: 100%;
        margin-left: -1px;
        background-color: #F5F5F5;
        border-radius: 0 50% 50% 0;
    }
    .block i {
        width: 56px;
        height: 100%;
        float: right;
        color: white;
        font-size: 48px;
        text-align: center;
        line-height: 56px;
    }

    /* Balls */
    .ball {
        float: right;
        width: 48px;
        height: 48px;
        margin-top: 4px;
        margin-left: 12px;
        border-radius: 50%;
        background-color: white;
        -webkit-box-shadow: var(--shadow-1);
                box-shadow: var(--shadow-1);
        transition: background-color .2s,
                    box-shadow .4s, -webkit-box-shadow .4s;
    }
    .ball.black {
        color: white !important;
        background-color: #333 !important;
    }
    .ball:hover {
        background-color: #fafafa;
        -webkit-box-shadow: var(--shadow-3);
                box-shadow: var(--shadow-3);
    }
    .ball:active {
        background-color: #EEEEEE;
    }
    .ball i {
        display: block;
        height: 100%;
        color: #616161;
        text-align: center;
        font-size: 36px;
        line-height: 48px;
    }

    @media screen and (max-height: 500px) {
        .controlballs {
            height: 48px;
        }
        .block {
            width: 64px;
        }
        .block i {
            width: 48px;
            height: 100%;
            float: right;
            color: white;
            font-size: 36px;
            line-height: 48px;
        }

        .ball {
            width: 40px;
            height: 40px;
        }
        .ball i {
            font-size: 32px;
            line-height: 40px;
        }
    }
</style>