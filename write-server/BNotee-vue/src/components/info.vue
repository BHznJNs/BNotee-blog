<template>
    <window
        :width="'800px'"
        :height="'480px'"
        :disabled="disabled"
        @close="close"
    >
        <div class="info-outer">
            <!-- Closer -->
            <div
                class="closer shadow-1"
                @click="close"
            >
                <i class="material-icons">close</i>
            </div>

            <div class="info">
                <h1>关于 | About</h1>
                <hr>
                <h2>此 | This</h2>
                <p>
                    一个运行在浏览器上的笔记程序。| A notebook application works on your Browser.
                </p>
                <hr>
                <h2>作者 | Author</h2>
                <p>
                    GitHub: <a href="https://github.com/BHznJNs" target="_blank">https://github.com/BHznJNs</a><br>
                    BiliBili: <a href="https://space.bilibili.com/274945998" target="_blank">https://space.bilibili.com/274945998</a><br>
                </p>
                <hr>
                <h2>框架 | Framework</h2>
                <p>
                    Vue.js <a href="https://v3.cn.vuejs.org/" target="_blank">https://v3.cn.vuejs.org/</a><br>
                    MDUI <a href="https://www.mdui.org/" target="_blank">https://www.mdui.org/</a>
                </p>
            </div>
        </div>
    </window>
</template>

<script>
import Window from "./window/window.vue";

export default {
    components: { Window },
    props: ["disabled"],
    methods: {
        close() {
            this.$parent.isInfoWindowShow = false
        }
    }
}
</script>

<style scoped>
    .info-outer {
        display: grid;
        grid-template-rows: 36px auto;
        height: 100%;
    }
    .info {
        margin-top: 6px;
        padding: 8px 16px;
        border-top: solid 1px #C3C3C3;
        overflow-x: hidden;
    }

    .info a {
        display: inline;
    }
    .info p {
        line-height: 1.25;
    }

    /* Closer */
    .closer {
        width: 4rem;
        margin-left: auto;
        border-radius: 0 0 0 8px;
    }
    .closer i:hover  {
        background-color: #EEE !important;
    }
    /* Closer End */
</style>