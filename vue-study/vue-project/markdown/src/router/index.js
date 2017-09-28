import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index'
import Markdown from '../views/markdown'
import NotFound from '../views/404'
import myTable from '../views/table'

Vue.use(Router)

export default new Router({
  routes: [ 
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/markdown',
      name: 'markdown',
      component:Markdown
    },
    {
      path: '/mytable',
      name: 'myTable',
      component:myTable
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    },
  ]
})
