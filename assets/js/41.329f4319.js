(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{373:function(a,t,s){"use strict";s.r(t);var e=s(42),r=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"es6-简介"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#es6-简介"}},[a._v("#")]),a._v(" ES6 简介")]),a._v(" "),s("h2",{attrs:{id:"概述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[a._v("#")]),a._v(" 概述")]),a._v(" "),s("p",[a._v("ES6是于2015年6月正式发布的javascript语言标准。它的目标是使javascript可以用于编写大型应用程序，成为企业级开发语言。")]),a._v(" "),s("h2",{attrs:{id:"语法提案流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#语法提案流程"}},[a._v("#")]),a._v(" 语法提案流程")]),a._v(" "),s("p",[a._v("新语法到成为正式标准，要经历五个阶段：")]),a._v(" "),s("ul",[s("li",[a._v("Stage 0：Strawman (展示阶段)")]),a._v(" "),s("li",[a._v("Stage 1：Proposal(征求意见阶段)")]),a._v(" "),s("li",[a._v("Stage 2：Draft(草案阶段)")]),a._v(" "),s("li",[a._v("Stage 3：Candidate(候选阶段)")]),a._v(" "),s("li",[a._v("Stage 4：Finished(定案阶段)")])]),a._v(" "),s("p",[a._v("前四个阶段分别对应了后面所提到的babel preset中对应的值，使babel按照不同的转码规则，对ES6代码进行转译。")]),a._v(" "),s("h2",{attrs:{id:"babel"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#babel"}},[a._v("#")]),a._v(" Babel")]),a._v(" "),s("p",[a._v("Babel是一个ES6转码器，可以将ES6代码转为ES5代码，从而在浏览器和其他环境中可以执行。")]),a._v(" "),s("h3",{attrs:{id:"配置-babelrc"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置-babelrc"}},[a._v("#")]),a._v(" 配置.babelrc")]),a._v(" "),s("p",[a._v("Babel的配置文件是.babelrc，该文件存放于项目的根目录下。")]),a._v(" "),s("p",[a._v("该文件用来设置转码规则和插件，基本格式如下：")]),a._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"presets"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"plugins"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("p",[s("code",[a._v("presets")]),a._v("字段用于设定转码规则，可以根据需要安装官方给出的规则集：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("# 最新转码规则\nnpm i --save-dev babel-preset-latest\n\n# 不同阶段语法提案转码规则\nnpm i --save-dev babel-preset-stage-0\nnpm i --save-dev babel-preset-stage-1\nnpm i --save-dev babel-preset-stage-2\nnpm i --save-dev babel-preset-stage-3\n")])])]),s("p",[a._v("然后将规则应用到配置中：")]),a._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"presets"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"latest"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"stage-2"')]),a._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n\t"),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"plugins"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("h3",{attrs:{id:"babel-polyfill"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#babel-polyfill"}},[a._v("#")]),a._v(" babel-polyfill")]),a._v(" "),s("p",[a._v("babel默认只转换新的语法规则，而不转换新的API，如Iterator、Generator、Set、Map、Proxy、Promise、Reflect、Symbol等全局对象，还包括全局对象上的方法，如Object.assign。")]),a._v(" "),s("p",[a._v("而babel-polyfill正是用来解决这一问题的。在项目中安装babel-polyfill:")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("npm i --save-dev babel-polyfill\n")])])]),s("p",[a._v("然后在项目的脚本头部，添加babel-polyfill。"),s("strong",[a._v("注意:要把babel-polyfill放到所有引入脚本的最上方")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("import 'babel-polyfill'\nimport ···\n")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);