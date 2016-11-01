import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App'
import Store from './vuex/store'

import Dashboard from './view/Dashboard'
import Archives from './view/Archives'
import Tags from './view/Tags'
import About from './view/About'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/dashboard', component: Dashboard },
    { path: '/archives', component: Archives },
    { path: '/tags', component: Tags },
    { path: '/about', component: About },
    { path: '*', component: Dashboard }
  ]
})

new Vue({
  Store,
  router,
  ...App
}).$mount('#app')
