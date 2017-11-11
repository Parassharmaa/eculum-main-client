import axios from 'axios'
import api from './config'

export default {
  sendTweet (creds) {
    return axios({
      method: 'post',
      url: `${api.url}tweet`,
      data: creds,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  },
  suggTweet () {
    return axios({
      method: 'get',
      url: `${api.url}twitter/tweets`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  }
}
