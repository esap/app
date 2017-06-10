import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

const  routes= [
  { path: '/home', component:Home },
  { path: '/', redirect: '/home' },
  { path: '/ddjd', component:require('@/components/ddjd') },
  { path: '/jcmx', component:require('@/components/jcmx') },
  { path: '/xjdd', component:require('@/components/xjdd') },
  { path: '/eskc', component:require('@/components/eskc') },
  { path: '/dbsy', component:require('@/components/dbsy') },

  { path: '/wxfkl', component:require('@/components/wxfk/wxfkL') },
  { path: '/wxfkr/:id', component:require('@/components/wxfk/wxfkR') },
  { path: '/wxfkc', component:require('@/components/wxfk/wxfkC') },

  { path: '/cgddl', component:require('@/components/cgdd/cgddL') },
  { path: '/cgddr/:id', component:require('@/components/cgdd/cgddR') },
  { path: '/cgddc', component:require('@/components/cgdd/cgddC') },

  { path: '/me', component:require('@/components/me') },
  { path: '*', redirect: '/home' }
  ]

export default new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

