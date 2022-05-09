import store from '@/store'
// 做一个混入对象
export default {
  methods: {
    //   检查权限 要么有 要么没有 Key就是要检查的点
    checkPermission(key) {
      // 去用户信息里面找points中有没有key,如果有key则有权限
      const { userInfo } = store.state.user
      if (userInfo.roles.points && userInfo.roles.points.length) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}
