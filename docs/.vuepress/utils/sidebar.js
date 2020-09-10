module.exports = {
  "/reading/": [
    {
      title: "javascript高级程序设计", // 必要的,分组名称
      path: "/reading/professionaljs/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: [
        "/reading/professionaljs/notes/pjs_20200806_1.md",
        "/reading/professionaljs/notes/pjs_20200806_2.md",
        "/reading/professionaljs/notes/pjs_20200806_3.md",
        "/reading/professionaljs/notes/pjs_20200806_4.md",
        "/reading/professionaljs/notes/pjs_20200806_5.md",
      ], // 每写一个md在这里添加
    },
    {
      title: "ES6标准入门",
      path: "/reading/ecmascript6/",
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "/reading/ecmascript6/notes/es_20200806_1.md",
        "/reading/ecmascript6/notes/es_20200806_2.md",
        "/reading/ecmascript6/notes/es_20200831.md",
      ],
    },
  ],
  "/programtech/": [
    {
      title: "数据结构和算法", // 必要的,分组名称
      path: "/programtech/ds&al/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: [
        "/programtech/ds&al/notes/letcode.md",
      ], // 每写一个md在这里添加
    },
    {
      title: "计算机网络",
      path: "/programtech/http/",
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "/",
      ],
    },
    {
      title: "剑指Offer",
      path: "/programtech/jianzhioffer/",
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "/programtech/jianzhioffer/notes/cha-zhao.md",
        "/programtech/jianzhioffer/notes/sort.md",
        "/programtech/jianzhioffer/notes/shu-xue.md",
        "/programtech/jianzhioffer/notes/wei-yun-suan.md",
        "/programtech/jianzhioffer/notes/qiong-ju.md",
        "/programtech/jianzhioffer/notes/di-gui.md",
        "/programtech/jianzhioffer/notes/er-fen-fa.md",
        "/programtech/jianzhioffer/notes/shuang-zhi-zhen.md",
        "/programtech/jianzhioffer/notes/tree.md",
        "/programtech/jianzhioffer/notes/bfs.md",
      ],
    },
  ],
  "/base/": [
    {
      title: "javascript",
      path: "/base/js/",
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "/base/js/notes/base-complete.md",
      ],
    },
    {
      title: "CSS",
      path: "/base/css/",
      collapsable: false,
      sidebarDepth: 2,
      children: ["/"],
    },
    {
      title: "HTML",
      path: "/base/html/",
      collapsable: false,
      sidebarDepth: 2,
      children: ["/"],
    },
  ],
};
