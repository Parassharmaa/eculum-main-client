import axios from 'axios'
import api from './config'

export default {
  available () {
    return axios({
      method: 'get',
      url: `${api.url}trends/available`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  },
  worldwide () {
    return axios({
      method: 'get',
      url: `${api.url}trends/worldwide`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  },
  place (woeid) {
    return axios({
      method: 'post',
      url: `${api.url}trends/place`,
      data: {woeid: woeid},
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  }
}
