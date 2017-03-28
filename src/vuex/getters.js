// 取得数据
// 头像
export const getTouxiang = state => state.touxiang

// 左侧导航栏
export const getMenus = state => state.menus
export const getNavTop = state => state.NavTop
export const getNavLeft = state => state.NavLeft

// 列表展示
export const getPre = state => state.articlPres

// tags 标签集合
export const getTags = state => state.tags

// 鬼故事名字
export const getStoryName = state => state.story.name

// 从哪页跳转来的
export const getStoryPage = state => state.story.page

// 密钥
// 从哪页跳转来的
export const getKey = state => state.key
