<template>
    <transition name="slide">
    <div class="colors fixed-component" v-show="!disabled">
        <template v-for="(item) in colors" :key="item.id">
            <div
                class="color btn btn-shallow"
                :style="{ 'background-color': item }"
                @click="setColor(item)"
            ></div>
        </template>
        <div class="input-group">
            <div
                class="hint"
                @click="$refs.colorInputter.click()"
            >#</div>
            <input
                type="color"
                ref="colorInputter"
                v-show="false"
                v-model="colorValue"
            >
            <input
                class="inputter" placeholder="******"
                type="text" maxlength="8"
                v-model="colorValue"
            >
        </div>
        <div
            class="closer"
            @click="$emit('close', 'colors')"
        >
            <i class="material-icons">close</i>
        </div>
    </div>
    </transition>
</template>

<script>
import EventBus from '../../common/EventBus'
import getNodeObj from "../mixin/getNodeObj"

export default {
    data() {
        return {
            colors: [
                "#D50000",
                "#FFD600",
                "#333"
            ],
            colorValue: "",
            timeout: null,
        }
    },
    props: ["disabled"],
    inject: ["selectedNode"],
    mixins: [getNodeObj],
    methods: {
        setColor(color) {
            const loc = this.selectedNode.loc
            const nodeObj = this.selectedNode.obj
            const initialColor = nodeObj.CL
            nodeObj.CL = color

            EventBus.emit("add-history", {
                loc,
                prop: "CL",
                before: initialColor,
                after: color
            })
        }
    },
    watch: {
        colorValue(newValue) {
            // 节流
            clearTimeout(this.timeout)
            this.colorValue = newValue.replace("#", "")

            this.timeout = setTimeout(() => {
                this.setColor("#" + this.colorValue)
            }, 300)
        }
    }
}
</script>

<style scoped>
    .colors {
        display: flex;
        align-items: center;
        width: calc(100vw - 108px);
        max-width: 480px;
    }
    .color {
        margin: auto;
    }
    .color:hover {
        filter: contrast(.6);
    }

    .inputter {
        width: 5.5em !important;
    }

    @media screen and (min-width: 1024px) {
        .colors {
            width: 60vw;
        }
        .inputter {
            width: 6em !important;
        }
    }
</style>