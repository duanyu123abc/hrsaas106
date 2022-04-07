// 权限拦截在路由跳转 导航守卫/路由守卫

import router from '@/router'
import store from '@/store' // 引入store实例，相当于this.store
import nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
// 不需要导出，只需要让代码执行即可
// 前置守卫
// next是前置守卫必须执行的钩子，如果不执行，页面就死了
// next() 放过
// next(false) 跳转终止
// next(地址) 跳转到某个地址
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nprogress.start() // 开启进度条
  if (store.getters.token) {
    // 只有在有token的情况下才会获取资料
    // 如果有token
    if (to.path === '/login') {
      // 如果要访问的是登录页
      next('/') // 跳到主页
    } else {
      // 只有放过的时候才会获取用户资料
      // 如果当前vuex中有用户资料的id表示已经有资料了，不需要获取了 如果没有id才获取
      if (!store.getters.userId) {
        // 如果没有id表示当前用户资料没有获取过
        await store.dispatch('user/getUserInfo')
        // 如果说后续需要根据用户资料获取数据的话，这里必须改成同步
      }
      next()
    }
  } else {
    // 没有token 的情况
    if (whiteList.indexOf(to.path) > -1) {
      // 表示要去的地址在白名单
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done() // 解决手动切换地址时，进度条不关闭的问题
})
// 后置守卫
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})

