<template>
    <window
        :width="'800px'"
        :height="'480px'"
        :disabled="disabled"
        @close="disabled = true"
    >
        <div class="uploader">
            <!-- Closer -->
            <div
                class="closer shadow-1"
                @click="disabled = true"
            >
                <i class="material-icons">close</i>
            </div>

            <!-- Note View -->
            <div class="note-view-outer">
                <div class="note-view">
                    <uploader-list :list="noteList"/>
                    <textfield-group
                        @return-node="creatFolder"
                        :isAdding="addingFolder"
                        ref="textfieldGroup"
                    />
                </div>
            </div>

            <!-- Input Group -->
            <div class="input-group">
                <input
                    class="inputter" type="text"
                    placeholder="笔记名" maxlength="20"
                    v-model="note.NM"
                >
                <input
                    class="inputter" type="password"
                    placeholder="密码" maxlength="10"
                    v-model="password"
                >
            </div>
            <!-- Buttons -->
            <div class="buttons shadow-3">
                <!-- 上传 -->
                <div
                    class="btn btn-shallow"
                    @click="upload"
                >
                    <i class="material-icons">cloud_upload</i>
                </div>
                <!-- 下载 -->
                <div
                    class="btn btn-shallow"
                    @click="download"
                >
                    <i class="material-icons">file_download</i>
                </div>
                <!-- 创建文件夹 -->
                <div
                    class="btn btn-shallow"
                    @click="toCreatFolder"
                >
                    <i class="material-icons">create_new_folder</i>
                </div>
                <!-- 删除 -->
                <div
                    class="btn btn-shallow"
                    @click="deleteFile"
                >
                    <i class="material-icons">delete_forever</i>
                </div>
            </div>

        </div>
    </window>
</template>

<script>
import EventBus from "../../common/EventBus"
import axios from "axios"

import Window from "../window/window"
import UploaderList from "./uploaderList"
import TextfieldGroup from "../textfieldGroup"
import getTargetName from "./getTargetName.js"
import request from "./request.js"

export default {
    components: { Window, UploaderList, TextfieldGroup },
    mixins: [request, getTargetName],
    inject: ["note"],
    data() {
        return {
            disabled: true,
            selected: {
                loc: [],
                type: "", // file or folder
                obj: null, // 上一个被选取的节点
            },
            addingFolder: false,
            password: "",
            noteList: [],
        }
    },
    provide() {
        return {
            selectedItem: this.selected
        }
    },
    methods: {
        // 方法：打开文件夹输入框
        toCreatFolder() {
            this.addingFolder = true
            this.$nextTick(() => {
                this.$refs.textfieldGroup.focus()
            })
        },
        show() {
            this.getTargetName()
        }
    },
    mounted() {
        EventBus.on("open-uploader", () => {
            this.disabled = false

            // 若笔记列表为空
            if (!this.noteList.length) {
                const timestamp = new Date().getTime()
                // 获取笔记列表
                axios         // 加上时间戳，防止缓存
                .get(`/note-list?timestamp=${timestamp}`)
                .then((res) => {
                    this.noteList = res.data.noteList
                })
                .catch(() => {
                    EventBus.emit("show-msg", "笔记列表获取错误。")
                })
            }
        })
    }
}
</script>

<style scoped>
    /* 横屏 */
    @media screen and (orientation: landscape) {
        .uploader {
            grid-template-rows: 36px auto 44px;
            grid-template-columns: auto 64px;
        }
        .buttons {
            display: flex;
            flex-direction: column;
            grid-row: 1 / 4;
            justify-content: space-around;
        }
    }
    /* 竖屏 */
    @media screen and (orientation: portrait) {
        .uploader {
            grid-template-rows: 36px auto 44px 128px;
        }
        .buttons {
            display: grid;
            grid-template-rows: 1fr 1fr;
            grid-template-columns: 1fr 1fr;
            justify-items: center;
            align-items: center;
        }
        .btn {
            width: 148px;
            max-width: 85%;
        }
    }
    
    .uploader {
        display: grid;
        grid-auto-flow: column;
        height: 100%;
    }

    /* Note View */
    .note-view-outer {
        position: relative;
        margin: 6px 0 0;
        border-top: 1px solid #C3C3C3;
        border-bottom: 1px solid #C3C3C3;
        overflow: auto;
    }
    /* Note View End */

    /* Closer */
    .closer {
        width: 4rem;
        border-radius: 0 0 8px 0;
    }
    .closer i:hover  {
        background-color: #EEE !important;
    }
    /* Closer End */

    /* Buttons */
    .buttons {
        padding: 0 8px;
    }
    /* Buttons End */

    /* Inputter */
    .input-group {
        display: grid;
        grid-template-columns: 1.2fr .8fr;
        max-width: 95%;
    }
    @media screen and (max-width: 800px) {
        .input-group {
            min-width: 85%;
        }
    }
    .inputter {
        width: auto !important;
    }
    .inputter:first-child {
        border-right: 1px solid #888;
    }
    /* Inputter End */
</style>