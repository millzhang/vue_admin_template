import Serice from './server'
export default {
  login(params: object) {
    return Serice.post('/login', params)
  }
}