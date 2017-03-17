import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App'
import Store from './vuex/store'
import VueResource from 'vue-resource'

// import Self from './view/Self'
import Dashboard from './view/Dashboard'
import Archives from './view/Archives'
import Tags from './view/Tags'
import About from './view/About'
import Detail from './view/Detail'
import TagDetail from './view/TagDetail'
import Photo from './view/Photo'
import Story from './view/Story'
import Sdetail from './view/Sdetail'
import Music from './view/Music'
import Video from './view/Video'
import News from './view/News'
import Movies from './view/Movies'
import Friends from './view/Friends'
import NotFound from './view/404'
import Biao from './view/Biao'
import Chat from './view/Chat'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  // mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: About },
    { path: '/dashboard', component: Dashboard },
    { path: '/archives', component: Archives },
    { path: '/tags', component: Tags },
    { path: '/tags/:name', component: TagDetail },
    { path: '/about', component: About },
    { path: '/detail', component: Detail },
    { path: '/photo', component: Photo },
    { path: '/story', component: Story },
    { path: '/story?:page', component: Story },
    { path: '/story/:detail', component: Sdetail },
    { path: '/music', component: Music },
    { path: '/video', component: Video },
    { path: '/news', component: News },
    { path: '/movies', component: Movies },
    { path: '/friends', component: Friends },
    { path: '/biao', component: Biao },
    { path: '/chat', component: Chat },
    { path: '*', component: NotFound }
  ]
})

new Vue({
  Store,
  router,
  ...App
}).$mount('#app')
