import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:()=>import('@/views/Login'),
    // redirect:'/Home', //会导致路由规则再次匹配
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path:'/Home',
    name:'Home',
    component: () => import('@/views/Home'),
    redirect:'/Tab',
    children:[
      {
        path:'/Tab',
        component:()=> import('@/components/Home/Tab')
      },
      {
        path:'/article',
        component:()=> import('@/components/Home/article')
      },
      {
        path:'/writeArticle',
        component:()=> import('@/components/Home/writeArticle')
      }
    ]
  },
  {
    path:'/ArticleList/:id/:activeName',
    name:'ArticleList',
    component: () => import('../views/ArticleList')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]
//重写push的方法
const originaPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location,onResolve,onReject){
    if(onResolve||onReject){
        return originaPush.call(this,location,onResolve,onReject)
    }
    return originaPush.call(this,location).catch((err)=>{
        if(VueRouter.isNavigationFailure(err)){
            return err
        }
        return Promise.reject(err)
    })
}

const router = new VueRouter({
  routes
})

  // 无需登录白名单
  let whileList = ['/Login','/Home','/Tab','/article']

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to,from);
  const token = store.state.user.token
  // console.log(token);
  if (token) {
    if (store.state.user.userInfo) {
      store.dispatch('GetUserInfo',{AuthorizationL:token})
      // console.log(store);
    }
    next()
  }else{
    if(whileList.includes(to.path)){
      // 未登录，可以访问的路由地址，放行
      next()
    }else{
      // 强制切换到登录页
      next('/Login')
    }
  }
})


export default router
