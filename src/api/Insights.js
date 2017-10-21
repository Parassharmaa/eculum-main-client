import axios from 'axios'
import api from './config'

export default {
  overview () {
    return axios({
      method: 'get',
      url: `${api.url}twitter/insights`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  },
  followers () {
    return axios({
      method: 'get',
      url: `${api.url}twitter/insights/followers`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  },
  followers_filter (d) {
    return axios({
      method: 'get',
      url: `${api.url}twitter/insights/followers?date=${d}`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  },
  friends () {
    return axios({
      method: 'get',
      url: `${api.url}twitter/insights/friends`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  },
  friends_filter (d) {
    return axios({
      method: 'get',
      url: `${api.url}twitter/insights/friends?date=${d}`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  },
  dates () {
    return axios({
      method: 'get',
      url: `${api.url}twitter/insights/dates`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  }
}
