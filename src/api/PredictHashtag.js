import axios from 'axios'
import api from './config'

export default {
  get_tags (payload) {
    return axios({
      method: 'post',
      url: `${api.url}predict/hashtag`,
      data: {tweet: payload},
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  }
}
