import axios from 'axios'
import { message } from 'ant-design-vue'
import router from '@/router'

const service = axios.create({
  baseURL: '',
  timeout: 20000 // 请求超时时间
})

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      let status = error.response.status
      // 401
      if (status === 401) {
        message.error('认证失败，请重新登录')
        // removeToken()
        router.push({
          path: '/login'
        })
      }
      // 500 服务器内部错误
      if (status === 500) {
        message.error('服务器内部错误')
      }
      // 400 参数错误
      if (status === 400) {
        message.error('参数错误')
      }
    } else {
      // 请求超时
      message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service