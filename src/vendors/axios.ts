import axios from 'axios'

axios.interceptors.request.use(config => {
  config.baseURL = 'https://sample-api.stellanetworks.dev'
  config.headers['x-api-key'] = 'vY3292YlyFanipq2ZOcU0nv6IlZ7sL/K+u703J3OP0E='
  return config
})

export default axios