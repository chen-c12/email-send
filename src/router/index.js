import Vue from 'vue'
import VueRouter from 'vue-router'

import loginandaddemail from '../views/loginandaddemail.vue'
import databaselist from '../views/databaselist.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/loginandaddemail'
  },
  // 登录和添加邮箱
  {
    path: '/loginandaddemail',
    component: loginandaddemail,
    name: 'loginandaddemail'
  },

  {
    path:'/databaselist',
    component:databaselist,
    name:'databaselist',
  },
  // 404
  // {
  //   path: '/Project404',
  //   component: Project404,
  //   name: 'Project404'
  // },
  // {
  //   path: '/home',
  //   component: home,
  //   name: 'home',
  //   children: [
  //     // { path: '/projectindex', component: projectindex, name: 'projectindex' },
  //     { path: '/welcome', component: welcome },
  //     // { path: 'pms/commoditylist', component: commoditylist },
  //     // { path: 'pms/addcommodity', component: addcommodity },
  //   ]
  // }, 
  // {
  //   path:'/pms',
  //   component:pms,
  //   name:'pms',
  //   children:[
  //     { path: 'commoditylist', component: commoditylist },
  //     { path: 'addcommodity', component: addcommodity },
  //     { path: 'addcommodity2', component: addcommodity2 },
  //     { path: 'addcommodity3', component: addcommodity3 },
  //     { path: 'Productcategory', component: Productcategory },
  //     { path: 'producttype', component: producttype },
  //     { path: 'Brandmanagement', component: Brandmanagement },
  //   ]
  // },
  // {
  //   path:'/oms',
  //   component:oms,
  //   name:'oms',
  //   children:[
  //     { path: 'orderslist', component: orderslist },
  //     { path: 'ordersset', component: ordersset },
  //   ]
  // }
]
const router = new VueRouter({
  routes
})
export default router
