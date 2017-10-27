import axios from 'axios'
import api from './config'

export default {
  tags () {
    return axios({
      method: 'get',
      url: `${api.url}twitter/insights/words`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  }
}
