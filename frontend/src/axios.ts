// axios
import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL

//You can add your headers here
const service = axios.create({
  baseURL, // api base_url
  timeout: 60000, // request timeout
})
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers['version'] = '0.1'
    config.headers['build'] = '0.1'
    config.headers['client-type'] = 'WEB'
    return config
  },
  (error) => {
    // Do something with request error
    // for debug
    Promise.reject(error)
  }
)

export default service
