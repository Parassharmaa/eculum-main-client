import axios from 'axios'
import api from './config'

export default {
  getUser () {
    return axios({
      method: 'get',
      url: `${api.url}user`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  },

  changePassword (payload) {
    return axios({
      method: 'post',
      url: `${api.url}user/password`,
      data: payload,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  },

  changeEmail (payload) {
    return axios({
      method: 'post',
      url: `${api.url}user/email`,
      data: payload,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  }
}
