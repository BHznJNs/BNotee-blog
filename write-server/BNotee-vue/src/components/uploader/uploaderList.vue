<template>
    <div v-show="!list.length">
        <div class="no-note">暂无笔记</div>
    </div>

    <ul class="note-list" ref="noteList">
        <template
            v-for="(item, index) in list"
            :key="item.id"
        >
            <!-- 文件夹 -->
            <uploader-list-folder
                v-if="typeof item == 'object'"
                :location="[index]"
                :name="item[0]"
                :list="item[1]"
            />

            <!-- 列表项 -->
            <uploader-list-file
                v-else
                :location="[index]"
                :name="item"
            />
        </template>

        <slot></slot>
    </ul>
</template>
<script>
import UploaderListFolder from "./uploaderListFolder"
import UploaderListFile from "./uploaderListFile"

export default {
    props: ["list"],
    emits: ["file-select"],
    components: {
        UploaderListFolder,
        UploaderListFile,
    }
}
</script>
<style scoped>
    /* No Note */
    .no-note {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 24px;
        color: #666;
    }
    /* No Note End */

    /* Note List */
    .note-list, .note-list :deep(.folder) {
        margin-bottom: 4px;
        padding: 0 0 8px;
        list-style: none;
        background-color: transparent;
        overflow: hidden;
    }
    /* Note List End */

    /* File Item */
    .note-list :deep(.item) {
        display: flex;
        align-items: center;
        padding: 0 16px;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        text-decoration: none;
        cursor: pointer;
        user-select: none;
        -webkit-transition: background-color 0.3s;
                transition: background-color 0.3s;
    }
    .note-list :deep(.item:hover) {
        background-color: #EEE;
    }
    .note-list :deep(.item-avatar) {
        display: inline-block;
        width: 36px;
        height: 36px;
        margin: 4px 8px 4px 0;
        color: #FFFFFF;
        line-height: 36px;
        text-align: center;
        background-color: #BDBDBD;
        border-radius: 50%;
    }
    .note-list :deep(.item-name) {
        padding: 4px 0;
        border-bottom: 1px solid #E0E0E0;
        vertical-align: text-bottom;
        font-family: sans-serif;
    }

    .note-list :deep(.item.selected) {
        background-color: #dddddd !important;
        border: none;
        -webkit-box-shadow: none;
                box-shadow: none;
    }
    /* File Item End */
</style>