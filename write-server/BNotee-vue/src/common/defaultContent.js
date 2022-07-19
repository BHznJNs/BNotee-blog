/*
    NM --> Name
    HT --> History
    NT --> Node Type
    CT --> Content
    CTS --> Contents
    CL --> Color
    HF --> Href
    OL --> isOrdered
    SUM --> Summary
    LG --> Language
*/
export default {
// module.exports = {
    NM: "Example",
    HT: [],
    CTS: [
    
        {
            NT: "h",
            CT: "这是一个大标题",
            CL: "#333",
        },
        {
            NT: "hr",
        },
        {
            NT: "p",
            CT: "这是一个段落",
            CL: "#333",
        },
        {
            NT: "p",
            CT: "内联样式实例（均使用英文符号）：##粗体## ``代码`` __下划线__ //斜体// --删除-- ::淡化::",
            CL: "#333",
        },
        {
            NT: "floor",
            CTS: [
                {
                    NT: "h",
                    CT: "这是层次中的大标题",
                    CL: "#333",
                },
                {
                    NT: "p",
                    CT: "这是一个段落",
                    CL: "#333",
                },
                {
                    NT: "floor",
                    CTS: [
                        {
                            NT: "h",
                            CT: "这是层次中的大标题",
                            CL: "#333",
                        },
                        {
                            NT: "p",
                            CT: "这是一个段落",
                            CL: "#333",
                        }
                    ]
                }
            ]
        },
        {
            NT: "list",
            OL: true,
            CTS: [
                {
                    NT: "li",
                    CT: "这是一个列表项",
                    CL: "#333",
                },
                {
                    NT: "li",
                    CT: "这是一个列表项",
                    CL: "#333",
                },
                {
                    NT: "list",
                    OL: false,
                    CTS: [
                        {
                            NT: "li",
                            CT: "嵌套列表内的列表项",
                            CL: "#333",
                        },
                        {
                            NT: "li",
                            CT: "嵌套列表内的列表项",
                            CL: "#333",
                        }
                    ]
                },
            ]
        },
        {
            NT: "table",
            CTS: [
                ["表格项","表格项","表格项","表格项"],
                ["表格项","表格项","表格项","表格项"]
            ]
        },
        {
            NT: "details",
            SUM: "这是一个详情块",
            CTS: [
                {
                    CT: "这是一个段落",
                    CL: "#333",
                },
                {
                    CT: "这是一个段落",
                    CL: "#333",
                }
            ]
        },
        {
            NT: "code",
            LG: "javascript",
            CT: "console.log('Hello World')\nalert('Hello World')",
        }

    ]
}