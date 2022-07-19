<script>
export default {
    methods: {
        // 方法：判断 文件/文件夹 类型 并 获取 文件/文件夹 名称
        //      返回 类型 及 名称
        getFileData(location) {
            const item = this.noteList[location[0]]

            let type, name
            // 文件夹内文件
            if (location.length == 2) {
                type = "file"
                const folder = item[1]
                const folderName = item[0]
                const fileName = folder[location[1]]
                name = `${folderName}/${fileName}`
            } else { // 不在文件夹内
                if (typeof item == "string") {
                    // 文件
                    type = "file"
                    name = item
                } else if (typeof item == "object") {
                    // 文件夹
                    type = "folder"
                    name = item[0]
                }
            }
            return { type, name }
        }
    }
}
</script>