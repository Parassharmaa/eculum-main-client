import axios from 'axios'
import api from './config'

export default {
  getUser () {
    return axios({
      method: 'get',
      url: `${api.url}user`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  }
}
