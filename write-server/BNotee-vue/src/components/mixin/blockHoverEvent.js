export default {
    data() {
        return {
            hover: false,
            setTimeout: null,
        }
    },
    methods: {
        // 鼠标进入 悬停
        onMouseEnter() {
            // 鼠标悬停 .4s 后
            this.setTimeout = setTimeout(() => {
                this.hover = true
            }, 400)
        },
        // 鼠标离开
        onMouseLeave() {
            // 重置鼠标悬停时间
            clearTimeout(this.setTimeout)
            if (!this.selected) {
                this.hover = false
            }
        }
    }
}