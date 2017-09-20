import axios from 'axios'
import api from './config'

export default {
  getToken (loginHash) {
    return axios.get(`${api.url}auth-token?login_hash=${loginHash}`)
  }
}
