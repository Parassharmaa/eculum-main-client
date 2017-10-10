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
      url: `${api.prod_url}insights/followers`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  },
  friends () {
    return axios({
      method: 'get',
      url: `${api.prod_url}insights/friends`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  }
}
