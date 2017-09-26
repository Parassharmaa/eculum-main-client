import axios from 'axios'
import api from './config'

export default {
  postCred (creds) {
    return axios.post(`${api.url}callback/email`, creds)
  }
}
