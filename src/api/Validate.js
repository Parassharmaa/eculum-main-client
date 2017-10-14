import axios from 'axios'
import api from './config'

export default {
  valid () {
    return axios({
      method: 'get',
      url: `${api.url}auth/validate`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  }
}
