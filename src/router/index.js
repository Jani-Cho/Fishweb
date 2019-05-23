import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Portfolio from '@/components/Portfolio'
import Guestbook from '@/components/Guestbook'
import Contact from '@/components/Contact'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      // name: 'Home',
      component: Home,

    },
    {
      path: '/home',
      name: 'Home',
      component: Home,

    },
    {
      path: '/portfolio/:id?',
      name: 'Portfolio',
      component: Portfolio
    },
    {
      path: '/guestbook',
      name: 'Guestbook',
      component: Guestbook
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },

  ]
})


