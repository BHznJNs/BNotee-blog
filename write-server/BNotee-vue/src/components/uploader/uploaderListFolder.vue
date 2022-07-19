<template>
    <li class="folder-item">
        <div
            class="item"
            :class="{ selected }"
            @click="collapse"
        >
            <i
                class="item-avatar material-icons"
                @click.stop="select"
            >folder_open</i>
            <span class="item-name">{{ name }}</span>
        </div>

        <ul
            class="folder"
            v-show="!collapsed"
        >
            <template
                v-for="(item, index) in list"
                :key="item.id"
            >
                <!-- 文件夹 -->
                <uploader-list-folder
                    v-if="typeof item == 'object'"
                    :location="location.concat([index])"
                    :name="item[0]"
                    :list="item[1]"
                />

                <!-- 列表项 -->
                <uploader-list-file
                    v-else
                    :location="location.concat([index])"
                    :name="item"
                />
            </template>
        </ul>
    </li>
</template>

<script>
import selectEvent from "./selectEvent"
import UploaderListFile from "./uploaderListFile"

export default {
    name: "uploader-list-folder",
    components: { UploaderListFile },
    mixins: [selectEvent],
    props: ["location", "name", "list"],
    data() {
        return {
            type: "folder",
            collapsed: true,
        }
    },
    methods: {
        // 切换折叠
        collapse() {
            this.collapsed = !this.collapsed
        }
    }
}
</script>

<style scoped>
    .item {
        overflow: hidden;
    }
    /* Folder */
    .folder {
        margin: 0;
        padding: 0 0 0 24px !important;
        -webkit-transition: max-height .3s;
                transition: max-height .3s;
    }
    /* Folder End */
</style>