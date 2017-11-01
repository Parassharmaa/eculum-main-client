import axios from 'axios'
import api from './config'

export default {
  user (payload) {
    return axios({
      method: 'post',
      url: `${api.url}twitter/user`,
      data: {'screen_name': payload},
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  },

  follow (payload) {
    return axios({
      method: 'post',
      url: `${api.url}twitter/relationship/create`,
      data: {'screen_name': payload},
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  },
  unfollow (payload) {
    return axios({
      method: 'post',
      url: `${api.url}twitter/relationship/destroy`,
      data: {'screen_name': payload},
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  },
  update (payload) {
    return axios({
      method: 'post',
      url: `${api.url}twitter/relationship/update`,
      data: {'screen_name': payload.screen_name, 'do_follow': payload.do_follow},
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  }
}
