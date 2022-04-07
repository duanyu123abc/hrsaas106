import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'

// 状态
const state = {
  token: getToken(), // 设置token为共享状态，初始化vuex的时候就先从缓存中读取
  userInfo: {} // 这里定义一个空对象 为什么要定义一个空对象
}
// 修改状态
const mutations = {
  // 这里的setToken为修改状态时的函数，与下面的setToken不同
  setToken(state, token) {
    state.token = token // 将数据设置给token
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 将vuex的数据置空
    removeToken() // 同步到缓存
  },
  setUserInfo(state, result) {
    // 更新一个对象
    state.userInfo = result // 这样是响应式
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
    // 拿到token说明登陆成功
    setTimeStamp() // 设置当前时间戳
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    // 获取用户详情
    const baseInfo = await getUserDetailById(result.userId) // 获取头像
    context.commit('setUserInfo', { ...result, ...baseInfo }) // 提交到mutations
    return result // 给后期做权限时留下的伏笔
  },
  // 登出操作
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
