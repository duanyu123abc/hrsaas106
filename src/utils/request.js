// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
// 创建一个axios实例
const service = axios.create({
  // 当执行npm run dev => .env.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API, // npm run dev => /api  npm run build => /prod-api
  timeout: 5000 // 设置超时时间
})
service.interceptors.request.use() // 请求拦截器
service.interceptors.response.use(response => {
  // response.data:因为axios默认加了一层data
  const { success, message, data } = response.data
  // 要根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
  // 业务错误应该进catch
    Message.error(message) // 提示错误信息
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出，进入catch
}) // 响应拦截器
export default service
