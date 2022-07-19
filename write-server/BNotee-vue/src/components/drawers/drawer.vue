<template>
    <div
        class="fullscreen-mask"
        :class="{ disabled }"
        @click="close"
    ></div>

    <div class="drawer" :class="{ disabled }">
        <div class="titlebar shadow-4">
            <div class="closer circle">
                <i
                    class="material-icons arrow-forward"
                    @click="close"
                >arrow_forward</i>
                <i
                    class="material-icons arrow-upward"
                    @click="close"
                >arrow_upward</i>
            </div>
            <h1>{{ title }}</h1>
        </div>

        <div class="drawer-view">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ["title", "disabled"],
    emits: ["close-drawer"],
    methods: {
        close() {
            this.$emit("close-drawer")
        }
    }
}
</script>

<style>
    .drawer {
        position: fixed;
        top: 0;
        z-index: 9999;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        -webkit-box-shadow: var(--shadow-16);
                box-shadow: var(--shadow-16);
        background-color: white;
        contain: layout paint;
        -webkit-overflow-scrolling: touch;
        -webkit-transition: transform .9s .3s;
                transition: transform .9s .3s;
    }
    .drawer-view {
        position: absolute;
        top: 60px;
        bottom: 0;
        width: 100%;
        padding: 16px 0;
        overflow: auto;
    }

    /* Title Bar */
    .titlebar {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 8px;
        margin-bottom: 16px;
        background-color: #333;
        color: white;
        z-index: 1;
    }
    .titlebar h1 {
        margin: 0;
        padding-left: 6px;
        border: solid white 3px;
        border-right: none;
        cursor: default;
        user-select: none;
    }
    /* Title Bar End */

    /* 横屏 */
    @media screen and (orientation: landscape) {
        .drawer {
            right: 0;
            width: 320px;
            height: 100vh;
            transform: translateX(0);
        }
        .drawer.disabled {
            transform: translateX(340px);
        }
        .drawer .arrow-upward {
            display: none;
        }
        @media screen and (min-width: 960px) {
            .drawer {
                width: 480px;
            }
            .drawer.disabled {
                transform: translateX(500px);
            }
            .drawer-view {
                top: 78px;
            }

            .closer.circle i {
                width: 48px !important;
                height: 48px !important;
            }
        }
    }
    /* 竖屏 */
    @media screen and (orientation: portrait) {
        .drawer {
            width: 100vw;
            height: 360px;
            transform: translateY(0)
        }
        .drawer.disabled {
            transform: translateY(-380px);
        }
        .drawer .arrow-forward {
            display: none;
        }
        @media screen and (min-height: 1024px) {
            .drawer {
                height: 480px;
            }
            .drawer.disabled {
                transform: translateX(500px);
            }
        }
    }
</style>