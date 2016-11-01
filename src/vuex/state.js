const state = {
  touxiang: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg',
  menus: [
    {
      name: '/',
      text: '首页',
      icon: 'icon-index'
    },
    {
      name: '/archives',
      text: '归档',
      icon: 'icon-wodedangan'
    },
    {
      name: '/tags',
      text: '标签',
      icon: 'icon-tags'
    },
    {
      name: '/about',
      text: '关于',
      icon: 'icon-xiaolian'
    }
  ],
  articlPre: [
    {
      id: '1',
      title: '如何 hack Node.js 模块？',
      tag: 'Node.js',
      img: 'http://img.alicdn.com/tfs/TB1SJkrNVXXXXXsXVXXXXXXXXXX-900-500.jpg',
      time: '2016-10-27 16:55:11',
      pre: `为何要去 hack？在业务开发过程中，往往会依赖一些 Node.js 模块，hack 这些 Node.js 模块的主要目的是在不修改工具源码的情况下，篡改一些特定的功能。可能会是出于以下几种情况的考虑：
      总是存在一些特殊的本地需求，不一定能作为工具的通用需求来暴露正常的 API 给更多的用户。
      临时且紧急的需求，提 PR 已经来不及了。
      为什么不直接去改源码？考虑到工具会不定期升级，想使用工具`
    }
  ]
}

export default state
