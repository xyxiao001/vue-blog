import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App'
import Store from './vuex/store'
import VueResource from 'vue-resource'

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

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  // mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/dashboard', component: Dashboard },
    { path: '/archives', component: Archives },
    { path: '/tags', component: Tags },
    { path: '/about', component: About },
    { path: '/detail', component: Detail },
    { path: '/tags/:name', component: TagDetail },
    { path: '/photo', component: Photo },
    { path: '/story', component: Story },
    { path: '/story?:page', component: Story },
    { path: '/story/:detail', component: Sdetail },
    { path: '/music', component: Music },
    { path: '*', component: Dashboard }
  ]
})

new Vue({
  Store,
  router,
  ...App
}).$mount('#app')
