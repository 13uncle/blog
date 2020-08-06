const nav = require("./utils/nav");
const sidebar = require("./utils/sidebar");
const moment = require("moment");

module.exports = {
  base: "/blog/",
  title: "十三叔叔",
  description: "生命在于记录",
  head: [["link", { rel: "icon", href: "/images/favicon.ico" }]],
  plugins: [
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp) => {
          moment.locale("zh-CN");
          return moment(timestamp).format("YYYY-MM-DD HH:mm:ss");
        },
      },
    ],
  ],
  themeConfig: {
    lastUpdated: "更新时间",
    logo: "/images/hero.png",
    sidebar,
    nav,
  },
};
