<template>
    <div class="window-container" :class="{ disabled }">
        <div
            class="fullscreen-mask"
            @click="close"
        ></div>
        <div class="window-outer">
            <div
                class="window shadow-16"
                :style="{ width, height }"
            >
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["width", "height", "disabled"],
    methods: {
        close() {
            this.$emit("close")
        }
    }
}
</script>

<style scoped>
.window-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transition: opacity .6s;
    z-index: 1001;
}
.window-container.disabled {
    pointer-events: none;
    opacity: 0;
}
.window-outer {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
}
.window {
    max-width: 85vw;
    max-height: 85vh;
    background-color: #fff;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    -webkit-border-radius: 8px;
            border-radius: 8px;
    overflow: hidden;
    z-index: 1;
}
</style>