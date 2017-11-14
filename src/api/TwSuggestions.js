import axios from 'axios'
import api from './config'

export default {
  suggTweet () {
    return axios({
      method: 'get',
      url: `${api.url}twitter/suggestions/tweets`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  },

  suggArticles () {
    return axios({
      method: 'get',
      url: `${api.url}twitter/suggestions/reading`,
      headers: {'Authorization': localStorage.getItem('eclmtoken')}
    })
  }
}
