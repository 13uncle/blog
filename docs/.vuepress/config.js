const nav = require('./utils/nav')
const sidebar = require('./utils/sidebar')

module.exports = {
  title: "十三叔叔",
  description: "生命在于记录",
  head: [
    ['link', {rel: 'icon', href: '/images/favicon.ico'}]
  ],
  themeConfig: {
    logo: "/images/hero.png",
    sidebar,
    nav
  },
};
