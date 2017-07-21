const state = {
  touxiang: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg',
  key: '9019a61af1584616b14262b9d5f5c1ff',
  menus: [
    // {
    //   name: 'article',
    //   text: '文章',
    //   icon: 'icon-index'
    // },
    {
      name: '/chat',
      text: '来和我聊聊',
      icon: 'icon-jiqiren'
    },
    {
      name: '/story',
      text: '鬼故事',
      icon: 'icon-gushi'
    },
    {
      name: '/music',
      text: '听听歌',
      icon: 'icon-music'
    },
    {
      name: '/news',
      text: '看看报',
      icon: 'icon-news'
    },
    {
      name: '/movies',
      text: '电影排行',
      icon: 'icon-movie'
    },
    {
      name: '/video',
      text: '来点视频',
      icon: 'icon-shipin'
    },
    {
      name: '/photo',
      text: '风景',
      icon: 'icon-photo'
    },
    // {
    //   name: '/biao',
    //   text: '表情包',
    //   icon: 'icon-biaoqing'
    // },
    {
      name: '/friends',
      text: '朋友们',
      icon: 'icon-wodedangan'
    },
    // {
    //   name: '/tags',
    //   text: '标签',
    //   icon: 'icon-tags'
    // }
    // {
    //   name: '/archives',
    //   text: '归档',
    //   icon: 'icon-wodedangan'
    // },
    {
      name: '/about',
      text: '关于我',
      icon: 'icon-xiaolian'
    }
  ],
  NavTop: 0,
  NavLeft: 0,
  articlPres: [
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
    },
    {
      id: '2',
      title: 'Velocity NYC 2016 参会总结？',
      tag: 'Web开发',
      img: 'http://img.alicdn.com/tfs/TB1H9LFNFXXXXb_aXXXXXXXXXXX-900-500.jpg',
      time: '2016-10-26 15:55:11',
      pre: `就在刚刚过去的九月，作为 FED 团队的代表有幸参加了美国纽约的 Velocity Web 性能和敏捷运维大会。在大约一周的行程中，会议团队组织了十分丰富的行程，会议团队也在内部对于 Velocity 的演讲内容做了多次讨论。整个行程在我看来是十分圆满的。
      Velocity @ NYCVelocity 作为 O’Reilly 旗下的老牌会议品牌，从 2008 年开始专著 Web 性能、DevOp`
    },
    {
      id: '3',
      title: 'test3？',
      tag: 'Web开发',
      img: 'http://img.alicdn.com/tfs/TB1H9LFNFXXXXb_aXXXXXXXXXXX-900-500.jpg',
      time: '2016-10-26 15:55:11',
      pre: `就在刚刚过去的九月，作为 FED 团队的代表有幸参加了美国纽约的 Velocity Web 性能和敏捷运维大会。在大约一周的行程中，会议团队组织了十分丰富的行程，会议团队也在内部对于 Velocity 的演讲内容做了多次讨论。整个行程在我看来是十分圆满的。
      Velocity @ NYCVelocity 作为 O’Reilly 旗下的老牌会议品牌，从 2008 年开始专著 Web 性能、DevOp`
    }
  ],
  tags: [
    {
      name: 'Node.js'
    },
    {
      name: 'Javascript'
    },
    {
      name: 'Python'
    },
    {
      name: 'Html & Css'
    },
    {
      name: '随心而动'
    }
  ],
  story: {
    name: '未知名字',
    page: 1
  }
}

export default state
