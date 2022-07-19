<template>
    <transition name="slide">
        <div
            class="msgbar-outer"
            v-show="active"
        >
            <div
                class="msgbar"
                :class="{ active }"
                @click="close"
            >{{ msg }}</div>
        </div>
    </transition>
</template>

<script>
import EventBus from "../../common/EventBus"
export default {
    data() {
        return {
            active: false,
            msg: ""
        }
    },
    methods: {
        close() {
            this.active = false
        }
    },
    mounted() {
        EventBus.on("show-msg", (msg) => {
            this.msg = msg
            this.active = true
        })
    },
    watch: {
        active(newVal) {
            // 3秒后关闭
            if (newVal) {
                setTimeout(() => {
                    this.close()
                }, 3000)
            }
        }
    }
}
</script>

<style>
    .msgbar-outer {
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        pointer-events: none;
        -webkit-transition: bottom .3s ease-out;
                transition: bottom .3s ease-out;
    }
    .msgbar {
        height: 36px;
        padding: 0 18px 0 18px;
        border-radius: 6px 6px 0 0;
        color: #fff;
        background-color: #323232;
        font-size: 16px;
        line-height: 36px;
        user-select: none;
        pointer-events: auto;
        z-index: 1001;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    }
    /* Transition */
    .slide-enter-from,
    .slide-leave-to {
        bottom: -36px;
    }
</style>