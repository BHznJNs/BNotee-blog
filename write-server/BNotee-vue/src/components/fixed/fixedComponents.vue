<template>
   <div>
        <textfield-group-fixed
            @close="close"
            :disabled="textfieldGroupDisabled"
        />
        <colors
            @close="close"
            :disabled="colorsDisabled"
        />
        <table-setter
            @close="close"
            :disabled="tableSetterDisabled"
        />
        <history :disabled="historyDisabled"/>
   </div>
</template>

<script>
import TextfieldGroupFixed from "./textfieldGroupFixed"
import Colors from "./colors"
import TableSetter from "./tableSetter"
import History from "../drawers/history"
import EventBus from "../../common/EventBus"

export default {
    data() {
        return {
            textfieldGroupDisabled: true,
            colorsDisabled: true,
            tableSetterDisabled: true,
            historyDisabled: false
        }
    },
    components: {
        TextfieldGroupFixed,
        Colors, TableSetter, History
    },
    methods: {
        open(component) {
            this.closeAll()
            this[component + "Disabled"] = false
        },
        close(component) {
            this[component + "Disabled"] = true
            this.historyDisabled = false
        },
        closeAll() {
            this.colorsDisabled = true
            this.textfieldGroupDisabled = true
            this.tableSetterDisabled = true
            this.historyDisabled = true
        }
    },
    mounted() {
        EventBus.on("fixedComponents-open", this.open)
        // textfield
        EventBus.on("textfield-open", () => {this.open("textfieldGroup")})

        EventBus.on("fixedComponents-close", () => {
            this.closeAll()
            this.historyDisabled = false
        })
    }
}
</script>

<style scoped>
    /* Transition */
    .slide-enter-from,
    .slide-leave-to {
        transform: translateY(54px);
    }
</style>